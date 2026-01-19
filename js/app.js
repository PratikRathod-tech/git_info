// ===============================
// Lenis Smooth Scroll (FORCED)
// ===============================
const lenis = new Lenis({
  duration: 1.1,
  smooth: true,
  direction: "vertical",
  smoothTouch: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===============================
// State
// ===============================
const content = document.getElementById("content");
const progressBar = document.getElementById("progress-bar");
const progressTicksContainer = document.getElementById("progress-ticks");

let currentTopic = null;
let currentSubtopic = null;
let topicCompleted = false;
let sectionCheckpoints = [];

// ===============================
// Scroll Memory Helpers
// ===============================
function getScrollKey() {
  if (!currentTopic) return null;
  if (currentSubtopic) {
    return `scroll:${currentTopic.id}:${currentSubtopic.id}`;
  }
  return `scroll:${currentTopic.id}`;
}

function restoreScrollPosition() {
  const key = getScrollKey();
  if (!key) return;

  const saved = localStorage.getItem(key);
  if (saved !== null) {
    requestAnimationFrame(() => {
      content.scrollTop = parseFloat(saved);
    });
  }
}

// ===============================
// Page Transition Helper
// ===============================
function loadContent(html) {
  content.classList.add("page-exit-active");

  setTimeout(() => {
    content.innerHTML = html;

    content.classList.remove("page-exit-active");
    content.classList.add("page-enter");

    requestAnimationFrame(() => {
      content.classList.add("page-enter-active");
    });

    setTimeout(() => {
      content.classList.remove("page-enter", "page-enter-active");

      // Reset state for new content
      topicCompleted = false;

      // Re-init systems AFTER DOM update
      observeReveals();
      attachScrollProgress();
      registerSectionCheckpoints();
      restoreScrollPosition();

    }, 300);
  }, 200);
}

// ===============================
// Renderers
// ===============================
function renderTopic(topic) {
  currentTopic = topic;
  currentSubtopic = null;

  const html = `
    <h2 class="text-3xl font-bold mb-4 reveal">${topic.title}</h2>
    <p class="mb-6 text-gray-700 reveal">${topic.intro}</p>

    <h3 class="text-xl font-semibold mb-3 reveal">Subtopics</h3>
    <ul class="space-y-3">
      ${topic.subtopics
        .map(
          sub => `
          <li class="reveal">
            <button
              class="text-left w-full p-3 rounded bg-gray-100 hover:bg-gray-200 transition subtopic-btn"
              data-topic-id="${topic.id}"
              data-subtopic-id="${sub.id}"
            >
              <h4 class="font-semibold">${sub.title}</h4>
              <p class="text-sm text-gray-600">${sub.summary}</p>
            </button>
          </li>
        `
        )
        .join("")}
    </ul>
  `;

  loadContent(html);
}

function renderSubtopic(topicId, subtopicId) {
  const topic = syllabus
    .flatMap(level => level.topics)
    .find(t => t.id === topicId);
  if (!topic) return;

  const subtopic = topic.subtopics.find(s => s.id === subtopicId);
  if (!subtopic) return;

  currentTopic = topic;
  currentSubtopic = subtopic;

  const html = `
    <button class="mb-6 text-blue-600 hover:underline transition back-btn reveal">
      ← Back to ${topic.title}
    </button>

    <section class="reading-section reveal">
      ${subtopic.content}
    </section>
  `;

  loadContent(html);
}

// ===============================
// Click Delegation
// ===============================
content.addEventListener("click", e => {
  const subBtn = e.target.closest(".subtopic-btn");
  if (subBtn) {
    renderSubtopic(subBtn.dataset.topicId, subBtn.dataset.subtopicId);
    return;
  }

  const backBtn = e.target.closest(".back-btn");
  if (backBtn) {
    renderTopic(currentTopic);
  }
});

// ===============================
// Sidebar Integration
// ===============================
document.addEventListener("topic-selected", e => {
  renderTopic(e.detail);
});

// ===============================
// Initial Welcome Screen
// ===============================
loadContent(`
  <h2 class="text-3xl font-bold mb-4 reveal">Welcome</h2>
  <p class="text-gray-700 reveal">
    Select a topic from the sidebar to begin your Git → GitHub mastery.
  </p>
`);

// ===============================
// Reveal Animations
// ===============================
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

function observeReveals() {
  document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
  });
}

// ===============================
// Section Checkpoints (Progress Ticks)
// ===============================
function registerSectionCheckpoints() {
  sectionCheckpoints = [];
  if (!progressTicksContainer) return;

  progressTicksContainer.innerHTML = "";

  const sections = document.querySelectorAll(".reading-section");
  if (!sections.length) return;

  sections.forEach((sec, i) => {
    const percent = (i / sections.length) * 100;

    const tick = document.createElement("div");
    tick.className = "progress-tick";
    tick.style.left = `${percent}%`;

    progressTicksContainer.appendChild(tick);

    sectionCheckpoints.push({
      el: sec,
      tick,
      reached: false
    });
  });
}

// ===============================
// Scroll-Synced Progress Bar
// + Completion Logic
// ===============================
function attachScrollProgress() {
  progressBar.style.width = "0%";

  content.onscroll = () => {
    const scrollTop = content.scrollTop;
    const scrollHeight = content.scrollHeight - content.clientHeight;

    // Save scroll position
    const key = getScrollKey();
    if (key) {
      localStorage.setItem(key, scrollTop);
    }

    if (scrollHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }

    const progress = Math.min(
      (scrollTop / scrollHeight) * 100,
      100
    );

    progressBar.style.width = `${progress}%`;

    // Activate section ticks
    sectionCheckpoints.forEach(cp => {
      if (!cp.reached) {
        const rect = cp.el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.65) {
          cp.reached = true;
          cp.tick.classList.add("active");
        }
      }
    });

    // Completion trigger
    if (progress >= 80 && !topicCompleted && currentTopic) {
      topicCompleted = true;
      markTopicCompleted(currentTopic.id);
      unlockNextTopic(currentTopic.id);
      showCompletionToast();
    }
  };
}

// ===============================
// Completion + Unlock Logic
// ===============================
function markTopicCompleted(topicId) {
  let completed =
    JSON.parse(localStorage.getItem("completedTopics")) || [];

  if (!completed.includes(topicId)) {
    completed.push(topicId);
    localStorage.setItem(
      "completedTopics",
      JSON.stringify(completed)
    );
  }
}

function unlockNextTopic(topicId) {
  const flat = syllabus.flatMap(l => l.topics);
  const index = flat.findIndex(t => t.id === topicId);

  if (flat[index + 1]) {
    flat[index + 1].locked = false;
  }
}

// ===============================
// Completion Feedback
// ===============================
function showCompletionToast() {
  const toast = document.createElement("div");
  toast.className = "completion-toast";
  toast.textContent = "✔ Concept Completed";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}


// ===============================
// PIXEL-BY-PIXEL IMAGE BUILD (10s)
// ===============================

const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "./assets/hero.png"; // your image

img.onload = () => {
  const w = canvas.width;
  const h = canvas.height;

  // Draw image once OFFSCREEN
  const offCanvas = document.createElement("canvas");
  offCanvas.width = w;
  offCanvas.height = h;
  const offCtx = offCanvas.getContext("2d");

  offCtx.drawImage(img, 0, 0, w, h);

  // Get pixel data
  const imageData = offCtx.getImageData(0, 0, w, h);
  const pixels = imageData.data;

  ctx.clearRect(0, 0, w, h);

  const totalPixels = w * h;
  const duration = 10000; // 10 seconds
  const startTime = performance.now();

  function buildFrame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // How many pixels to reveal
    const pixelsToDraw = Math.floor(totalPixels * progress);

    const frameData = ctx.createImageData(w, h);
    const framePixels = frameData.data;

    for (let i = 0; i < pixelsToDraw * 4; i += 4) {
      framePixels[i]     = pixels[i];     // R
      framePixels[i + 1] = pixels[i + 1]; // G
      framePixels[i + 2] = pixels[i + 2]; // B
      framePixels[i + 3] = pixels[i + 3]; // A
    }

    ctx.putImageData(frameData, 0, 0);

    if (progress < 1) {
      requestAnimationFrame(buildFrame);
    }
  }

  requestAnimationFrame(buildFrame);
};
