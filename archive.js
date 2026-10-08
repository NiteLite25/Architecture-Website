const search = document.getElementById('project-search');
const count = document.getElementById('project-count');
const items = [...document.querySelectorAll('[data-project]')];
const placeholders = [...document.querySelectorAll('[data-placeholder]')];
const filters = {
  type: document.getElementById('project-type'),
  year: document.getElementById('project-year'),
  documentation: document.getElementById('project-documentation')
};
const normalize = value => value.trim().toLowerCase();
const metadataValues = (item, key) => (item.dataset[key] || '').split('|').filter(Boolean);
for (const [key, control] of Object.entries(filters)) {
  const values = new Map();
  items.forEach(item => metadataValues(item, key).forEach(value => values.set(normalize(value), value)));
  [...values.values()].sort((a, b) => key === 'year' ? b.localeCompare(a) : a.localeCompare(b)).forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    control.append(option);
  });
  control.addEventListener('change', updateArchive);
}
function updateArchive() {
  const query = normalize(search.value);
  const active = Boolean(query || Object.values(filters).some(control => control.value));
  let visible = 0;
  items.forEach(item => {
    const text = normalize(item.textContent + ' ' + Object.values(item.dataset).join(' '));
    const matchesFilters = Object.entries(filters).every(([key, control]) =>
      !control.value || metadataValues(item, key).some(value => normalize(value) === normalize(control.value)));
    item.hidden = !text.includes(query) || !matchesFilters;
    if (!item.hidden) visible++;
  });
  placeholders.forEach(item => { item.hidden = active; });
  count.textContent = `${visible} of ${items.length} project${items.length === 1 ? '' : 's'}`;
  document.getElementById('no-results').hidden = visible !== 0;
}
search.addEventListener('input', updateArchive);
document.querySelectorAll('[data-reset-archive]').forEach(button => button.addEventListener('click', () => {
  search.value = '';
  Object.values(filters).forEach(control => { control.value = ''; });
  updateArchive();
  search.focus();
}));
updateArchive();
