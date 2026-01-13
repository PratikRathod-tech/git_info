import os

# Base directory (current directory where script is run)
BASE_DIR = os.getcwd()

# Folders to create
folders = [
    "css",
    "js",
    "components",
    "assets",
    "assets/images",
    "assets/icons"
]

# Files to create
files = [
    "index.html",
    "README.md",
    "css/tailwind.css",
    "css/custom.css",
    "js/app.js",
    "js/data.js",
    "js/router.js",
    "components/sidebar.js",
    "components/topic.js",
    "components/progress.js"
]

# Create folders
for folder in folders:
    folder_path = os.path.join(BASE_DIR, folder)
    os.makedirs(folder_path, exist_ok=True)

# Create files
for file in files:
    file_path = os.path.join(BASE_DIR, file)
    if not os.path.exists(file_path):
        with open(file_path, "w", encoding="utf-8") as f:
            f.write("")

print("✔ Folder structure and files created successfully.")
