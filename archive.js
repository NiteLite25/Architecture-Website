const search = document.getElementById('project-search');
const count = document.getElementById('project-count');
const items = [...document.querySelectorAll('[data-project]')];
search?.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  items.forEach(item => {
    item.hidden = !(item.textContent + ' ' + (item.dataset.keywords || '')).toLowerCase().includes(query);
    if (!item.hidden) visible++;
  });
  count.textContent = `${visible} of ${items.length} entries`;
  document.getElementById('no-results').hidden = visible !== 0;
});

document.querySelector('[data-clear-search]')?.addEventListener('click',()=>{search.value='';search.dispatchEvent(new Event('input'));search.focus();});