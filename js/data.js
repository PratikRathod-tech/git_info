const syllabus = [
  {
    level: "LEVEL 1 — Foundations",
    topics: [
      {
        id: "version-control",
        title: "Version Control Fundamentals",
        intro:
          "Understand why version control exists and how it changed software development.",
        subtopics: [
          {
  id: "what-is-vcs",
  title: "What is Version Control?",
  summary: "Definition and basic purpose of version control systems.",
  content: `
    <h2 class="text-3xl font-bold mb-4">What is Version Control?</h2>

    <p class="mb-4">
      Version control is a system that records changes to files over time so that
      you can recall, compare, and restore specific versions later.
    </p>

    <p class="mb-4">
      In software development, it acts as a <strong>memory system</strong> for your code.
      Every meaningful change is stored as history, not overwritten.
    </p>

    <h3 class="text-xl font-semibold mb-2">Core Idea</h3>
    <p class="mb-4">
      Instead of working on a single fragile copy of code, version control allows
      developers to work safely, experiment freely, and recover from mistakes.
    </p>

    <h3 class="text-xl font-semibold mb-2">What Version Control Solves</h3>
    <ul class="list-disc pl-6 mb-4">
      <li>Accidental deletion or mistakes</li>
      <li>Conflicts between multiple developers</li>
      <li>Lack of history and accountability</li>
      <li>Fear of experimenting with new ideas</li>
    </ul>

    <h3 class="text-xl font-semibold mb-2">Real-World Example</h3>
    <p class="mb-4">
      Imagine editing a document with no undo button. Every mistake would be permanent.
      Version control is the <strong>undo, timeline, and collaboration system</strong>
      for software.
    </p>

    <h3 class="text-xl font-semibold mb-2">Interview Insight</h3>
    <p class="italic text-gray-600">
      Version control is not about storing code — it is about controlling change.
    </p>
  `
}
,
          {
            id: "why-vcs-exists",
            title: "Why Version Control Exists",
            summary: "Problems in software development that led to version control."
          },
          {
            id: "problems-without-vcs",
            title: "Problems Without Version Control",
            summary: "Risks of managing code without version control."
          },
          {
            id: "centralized-vs-distributed",
            title: "Centralized vs Distributed VCS",
            summary: "Difference between centralized and distributed version control."
          },
          {
            id: "why-git-won",
            title: "Why Git Won",
            summary: "Reasons Git became the dominant version control system."
          }
        ]
      },

      {
        id: "git-installation",
        title: "Git Installation & Configuration",
        intro:
          "Learn how to install Git and configure it correctly for professional use.",
        subtopics: [
          {
            id: "installing-git",
            title: "Installing Git",
            summary: "How to install Git on Windows, Linux, and macOS."
          },
          {
            id: "git-bash-vs-shells",
            title: "Git Bash vs PowerShell vs CMD",
            summary: "Different command-line environments for using Git."
          },
          {
            id: "git-config-levels",
            title: "git config Levels",
            summary: "System, global, and local Git configuration levels."
          },
          {
            id: "username-vs-github",
            title: "user.name vs GitHub Username",
            summary: "Difference between Git identity and GitHub account."
          },
          {
            id: "line-endings",
            title: "CRLF vs LF",
            summary: "How line endings affect Git across operating systems."
          }
        ]
      }
    ]
  },

  {
    level: "LEVEL 2 — Core Git Mechanics",
    topics: [
      {
        id: "git-architecture",
        title: "Git Architecture",
        intro:
          "Understand how Git works internally: working directory, staging area, and repository.",
        subtopics: [
          {
            id: "working-directory",
            title: "Working Directory",
            summary: "Where files are modified before being tracked."
          },
          {
            id: "staging-area",
            title: "Staging Area (Index)",
            summary: "Intermediate area between working directory and repository."
          },
          {
            id: "repository",
            title: "Repository",
            summary: "The database where Git stores project history."
          },
          {
            id: "head",
            title: "HEAD",
            summary: "Pointer that represents the current commit."
          },
          {
            id: "branch-pointers",
            title: "Branch Pointers",
            summary: "How branches reference commits internally."
          }
        ]
      },

      {
        id: "basic-git-commands",
        title: "Basic Git Commands",
        intro:
          "Learn the essential Git commands used in daily development.",
        subtopics: [
          {
            id: "git-init",
            title: "git init",
            summary: "Initialize a new Git repository."
          },
          {
            id: "git-status",
            title: "git status",
            summary: "Check the current state of the repository."
          },
          {
            id: "git-add",
            title: "git add",
            summary: "Stage changes for commit."
          },
          {
            id: "git-commit",
            title: "git commit",
            summary: "Save staged changes to repository history."
          },
          {
            id: "git-diff",
            title: "git diff",
            summary: "View differences between changes."
          },
          {
            id: "gitignore",
            title: ".gitignore",
            summary: "Exclude files from being tracked by Git."
          }
        ]
      }
    ]
  },

  {
    level: "LEVEL 3 — History & Time Control",
    topics: [
      {
        id: "commits-deep-dive",
        title: "Commits (Deep Dive)",
        intro:
          "Understand commits, hashes, parents, and commit discipline.",
        subtopics: [
          {
            id: "commit-anatomy",
            title: "Commit Anatomy",
            summary: "Structure of a Git commit."
          },
          {
            id: "commit-hash",
            title: "Commit Hash (SHA)",
            summary: "How Git uniquely identifies commits."
          },
          {
            id: "parent-commits",
            title: "Parent Commits",
            summary: "Relationship between commits in history."
          },
          {
            id: "atomic-commits",
            title: "Atomic Commits",
            summary: "Why commits should represent single logical changes."
          },
          {
            id: "commit-messages",
            title: "Commit Messages",
            summary: "Best practices for writing commit messages."
          }
        ]
      },

      {
        id: "undoing-mistakes",
        title: "Undoing & Fixing Mistakes",
        intro:
          "Learn how to safely undo changes and recover from mistakes in Git.",
        subtopics: [
          {
            id: "git-restore",
            title: "git restore",
            summary: "Undo changes in working directory or staging area."
          },
          {
            id: "git-reset",
            title: "git reset",
            summary: "Move HEAD and modify commit history."
          },
          {
            id: "git-revert",
            title: "git revert",
            summary: "Undo commits safely without rewriting history."
          },
          {
            id: "git-reflog",
            title: "git reflog",
            summary: "Track and recover lost commits."
          }
        ]
      }
    ]
  },

  {
    level: "LEVEL 4 — Branching & Merging",
    topics: [
      {
        id: "branches-truth",
        title: "Branches (Truth)",
        intro:
          "Understand what branches really are and how Git handles them.",
        subtopics: [
          {
            id: "what-branches-are",
            title: "What Branches Really Are",
            summary: "Branches as lightweight pointers."
          },
          {
            id: "creating-branches",
            title: "Creating Branches",
            summary: "How new branches are created instantly."
          },
          {
            id: "switching-branches",
            title: "Switching Branches",
            summary: "Move between branches safely."
          },
          {
            id: "deleting-branches",
            title: "Deleting Branches",
            summary: "Remove branches locally and remotely."
          }
        ]
      },

      {
        id: "merging-strategies",
        title: "Merging Strategies",
        intro:
          "Learn fast-forward, three-way merges, and conflict resolution.",
        subtopics: [
          {
            id: "fast-forward",
            title: "Fast-Forward Merge",
            summary: "Merge without creating a new commit."
          },
          {
            id: "three-way-merge",
            title: "Three-Way Merge",
            summary: "Merge with a common ancestor."
          },
          {
            id: "merge-conflicts",
            title: "Merge Conflicts",
            summary: "Why conflicts occur and how to resolve them."
          }
        ]
      },

      {
        id: "rebase-advanced",
        title: "Rebase (Advanced & Dangerous)",
        intro:
          "Understand rebase, interactive rebase, and history rewriting.",
        subtopics: [
          {
            id: "what-is-rebase",
            title: "What Rebase Does",
            summary: "Reapply commits on a new base."
          },
          {
            id: "interactive-rebase",
            title: "Interactive Rebase",
            summary: "Edit, squash, or reorder commits."
          },
          {
            id: "rebase-risks",
            title: "When NOT to Rebase",
            summary: "Dangers of rewriting shared history."
          }
        ]
      }
    ]
  }
    ,
  {
    level: "LEVEL 5 — Remotes & GitHub",
    topics: [
      {
        id: "remote-repositories",
        title: "Remote Repositories",
        intro:
          "Understand how Git interacts with remote repositories.",
        subtopics: [
          {
            id: "git-remote",
            title: "git remote",
            summary: "Manage connections to remote repositories."
          },
          {
            id: "origin",
            title: "origin",
            summary: "Default name for the main remote repository."
          },
          {
            id: "git-fetch",
            title: "git fetch",
            summary: "Download changes without modifying local branches."
          },
          {
            id: "git-pull",
            title: "git pull",
            summary: "Fetch and merge changes from a remote repository."
          },
          {
            id: "git-push",
            title: "git push",
            summary: "Upload local commits to a remote repository."
          }
        ]
      },

      {
        id: "github-collaboration",
        title: "GitHub Collaboration",
        intro:
          "Learn how teams collaborate using GitHub.",
        subtopics: [
          {
            id: "fork-vs-clone",
            title: "Fork vs Clone",
            summary: "Difference between copying a repo and forking it."
          },
          {
            id: "pull-requests",
            title: "Pull Requests",
            summary: "Propose and review changes before merging."
          },
          {
            id: "code-reviews",
            title: "Code Reviews",
            summary: "Reviewing code for quality and correctness."
          },
          {
            id: "issues",
            title: "Issues & Discussions",
            summary: "Track bugs, features, and project discussions."
          }
        ]
      }
    ]
  },

  {
    level: "LEVEL 6 — Professional Workflows",
    topics: [
      {
        id: "branching-models",
        title: "Branching Models",
        intro:
          "Understand standard branching strategies used in teams.",
        subtopics: [
          {
            id: "git-flow",
            title: "Git Flow",
            summary: "Structured branching model with releases and hotfixes."
          },
          {
            id: "trunk-based",
            title: "Trunk-Based Development",
            summary: "Developing directly on a single main branch."
          },
          {
            id: "feature-branches",
            title: "Feature Branch Workflow",
            summary: "Isolating features in separate branches."
          },
          {
            id: "release-hotfix",
            title: "Release & Hotfix Branches",
            summary: "Managing production releases and urgent fixes."
          }
        ]
      },

      {
        id: "clean-history",
        title: "Clean History & Best Practices",
        intro:
          "Learn how professionals maintain clean Git history.",
        subtopics: [
          {
            id: "commit-discipline",
            title: "Commit Discipline",
            summary: "Making meaningful and logical commits."
          },
          {
            id: "squash-merge",
            title: "Squash Merging",
            summary: "Combining multiple commits into one."
          },
          {
            id: "naming-conventions",
            title: "Naming Conventions",
            summary: "Consistent naming for branches and commits."
          },
          {
            id: "semantic-commits",
            title: "Semantic Commits",
            summary: "Using structured commit messages."
          }
        ]
      }
    ]
  },

  {
    level: "LEVEL 7 — Security & Automation",
    topics: [
      {
        id: "git-security",
        title: "Git Security",
        intro:
          "Protect repositories and verify commit authenticity.",
        subtopics: [
          {
            id: "ssh-keys",
            title: "SSH Keys",
            summary: "Secure authentication using SSH."
          },
          {
            id: "https-vs-ssh",
            title: "HTTPS vs SSH",
            summary: "Different authentication methods for Git."
          },
          {
            id: "signed-commits",
            title: "Signed Commits",
            summary: "Verifying commit authorship."
          },
          {
            id: "protected-branches",
            title: "Protected Branches",
            summary: "Preventing unsafe changes to important branches."
          }
        ]
      },

      {
        id: "github-advanced",
        title: "GitHub Advanced",
        intro:
          "Advanced GitHub features for automation and releases.",
        subtopics: [
          {
            id: "github-actions",
            title: "GitHub Actions",
            summary: "Automating workflows with CI/CD."
          },
          {
            id: "webhooks",
            title: "Webhooks",
            summary: "Triggering external systems from GitHub events."
          },
          {
            id: "releases-tags",
            title: "Releases & Tags",
            summary: "Versioning software releases."
          },
          {
            id: "semantic-versioning",
            title: "Semantic Versioning",
            summary: "Standard version numbering system."
          }
        ]
      }
    ]
  },

  {
    level: "LEVEL 8 — Internals & Mastery",
    topics: [
      {
        id: "git-internals",
        title: "Git Internals (Master Level)",
        intro:
          "Explore how Git stores and manages data internally.",
        subtopics: [
          {
            id: "git-objects",
            title: "Git Objects",
            summary: "Blob, tree, and commit objects."
          },
          {
            id: "object-database",
            title: "Object Database",
            summary: "Where Git stores all objects."
          },
          {
            id: "pack-files",
            title: "Pack Files",
            summary: "Compressed storage for Git objects."
          },
          {
            id: "garbage-collection",
            title: "Garbage Collection",
            summary: "Cleaning up unused objects."
          }
        ]
      },

      {
        id: "disaster-recovery",
        title: "Disaster Recovery Scenarios",
        intro:
          "Recover from critical Git mistakes.",
        subtopics: [
          {
            id: "hard-reset",
            title: "Accidental Hard Reset",
            summary: "Recovering lost commits after reset."
          },
          {
            id: "force-push",
            title: "Force Push Damage",
            summary: "Fixing history rewritten by force push."
          },
          {
            id: "lost-branches",
            title: "Lost Branches",
            summary: "Finding deleted branches."
          },
          {
            id: "corrupted-repo",
            title: "Corrupted Repository",
            summary: "Handling repository corruption."
          }
        ]
      }
    ]
  }

];
