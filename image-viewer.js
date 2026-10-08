const viewer = document.getElementById('image-viewer');
const viewedImage = viewer.querySelector('img');
const viewerTitle = document.getElementById('viewer-title');
const zoom = viewer.querySelector('[data-zoom]');
let opener;
document.querySelectorAll('[data-enlarge]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    opener = link;
    const source = link.querySelector('img');
    viewedImage.src = source.src;
    viewedImage.alt = source.alt;
    viewerTitle.textContent = link.dataset.title;
    viewer.classList.remove('full-size');
    zoom.setAttribute('aria-pressed','false');
    zoom.textContent = 'View full size';
    viewer.showModal();
    viewer.querySelector('[data-close-viewer]').focus();
  });
});
viewer.querySelector('[data-close-viewer]').addEventListener('click', () => viewer.close());
zoom.addEventListener('click', () => {
  const enlarged = viewer.classList.toggle('full-size');
  zoom.setAttribute('aria-pressed',String(enlarged));
  zoom.textContent = enlarged ? 'Fit to screen' : 'View full size';
});
viewer.addEventListener('close', () => {
  viewedImage.removeAttribute('src');
  opener?.focus();
});
