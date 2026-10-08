(async function () {
  const loginPage = document.body.dataset.page === 'login';
  const message = document.getElementById('auth-message');
  const form = document.getElementById('auth-form');
  const report = text => { if (message) message.textContent = text; };
  const config = window.ARCHIVE_CONFIG || {};
  const unavailable = text => {
    if (!loginPage) { location.replace('login.html'); return; }
    report(text);
    form?.querySelectorAll('input, button').forEach(control => control.disabled = true);
  };
  if (!config.supabaseUrl || !config.supabasePublicKey) {
    unavailable('Account access is not configured yet. The owner must add the Supabase project URL and public key.');
    return;
  }
  if (!window.supabase) {
    unavailable('The account service could not load. Please refresh to try again.');
    return;
  }
  let client;
  try { client = window.supabase.createClient(config.supabaseUrl, config.supabasePublicKey); }
  catch { unavailable('Account configuration is invalid. Please contact the archive owner.'); return; }
  client.auth.onAuthStateChange((event, session) => {
    if (!loginPage && !session && (event === 'SIGNED_OUT' || event === 'INITIAL_SESSION')) location.replace('login.html');
  });
  try {
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    if (!loginPage && !data.session) { location.replace('login.html'); return; }
    if (loginPage && data.session) { location.replace('index.html'); return; }
    document.documentElement.classList.remove('auth-pending');
  } catch {
    unavailable('Your session could not be checked. Please refresh to try again.');
    return;
  }
  document.querySelector('[data-logout]')?.addEventListener('click', async event => {
    const control = event.currentTarget;
    control.disabled = true;
    try {
      const { error } = await client.auth.signOut();
      if (error) throw error;
      location.replace('login.html');
    } catch { report('Log out failed. Please try again.'); control.disabled = false; }
  });
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    const signup = event.submitter?.value === 'signup';
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;
    const controls = form.querySelectorAll('button');
    controls.forEach(control => control.disabled = true);
    report(signup ? 'Creating your account…' : 'Logging in…');
    try {
      const result = signup
        ? await client.auth.signUp({email,password,options:{emailRedirectTo:new URL('login.html',location.href).href}})
        : await client.auth.signInWithPassword({email,password});
      if (result.error) throw result.error;
      form.elements.password.value = '';
      if (result.data.session) location.replace('index.html');
      else report('Check your email for an account confirmation, then return here to log in.');
    } catch (error) { report(error.message || 'Account access failed. Please try again.'); }
    finally { controls.forEach(control => control.disabled = false); }
  });
})();
