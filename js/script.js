const tabButtons = Array.from(document.querySelectorAll('[data-tab]'));
const tabPanels = Array.from(document.querySelectorAll('[data-panel]'));

function pausePanelVideos(panel) {
  panel.querySelectorAll('video').forEach((video) => {
    video.pause();
  });
}

function activateTab(tabId) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === tabId;
    if (!isActive) {
      pausePanelVideos(panel);
    }
    panel.classList.toggle('is-active', isActive);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activateTab(button.dataset.tab);
  });
});

document.addEventListener('keydown', (event) => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    return;
  }

  const activeIndex = tabButtons.findIndex((button) => button.classList.contains('is-active'));
  if (activeIndex === -1) {
    return;
  }

  const direction = event.key === 'ArrowRight' ? 1 : -1;
  const nextIndex = (activeIndex + direction + tabButtons.length) % tabButtons.length;
  tabButtons[nextIndex].focus();
  activateTab(tabButtons[nextIndex].dataset.tab);
});
