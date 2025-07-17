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

## Clean Code Principles Applied

### 1. **Meaningful Names**

- **Variables**: `STORAGE_FILE`, `taskNumber`, `totalTasks`
- **Functions**: `createTask()`, `validateTaskNumber()`, `isValidTaskDescription()`
- **Constants**: `STATUS.PENDING`, `COMMANDS.ADD`

```javascript
// ❌ Bad
function ct(d) {
  return { id: Date.now(), desc: d, stat: "p" };
}

// ✅ Good
function createTask(description) {
  return {
    id: Date.now(),
    description: description.trim(),
    status: STATUS.PENDING,
    createdAt: new Date().toISOString(),
  };
}
```

### 2. **Single Responsibility Principle**

Each function has one clear responsibility:

- `addTask()` - Only handles adding tasks
- `listTasks()` - Only handles displaying tasks
- `validateTaskNumber()` - Only validates task numbers
- `readTasksFromFile()` - Only handles file reading

### 3. **Small Functions**

Functions are kept small and focused:

- Most functions are under 20 lines
- Each function does one thing well
- Easy to understand and test

### 4. **Error Handling**

Comprehensive error handling with user-friendly messages:

```javascript
function validateTaskNumber(taskNumber, totalTasks) {
  const number = parseInt(taskNumber);

  if (isNaN(number) || number < 1 || number > totalTasks) {
    console.error(
      `Error: Invalid task number. Please use a number between 1 and ${totalTasks}`
    );
    return -1;
  }

  return number - 1;
}
```

### 5. **Consistent Formatting**

- Consistent indentation (2 spaces)
- Consistent naming conventions (camelCase)
- Logical code organization
- Clear spacing between logical sections

### 6. **Avoid Deep Nesting**

- Early returns to reduce nesting
- Guard clauses for validation
- Clear conditional flow

```javascript
// ❌ Deeply nested
function completeTask(taskNumber) {
  const tasks = readTasksFromFile();
  if (tasks.length > 0) {
    const taskIndex = validateTaskNumber(taskNumber, tasks.length);
    if (taskIndex !== -1) {
      if (tasks[taskIndex].status !== STATUS.COMPLETED) {
        // ... logic here
      }
    }
  }
}

// ✅ Flat structure with early returns
function completeTask(taskNumber) {
  const tasks = readTasksFromFile();
  const taskIndex = validateTaskNumber(taskNumber, tasks.length);

  if (taskIndex === -1) {
    return false;
  }

  if (tasks[taskIndex].status === STATUS.COMPLETED) {
    console.log("⚠️  Task is already completed");
    return false;
  }

  // ... continue with main logic
}
```

### 7. **User Experience Improvements**

- **Interactive Mode**: Continuous command input without restarting
- **Input Parsing**: Handles quoted strings and flexible input formats
- **Graceful Exit**: Multiple exit commands (exit, quit, q) and Ctrl+C handling
- **Context Awareness**: Shows current tasks on startup

```javascript
// Smart input parsing for better UX
function parseInput(input) {
  const trimmed = input.trim();
  if (!trimmed) return { command: "", args: [] };

  // Handle quoted strings for task descriptions
  const matches =
    trimmed.match(/^(\w+)\s+"([^"]+)"$/) ||
    trimmed.match(/^(\w+)\s+'([^']+)'$/);

  if (matches) {
    return { command: matches[1].toLowerCase(), args: [matches[2]] };
  }

  // Handle regular space-separated input
  const parts = trimmed.split(/\s+/);
  return { command: parts[0].toLowerCase(), args: parts.slice(1) };
}
```

### 8. **Constants Over Magic Numbers/Strings**

```javascript
const STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
};

const COMMANDS = {
  ADD: "add",
  LIST: "list",
  COMPLETE: "complete",
  REMOVE: "remove",
};
```

### 9. **Pure Functions Where Possible**

```javascript
// Pure function - no side effects, same input always produces same output
function createTask(description) {
  return {
    id: Date.now(),
    description: description.trim(),
    status: STATUS.PENDING,
    createdAt: new Date().toISOString(),
  };
}
```

### 10. **Separation of Concerns**

- File operations are separate from business logic
- Validation is separate from execution
- Command processing is separate from individual operations

### 11. **Readable Code Structure**

- Logical grouping of related functions
- Clear function and variable names
- Consistent code style
- Comments only where necessary (self-documenting code)

## File Structure

```
LSP-CleanCode/
├── todo.js          # Main application file
├── tasks.json       # Data storage (created automatically)
├── README.md        # This documentation
└── package.json     # Node.js project configuration (optional)
```
