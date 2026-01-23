// ===============================
// Lenis Smooth Scroll
// ===============================
const lenis = new Lenis({
  duration: 1,
  smoothWheel: true,
  smoothTouch: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===============================
// Core Elements
// ===============================
const content = document.getElementById("content");
const contentLayer = document.getElementById("content-layer");
const progressBar = document.getElementById("progress-bar");

const lionCanvas = document.getElementById("bg-canvas");
const lionCtx = lionCanvas.getContext("2d");

// ===============================
// Persistent Progress Store
// ===============================
const STORAGE_KEY = "git-dominion-progress";

const progressState = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "{}"
);

function markCompleted(subtopicId) {
  progressState[subtopicId] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
  updateSidebarTicks();
}

// ===============================
// Canvas Resize (CRITICAL)
// ===============================
const DPR = window.devicePixelRatio || 1;

function resizeLion() {
  const w = content.clientWidth;
  const h = content.clientHeight;

  lionCanvas.width = w * DPR;
  lionCanvas.height = h * DPR;
  lionCanvas.style.width = w + "px";
  lionCanvas.style.height = h + "px";

  lionCtx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
resizeLion();
window.addEventListener("resize", resizeLion);

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
// Scroll Progress Bar
// ===============================
function attachScrollProgress() {
  progressBar.style.width = "0%";

  content.onscroll = () => {
    const max = content.scrollHeight - content.clientHeight;
    if (max > 0) {
      progressBar.style.width = `${(content.scrollTop / max) * 100}%`;
    }
  };
}

// ===============================
// Content Rendering
// ===============================
let currentTopic = null;

function loadContent(html) {
  contentLayer.innerHTML = html;
  observeReveals();
  attachScrollProgress();
}

// -------------------------------
// Render Topic
// -------------------------------
function renderTopic(topic) {
  currentTopic = topic;

  loadContent(`
    <h2 class="text-3xl font-bold mb-4 reveal">${topic.title}</h2>
    <p class="mb-6 text-slate-200 reveal max-w-2xl">${topic.intro}</p>

    <h3 class="text-xl font-semibold mb-4 reveal">Subtopics</h3>
    <ul class="space-y-3">
      ${topic.subtopics
        .map(
          sub => `
        <li class="reveal">
          <button
            class="subtopic-btn w-full p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left"
            data-subtopic="${sub.id}">
            <div class="flex items-center justify-between">
              <span class="font-semibold">${sub.title}</span>
              ${
                progressState[sub.id]
                  ? `<span class="text-green-400 text-sm">✔</span>`
                  : ``
              }
            </div>
            <p class="text-sm text-slate-400 mt-1">${sub.summary}</p>
          </button>
        </li>
      `
        )
        .join("")}
    </ul>
  `);
}

// -------------------------------
// Render Subtopic
// -------------------------------
function renderSubtopic(topic, sub) {
  markCompleted(sub.id);

  loadContent(`
    <button class="mb-6 text-teal-400 hover:underline reveal back-btn">
      ← Back to ${topic.title}
    </button>

    <article class="prose prose-invert max-w-none reveal">
      ${sub.content || `<p>No content available.</p>`}
    </article>
  `);
}

// ===============================
// Click Delegation
// ===============================
contentLayer.addEventListener("click", e => {
  const subBtn = e.target.closest(".subtopic-btn");
  if (subBtn) {
    const subId = subBtn.dataset.subtopic;
    const topic = syllabus.flatMap(l => l.topics).find(t =>
      t.subtopics.some(s => s.id === subId)
    );
    const sub = topic.subtopics.find(s => s.id === subId);
    renderSubtopic(topic, sub);
    return;
  }

  const back = e.target.closest(".back-btn");
  if (back && currentTopic) {
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
// Sidebar Completion Ticks
// ===============================
function updateSidebarTicks() {
  document.querySelectorAll("[data-subtopic-id]").forEach(el => {
    const id = el.dataset.subtopicId;
    if (progressState[id]) {
      el.classList.add("completed");
    }
  });
}

// ===============================
// Initial Load
// ===============================
loadContent(`
  <h2 class="text-3xl font-bold mb-4 reveal">Welcome</h2>
  <p class="text-slate-300 reveal max-w-xl">
    Select a topic from the sidebar to begin your Git → GitHub mastery.
  </p>
`);

// =================================================
// 🦁 LION BACKGROUND — RUNTIME RESTORE (CRITICAL)
// =================================================
const lionImage = new Image();
lionImage.src = "./assets/lion.png";

let lionPixels = [];
let lionStart = null;
let breathing = 0;
let scrollForce = 0;

const cores = navigator.hardwareConcurrency || 4;
const PIXEL = cores >= 8 ? 2 : cores >= 4 ? 3 : 4;

let mouse = { x: -9999, y: -9999 };

lionCanvas.addEventListener("mousemove", e => {
  const r = lionCanvas.getBoundingClientRect();
  mouse.x = e.clientX - r.left;
  mouse.y = e.clientY - r.top;
});

content.addEventListener("scroll", () => {
  scrollForce = Math.min(1, content.scrollTop / 300);
});

// ---------------- Image → Pixels ----------------
lionImage.onload = () => {
  const off = document.createElement("canvas");
  off.width = lionImage.width;
  off.height = lionImage.height;
  const ctx = off.getContext("2d");
  ctx.drawImage(lionImage, 0, 0);

  const data = ctx.getImageData(0, 0, off.width, off.height).data;
  const cw = lionCanvas.width / DPR;
  const ch = lionCanvas.height / DPR;

  const scale = Math.min(cw / off.width, ch / off.height) * 0.75;
  const ox = (cw - off.width * scale) / 2;
  const oy = (ch - off.height * scale) / 2;

  lionPixels = [];

  for (let y = 0; y < off.height; y += PIXEL) {
    for (let x = 0; x < off.width; x += PIXEL) {
      const i = (y * off.width + x) * 4;
      const a = data[i + 3];
      const b = data[i] + data[i + 1] + data[i + 2];
      if (a > 30 && b < 620) {
        lionPixels.push({
          x: ox + x * scale,
          y: oy + y * scale,
          v: 1 - b / 765
        });
      }
    }
  }

  requestAnimationFrame(drawLion);
};

// ---------------- DRAW LOOP ----------------
function drawLion(t) {
  if (!lionStart) lionStart = t;
  breathing += 0.015;

  lionCtx.clearRect(
    0,
    0,
    lionCanvas.width / DPR,
    lionCanvas.height / DPR
  );

  const breath = Math.sin(breathing) * 0.12;

  for (const px of lionPixels) {
    const dx = px.x - mouse.x;
    const dy = px.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let intensity = px.v + breath + scrollForce * 0.4;
    let alpha = 0.5;

    if (dist < 60) {
      intensity += 0.9;
      alpha += 0.4;
    }

    lionCtx.fillStyle =
      intensity > 1.3
        ? `rgba(45,212,191,${alpha})`
        : intensity > 0.8
        ? `rgba(20,184,166,${alpha})`
        : `rgba(15,118,110,${alpha * 0.8})`;

    lionCtx.fillRect(px.x, px.y, PIXEL, PIXEL);
  }

  requestAnimationFrame(drawLion);
}