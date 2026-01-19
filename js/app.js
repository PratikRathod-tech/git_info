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

let currentTopic = null;
let currentSubtopic = null;

// ===============================
// Page Transition Helper
// ===============================
function loadContent(html) {
  content.classList.add("page-exit-active");

  setTimeout(() => {
    content.innerHTML = html;

    // Reset transition state
    content.classList.remove("page-exit-active");
    content.classList.add("page-enter");

    requestAnimationFrame(() => {
      content.classList.add("page-enter-active");
    });

    setTimeout(() => {
      content.classList.remove("page-enter", "page-enter-active");

      // ✅ CORRECT: reattach reveal observers ONLY
      observeReveals();

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
    <h2 class="text-3xl font-bold mb-4">${topic.title}</h2>
    <p class="mb-6 text-gray-700">${topic.intro}</p>

    <h3 class="text-xl font-semibold mb-3">Subtopics</h3>
    <ul class="space-y-3">
      ${topic.subtopics
        .map(
          sub => `
          <li>
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
    <button class="mb-6 text-blue-600 hover:underline transition back-btn">
      ← Back to ${topic.title}
    </button>

    ${subtopic.content}
  `;

  loadContent(html);
}

// ===============================
// Click Delegation (IMPORTANT)
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
  <h2 class="text-3xl font-bold mb-4 reveal is-visible">Welcome</h2>
  <p class="text-gray-700 reveal is-visible">
    Select a topic from the sidebar to begin your Git → GitHub mastery.
  </p>
`);



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
