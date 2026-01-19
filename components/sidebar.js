class SideNav extends HTMLElement {
  connectedCallback() {
    // 🔒 Only allow access up to this level
    //this.unlockedLevel = 8;

    // ✔ Completed topics (for checkmarks)
    this.completedTopics =
      JSON.parse(localStorage.getItem("completedTopics")) || [];

    // 🔁 Flattened list for keyboard navigation
    this.flatTopics = syllabus.flatMap(section =>
      section.topics.map(topic => ({
        ...topic,
        level: parseInt(section.level.match(/\d+/)[0])
      }))
    );

    // 👉 Active index ONLY among unlocked topics
    this.activeIndex = 0;

    // Make sidebar focusable
    this.tabIndex = 0;

    this.render();
    this.focus();
  }

  // ===============================
  // Keyboard Navigation
  // ===============================
  handleKeyDown(e) {
    const unlockedTopics = this.flatTopics.filter(
      t => t.level <= this.unlockedLevel
    );

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.activeIndex =
        (this.activeIndex + 1) % unlockedTopics.length;
      this.updateActive(unlockedTopics);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.activeIndex =
        (this.activeIndex - 1 + unlockedTopics.length) %
        unlockedTopics.length;
      this.updateActive(unlockedTopics);
    }

    if (e.key === "Enter") {
      const topic = unlockedTopics[this.activeIndex];
      this.selectTopic(topic);
    }
  }

  // ===============================
  // Dispatch topic selection
  // ===============================
  selectTopic(topic) {
    if (!topic) return;

    this.dispatchEvent(
      new CustomEvent("topic-selected", {
        detail: topic,
        bubbles: true
      })
    );
  }

  // ===============================
  // Update active visual state
  // ===============================
  updateActive(unlockedTopics) {
    const items = this.querySelectorAll(".side-item");
    items.forEach(el => el.classList.remove("active"));

    const topic = unlockedTopics[this.activeIndex];
    if (!topic) return;

    const activeEl = this.querySelector(
      `.side-item[data-id="${topic.id}"]`
    );

    if (activeEl) {
      activeEl.classList.add("active");
      activeEl.focus();
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
    let visualIndex = 0;

    syllabus.forEach(section => {
      const levelNumber = parseInt(section.level.match(/\d+/)[0]);
      const isSectionLocked = levelNumber > this.unlockedLevel;

      // Section title
      const sectionTitle = document.createElement("h3");
      sectionTitle.className =
        "mt-6 mb-2 text-sm font-semibold text-gray-400";
      sectionTitle.textContent = section.level;
      nav.appendChild(sectionTitle);

      section.topics.forEach(topic => {
        const isLocked = isSectionLocked;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.id = topic.id;

        // 🔹 Base styling
        btn.className =
          "side-item flex justify-between items-center w-full px-3 py-2 rounded text-left text-sm transition-all duration-200";

        if (isLocked) {
          // 🔒 Locked topics
          btn.classList.add(
            "opacity-40",
            "cursor-not-allowed",
            "pointer-events-none",
            "text-gray-400"
          );
        } else {
          // ✅ Unlocked topics
          btn.classList.add(
            "hover:bg-gray-700",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-green-500"
          );

          // Active topic highlight
          if (visualIndex === this.activeIndex) {
            btn.classList.add("active");
          }

          // Click handler ONLY for unlocked topics
          btn.addEventListener("click", () => {
            this.activeIndex = visualIndex;
            this.updateActive(
              this.flatTopics.filter(
                t => t.level <= this.unlockedLevel
              )
            );
            this.selectTopic(topic);
          });

          visualIndex++;
        }

        // Label
        const label = document.createElement("span");
        label.textContent = topic.title;

        // ✔ Completion check
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

    // Attach keyboard handler AFTER render
    this.onkeydown = this.handleKeyDown.bind(this);
  }
}

customElements.define("side-nav", SideNav);
