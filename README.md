# Clean Todo CLI

A simple, well-structured command-line todo application built with Clean Code principles in mind.

## Features

- ✅ Add new tasks
- 📋 List all tasks with status indicators
- ✅ Mark tasks as completed
- 🗑️ Remove tasks
- 💾 Persistent storage using JSON file
- 🎯 Clean, readable code structure

## Installation & Setup

1. **Prerequisites**: Node.js (v12 or higher)
2. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd LSP-CleanCode
   ```

## Usage

### Interactive Mode (Recommended)

Simply run the application without any arguments to start interactive mode:

```bash
node todo.js
```

This will start an interactive session where you can enter commands continuously:

```bash
🚀 Welcome to Clean Todo CLI - Interactive Mode!
Type "help" for available commands or "exit" to quit.

📝 No tasks found. Add your first task with: add "Your task"

📝 todo> add "Learn Clean Code principles"
✅ Task added: "Learn Clean Code principles"

📝 todo> add "Build a CLI application"
✅ Task added: "Build a CLI application"

📝 todo> list
📋 Your Tasks:
──────────────────────────────────────────────────
1. ⏳ Learn Clean Code principles
2. ⏳ Build a CLI application
──────────────────────────────────────────────────
Total: 2 tasks

📝 todo> complete 1
✅ Task 1 marked as completed

📝 todo> help
📚 Available Commands:
  add "Task description"       - Add a new task
  list                         - List all tasks
  complete <task-number>       - Mark task as completed
  remove <task-number>         - Remove a task
  help                         - Show this help message
  exit, quit, q                - Exit the application

📝 todo> exit
👋 Goodbye! Thanks for using Clean Todo CLI!
```

### Command-Line Mode

You can also run single commands directly:

```bash
# Add a new task
node todo.js add "Buy groceries"

# List all tasks
node todo.js list

# Mark task as completed
node todo.js complete 1

# Remove a task
node todo.js remove 2

# Force command-line mode (bypass interactive)
node todo.js --cli list
```

### Interactive Commands

In interactive mode, you can use these commands:

- `add "Task description"` - Add a new task
- `list` - Show all tasks
- `complete <number>` - Mark task as completed
- `remove <number>` - Remove a task
- `help` - Show available commands
- `exit`, `quit`, or `q` - Exit the application

### Example Session

**Interactive Mode:**

```bash
$ node todo.js
🚀 Welcome to Clean Todo CLI - Interactive Mode!
Type "help" for available commands or "exit" to quit.

📝 No tasks found. Add your first task with: add "Your task"

📝 todo> add "Learn Clean Code principles"
✅ Task added: "Learn Clean Code principles"

📝 todo> add "Build a CLI application"
✅ Task added: "Build a CLI application"

📝 todo> list
📋 Your Tasks:
──────────────────────────────────────────────────
1. ⏳ Learn Clean Code principles
2. ⏳ Build a CLI application
──────────────────────────────────────────────────
Total: 2 tasks

📝 todo> complete 1
✅ Task 1 marked as completed

📝 todo> remove 2
🗑️  Task 2 removed: "Build a CLI application"

📝 todo> exit
👋 Goodbye! Thanks for using Clean Todo CLI!
```

**Command-Line Mode:**

```bash
$ node todo.js add "Quick task"
✅ Task added: "Quick task"

$ node todo.js list
📋 Your Tasks:
──────────────────────────────────────────────────
1. ⏳ Quick task
──────────────────────────────────────────────────
Total: 1 tasks
```

## File Structure

```
LSP-CleanCode/
├── todo.js          # Main application file
├── tasks.json       # Data storage (created automatically)
├── README.md        # This documentation
└── package.json     # Node.js project configuration (optional)
```
