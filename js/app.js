const content = document.getElementById("content");
const progressBar = document.getElementById("progress-bar");

function getAllTopicIds() {
  return syllabus.flatMap(section =>
    section.topics.map(topic => topic.id)
  );
}

function updateProgress() {
  const completed =
    JSON.parse(localStorage.getItem("completedTopics")) || [];
  const total = getAllTopicIds().length;
  const percent = Math.round((completed.length / total) * 100);

  progressBar.style.width = percent + "%";
}

function saveProgress(topicId) {
  const completed =
    JSON.parse(localStorage.getItem("completedTopics")) || [];

  if (!completed.includes(topicId)) {
    completed.push(topicId);
    localStorage.setItem("completedTopics", JSON.stringify(completed));
  }
}

function saveLastTopic(topic) {
  localStorage.setItem("lastTopic", JSON.stringify(topic));
}

function loadLastTopic() {
  const saved = localStorage.getItem("lastTopic");
  if (!saved) return;

  const topic = JSON.parse(saved);
  content.innerHTML = topic.content;

  // Tell sidebar which topic is active
  document
    .querySelector("side-nav")
    ?.dispatchEvent(
      new CustomEvent("topic-selected", {
        detail: topic,
        bubbles: true
      })
    );
}

document.addEventListener("topic-selected", event => {
  const topic = event.detail;
  content.innerHTML = topic.content;
  saveProgress(topic.id);
  saveLastTopic(topic);
  updateProgress();
});

// Initialize
updateProgress();
loadLastTopic();
