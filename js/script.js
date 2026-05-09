const resumeTabs = Array.from(document.querySelectorAll('[data-resume-tab]'));
const resumePanels = Array.from(document.querySelectorAll('[data-resume-panel]'));

function activateResumeTab(tabId) {
  resumeTabs.forEach((tab) => {
    const active = tab.dataset.resumeTab === tabId;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  resumePanels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.resumePanel === tabId);
  });
}

resumeTabs.forEach((tab) => {
  tab.addEventListener('click', () => activateResumeTab(tab.dataset.resumeTab));
});

document.querySelectorAll('[data-project-card]').forEach((card) => {
  const video = card.querySelector('[data-video-player]');
  const sourceElement = card.querySelector('[data-video-sources]');
  const prev = card.querySelector('[data-video-prev]');
  const next = card.querySelector('[data-video-next]');

  if (!(video instanceof HTMLVideoElement) || !sourceElement) {
    return;
  }

  let sources = [];
  try {
    sources = JSON.parse(sourceElement.textContent || '[]');
  } catch {
    sources = [];
  }

  if (!Array.isArray(sources) || sources.length < 2) {
    return;
  }

  let index = 0;
  const setVideo = (nextIndex) => {
    index = (nextIndex + sources.length) % sources.length;
    video.src = sources[index];
    video.load();
    video.play().catch(() => {});
  };

  prev?.addEventListener('click', () => setVideo(index - 1));
  next?.addEventListener('click', () => setVideo(index + 1));
});
