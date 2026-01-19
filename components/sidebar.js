class SideNav extends HTMLElement {
  connectedCallback() {
    // ✔ Completed topics (persistent)
    this.completedTopics =
      JSON.parse(localStorage.getItem("completedTopics")) || [];

    // 🔁 Flatten topics with level info
    this.flatTopics = syllabus.flatMap(section =>
      section.topics.map(topic => ({
        ...topic,
        level: parseInt(section.level.match(/\d+/)[0])
      }))
    );

    // Active index refers ONLY to unlocked topics
    this.activeIndex = 0;

    // Focusable for keyboard navigation
    this.tabIndex = 0;

    this.render();
    this.focus();
  }

  // ===============================
  // Keyboard Navigation (SAFE)
  // ===============================
  handleKeyDown(e) {
    const unlocked = this.getUnlockedTopics();
    if (!unlocked.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % unlocked.length;
      this.updateActive(unlocked);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.activeIndex =
        (this.activeIndex - 1 + unlocked.length) % unlocked.length;
      this.updateActive(unlocked);
    }

    if (e.key === "Enter") {
      const topic = unlocked[this.activeIndex];
      if (topic) this.selectTopic(topic);
    }
  }

  // ===============================
  // Helpers
  // ===============================
  getUnlockedTopics() {
    return this.flatTopics.filter(t => !t.locked);
  }

  selectTopic(topic) {
    this.dispatchEvent(
      new CustomEvent("topic-selected", {
        detail: topic,
        bubbles: true
      })
    );
  }

  updateActive(unlockedTopics) {
    this.querySelectorAll(".side-item").forEach(el =>
      el.classList.remove("active")
    );

    const topic = unlockedTopics[this.activeIndex];
    if (!topic) return;

    const el = this.querySelector(
      `.side-item[data-id="${topic.id}"]`
    );

    if (el) {
      el.classList.add("active");
      el.focus({ preventScroll: true });
    }
  }

  // ===============================
  // Render Sidebar
  // ===============================
  render() {
    this.innerHTML = `
      <h1 class="text-xl font-bold mb-4">Git Dominion</h1>
      <p class="text-sm text-gray-400 mb-6">
        Master Git. Control History.
      </p>
      <nav role="navigation" aria-label="Git learning topics"></nav>
    `;

    const nav = this.querySelector("nav");
    let unlockedIndex = 0;

    syllabus.forEach(section => {
      const sectionTitle = document.createElement("h3");
      sectionTitle.className =
        "mt-6 mb-2 text-sm font-semibold text-gray-400";
      sectionTitle.textContent = section.level;
      nav.appendChild(sectionTitle);

      section.topics.forEach(topic => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.id = topic.id;

        btn.className =
          "side-item flex justify-between items-center w-full px-3 py-2 rounded text-left text-sm transition-all duration-200";

        // 🔒 Locked topic
        if (topic.locked) {
          btn.classList.add(
            "opacity-40",
            "cursor-not-allowed",
            "pointer-events-none",
            "text-gray-400"
          );
        } else {
          // ✅ Unlocked topic
          if (unlockedIndex === this.activeIndex) {
            btn.classList.add("active");
          }

          btn.addEventListener("click", () => {
            this.activeIndex = unlockedIndex;
            this.updateActive(this.getUnlockedTopics());
            this.selectTopic(topic);
          });

          unlockedIndex++;
        }

        // Label
        const label = document.createElement("span");
        label.textContent = topic.title;

        // ✔ Completion indicator
        const check = document.createElement("span");
        if (this.completedTopics.includes(topic.id)) {
          check.textContent = "✔";
          check.className = "text-green-400";
        }

        btn.appendChild(label);
        btn.appendChild(check);
        nav.appendChild(btn);
      });
    });

    // Keyboard handler
    this.onkeydown = this.handleKeyDown.bind(this);
  }
}

customElements.define("side-nav", SideNav);
