const syllabus = [
  {
    level: "LEVEL 1 — Foundations",
    topics: [
      {
        id: "vcs-basics",
        title: "Version Control Fundamentals",
        content: `
          <h2 class="text-2xl font-semibold mb-4">Version Control Fundamentals</h2>

          <p class="mb-4">
            Version control is a system that records changes to files over time so you can recall
            specific versions later.
          </p>

          <h3 class="text-xl font-semibold mb-2">Why Version Control Exists</h3>
          <ul class="list-disc ml-6 mb-4">
            <li>Track history</li>
            <li>Collaborate safely</li>
            <li>Recover from mistakes</li>
          </ul>

          <p class="italic text-gray-600">
            Without version control, progress is temporary and mistakes are permanent.
          </p>
        `
      },
      {
        id: "git-install",
        title: "Git Installation & Configuration",
        content: `
          <h2 class="text-2xl font-semibold mb-4">Git Installation & Configuration</h2>

          <p class="mb-4">
            Git must know who you are before it can record your work.
          </p>

          <pre class="bg-gray-900 text-green-400 p-4 rounded mb-4">
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
          </pre>

          <p>
            These values become part of every commit you create.
          </p>
        `
      }
    ]
  },
  {
    level: "LEVEL 2 — Core Mechanics",
    topics: [
      {
        id: "git-architecture",
        title: "Git Architecture",
        content: `
          <h2 class="text-2xl font-semibold mb-4">Git Architecture</h2>

          <p class="mb-4">
            Git is a snapshot-based, content-addressable system.
          </p>

          <ul class="list-disc ml-6">
            <li>Working Directory</li>
            <li>Staging Area</li>
            <li>Repository</li>
          </ul>
        `
      }
    ]
  }
];
