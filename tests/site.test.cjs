const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const pages = ['index.html','archive.html','notes.html','about.html','project-1.html','project-2.html','project-3.html','login.html'];
test('All page links resolve and pages carry required metadata and scripts', () => {
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root,page),'utf8');
    assert.match(html,/<title>.+?<\/title>/);
    assert.match(html,/<meta name="description" content=".+?">/);
    assert.match(html,/src="auth.js"/);
    assert.match(html,/src="config.js"/);
    if(page !== 'login.html') {assert.match(html,/class="auth-pending"/);assert.match(html,/data-logout/);}
    for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|#|data:)/.test(match[1])) continue;
      const file = match[1].split('#')[0];
      assert.ok(fs.existsSync(path.join(root,file)),`${page}: missing ${file}`);
    }
    assert.doesNotMatch(html,/scheme-|data-preview/);
  }
});
function setup({login=false,configured=true,session=null,signupSession=null,signoutError=null}={}) {
  const calls=[];
  const status={textContent:''};
  const buttons=[{disabled:false},{disabled:false}];
  const form={elements:{email:{value:' user@example.com '},password:{value:'test-password'}},querySelectorAll:()=>buttons,addEventListener:(event,handler)=>{form.submit=handler;}};
  const logout={disabled:false,addEventListener:(event,handler)=>{logout.click=handler;}};
  const auth={onAuthStateChange:handler=>{auth.state=handler;},getSession:async()=>({data:{session},error:null}),signInWithPassword:async args=>{calls.push(['login',args]);return {data:{session:{user:{id:'test'}}},error:null};},signUp:async args=>{calls.push(['signup',args]);return {data:{session:signupSession},error:null};},signOut:async()=>({error:signoutError})};
  const context={window:{ARCHIVE_CONFIG:configured?{supabaseUrl:'https://example.supabase.co',supabasePublicKey:'public-test-key'}:{},supabase:{createClient:()=>({auth})}},document:{body:{dataset:{page:login?'login':'home'}},getElementById:id=>id==='auth-message'?status:id==='auth-form'&&login?form:null,querySelector:()=>logout,documentElement:{classList:{remove:name=>calls.push(['reveal',name])}}},location:{href:'http://localhost:8080/login.html',replace:url=>calls.push(['redirect',url])},URL};
  return {context,calls,status,buttons,form,logout,auth};
}
async function run(options){const state=setup(options);await vm.runInNewContext(fs.readFileSync(path.join(root,'auth.js'),'utf8'),state.context);return state;}
test('Missing configuration and signed-out sessions redirect protected pages',async()=>{
  for(const options of [{configured:false},{session:null}]) {const state=await run(options);assert.deepEqual(state.calls,[['redirect','login.html']]);}
});
test('Missing configuration disables login and explains the requirement',async()=>{const state=await run({login:true,configured:false});assert.ok(state.buttons.every(button=>button.disabled));assert.match(state.status.textContent,/not configured/);});
test('An authenticated visitor can see a protected page and logout redirects',async()=>{const state=await run({session:{user:{id:'test'}}});assert.deepEqual(state.calls,[['reveal','auth-pending']]);await state.logout.click({currentTarget:state.logout});assert.deepEqual(state.calls.at(-1),['redirect','login.html']);});
test('Signup without a session requests confirmation; login redirects home',async()=>{
  const state=await run({login:true});
  await state.form.submit({preventDefault(){},submitter:{value:'signup'}});
  assert.match(state.status.textContent,/Check your email/);
  assert.equal(state.calls.find(call=>call[0]==='signup')[1].options.emailRedirectTo,'http://localhost:8080/login.html');
  state.form.elements.password.value='test-password';
  await state.form.submit({preventDefault(){},submitter:{value:'login'}});
  assert.deepEqual(state.calls.at(-1),['redirect','index.html']);
});
test('Session signout from another tab redirects and a logout failure is shown',async()=>{
  const state=await run({session:{user:{id:'test'}},signoutError:{message:'offline'}});
  await state.logout.click({currentTarget:state.logout});assert.match(state.status.textContent,/failed/);assert.equal(state.logout.disabled,false);
  state.auth.state('SIGNED_OUT',null);assert.deepEqual(state.calls.at(-1),['redirect','login.html']);
});
test('Signup with automatic confirmation opens Home immediately',async()=>{
  const state=await run({login:true,signupSession:{user:{id:'test'}}});
  await state.form.submit({preventDefault(){},submitter:{value:'signup'}});
  assert.deepEqual(state.calls.at(-1),['redirect','index.html']);
  assert.equal(state.form.elements.password.value,'');
});
