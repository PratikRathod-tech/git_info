class SideNav extends HTMLElement {
  connectedCallback() {
    this.completedTopics =
      JSON.parse(localStorage.getItem("completedTopics")) || [];

    this.flatTopics = syllabus.flatMap(section => section.topics);
    this.activeIndex = 0;

    // Make component focusable
    this.tabIndex = 0;

    this.render();
    this.focus();
  }

  handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.activeIndex =
        (this.activeIndex + 1) % this.flatTopics.length;
      this.render();
      this.focusActive();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.activeIndex =
        (this.activeIndex - 1 + this.flatTopics.length) %
        this.flatTopics.length;
      this.render();
      this.focusActive();
    }

    if (e.key === "Enter") {
      const topic = this.flatTopics[this.activeIndex];
      this.dispatchEvent(
        new CustomEvent("topic-selected", {
          detail: topic,
          bubbles: true
        })
      );
    }
  }

  focusActive() {
    const items = this.querySelectorAll("button[data-index]");
    items[this.activeIndex]?.focus();
  }

  render() {
    this.innerHTML = `
      <h1 class="text-xl font-bold mb-4">Git Dominion</h1>
      <p class="text-sm text-gray-400 mb-6">Master Git. Control History.</p>
      <nav role="navigation" aria-label="Git learning topics"></nav>
    `;

    const nav = this.querySelector("nav");
    let index = 0;

    syllabus.forEach(section => {
      const sectionTitle = document.createElement("h3");
      sectionTitle.className = "mt-6 mb-2 text-sm font-semibold text-gray-400";
      sectionTitle.textContent = section.level;
      nav.appendChild(sectionTitle);

      section.topics.forEach(topic => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.index = index;
        btn.tabIndex = index === this.activeIndex ? 0 : -1;

        btn.className =
  "flex justify-between items-center w-full px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500";


        if (index === this.activeIndex) {
          btn.classList.add("bg-gray-700");
        }

        const label = document.createElement("span");
        label.textContent = topic.title;

        const check = document.createElement("span");
        if (this.completedTopics.includes(topic.id)) {
          check.textContent = "✔";
          check.className = "text-green-400";
        }

        btn.appendChild(label);
        btn.appendChild(check);

        btn.addEventListener("click", () => {
          this.activeIndex = index;
          this.dispatchEvent(
            new CustomEvent("topic-selected", {
              detail: topic,
              bubbles: true
            })
          );
          this.render();
          this.focusActive();
        });

        nav.appendChild(btn);
        index++;
      });
    });

    // Attach key handler AFTER render
    this.onkeydown = this.handleKeyDown.bind(this);
  }
}

customElements.define("side-nav", SideNav);
