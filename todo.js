const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Constants for better maintainability
const STORAGE_FILE = path.join(__dirname, 'tasks.json');
const COMMANDS = {
  ADD: 'add',
  LIST: 'list',
  COMPLETE: 'complete',
  REMOVE: 'remove'
};

const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed'
};

// Pure function to create a new task
function createTask(description) {
  return {
    id: Date.now(),
    description: description.trim(),
    status: STATUS.PENDING,
    createdAt: new Date().toISOString()
  };
}

// File operations with error handling
function readTasksFromFile() {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      return [];
    }
    
    const data = fs.readFileSync(STORAGE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks file:', error.message);
    return [];
  }
}

function writeTasksToFile(tasks) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(tasks, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing tasks file:', error.message);
    return false;
  }
}

// Task management functions
function addTask(description) {
  if (!isValidTaskDescription(description)) {
    console.error('Error: Task description cannot be empty');
    return false;
  }

  const tasks = readTasksFromFile();
  const newTask = createTask(description);
  tasks.push(newTask);
  
  if (writeTasksToFile(tasks)) {
    console.log(`✅ Task added: "${description}"`);
    return true;
  }
  return false;
}

function listTasks() {
  const tasks = readTasksFromFile();
  
  if (tasks.length === 0) {
    console.log('📝 No tasks found. Add your first task with: node todo.js add "Your task"');
    return;
  }

  console.log('\n📋 Your Tasks:');
  console.log('─'.repeat(50));
  
  tasks.forEach((task, index) => {
    const statusIcon = task.status === STATUS.COMPLETED ? '✅' : '⏳';
    const taskNumber = index + 1;
    console.log(`${taskNumber}. ${statusIcon} ${task.description}`);
  });
  
  console.log('─'.repeat(50));
  console.log(`Total: ${tasks.length} tasks`);
}

function completeTask(taskNumber) {
  const tasks = readTasksFromFile();
  const taskIndex = validateTaskNumber(taskNumber, tasks.length);
  
  if (taskIndex === -1) {
    return false;
  }

  if (tasks[taskIndex].status === STATUS.COMPLETED) {
    console.log('⚠️  Task is already completed');
    return false;
  }

  tasks[taskIndex].status = STATUS.COMPLETED;
  tasks[taskIndex].completedAt = new Date().toISOString();
  
  if (writeTasksToFile(tasks)) {
    console.log(`✅ Task ${taskNumber} marked as completed`);
    return true;
  }
  return false;
}

function removeTask(taskNumber) {
  const tasks = readTasksFromFile();
  const taskIndex = validateTaskNumber(taskNumber, tasks.length);
  
  if (taskIndex === -1) {
    return false;
  }

  const removedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);
  
  if (writeTasksToFile(tasks)) {
    console.log(`🗑️  Task ${taskNumber} removed: "${removedTask.description}"`);
    return true;
  }
  return false;
}

// Validation functions
function isValidTaskDescription(description) {
  return description && description.trim().length > 0;
}

function validateTaskNumber(taskNumber, totalTasks) {
  const number = parseInt(taskNumber);
  
  if (isNaN(number) || number < 1 || number > totalTasks) {
    console.error(`Error: Invalid task number. Please use a number between 1 and ${totalTasks}`);
    return -1;
  }
  
  return number - 1; // Convert to 0-based index
}

// Command processing
function processCommand(command, args) {
  switch (command) {
    case COMMANDS.ADD:
      if (args.length === 0) {
        console.error('Error: Please provide a task description');
        return false;
      }
      return addTask(args.join(' '));
      
    case COMMANDS.LIST:
      listTasks();
      return true;
      
    case COMMANDS.COMPLETE:
      if (args.length === 0) {
        console.error('Error: Please provide a task number');
        return false;
      }
      return completeTask(args[0]);
      
    case COMMANDS.REMOVE:
      if (args.length === 0) {
        console.error('Error: Please provide a task number');
        return false;
      }
      return removeTask(args[0]);
      
    case 'help':
      showUsage();
      return true;
      
    case 'exit':
    case 'quit':
    case 'q':
      return 'EXIT';
      
    default:
      console.error(`Error: Unknown command "${command}"`);
      showUsage();
      return false;
  }
}

function showUsage() {
  console.log('\n📚 Available Commands:');
  console.log('  add "Task description"       - Add a new task');
  console.log('  list                         - List all tasks');
  console.log('  complete <task-number>       - Mark task as completed');
  console.log('  remove <task-number>         - Remove a task');
  console.log('  help                         - Show this help message');
  console.log('  exit, quit, q                - Exit the application');
  console.log('\n💡 Examples:');
  console.log('  add "Buy groceries"');
  console.log('  complete 1');
  console.log('  remove 2');
}

// Parse user input into command and arguments
function parseInput(input) {
  const trimmed = input.trim();
  if (!trimmed) return { command: '', args: [] };
  
  // Handle quoted strings for task descriptions
  const matches = trimmed.match(/^(\w+)\s+"([^"]+)"$/) || 
                 trimmed.match(/^(\w+)\s+'([^']+)'$/);
  
  if (matches) {
    return { command: matches[1].toLowerCase(), args: [matches[2]] };
  }
  
  // Handle regular space-separated input
  const parts = trimmed.split(/\s+/);
  return { command: parts[0].toLowerCase(), args: parts.slice(1) };
}

// Interactive mode with readline
function startInteractiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '📝 todo> '
  });

  console.log('🚀 Welcome to Clean Todo CLI - Interactive Mode!');
  console.log('Type "help" for available commands or "exit" to quit.\n');
  
  // Show current tasks on startup
  listTasks();
  
  rl.prompt();

  rl.on('line', (input) => {
    const { command, args } = parseInput(input);
    
    if (!command) {
      rl.prompt();
      return;
    }
    
    const result = processCommand(command, args);
    
    if (result === 'EXIT') {
      console.log('👋 Goodbye! Thanks for using Clean Todo CLI!');
      rl.close();
      return;
    }
    
    console.log(); // Add spacing
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('\n👋 Goodbye! Thanks for using Clean Todo CLI!');
    process.exit(0);
  });

  // Handle Ctrl+C gracefully
  rl.on('SIGINT', () => {
    console.log('\n👋 Goodbye! Thanks for using Clean Todo CLI!');
    process.exit(0);
  });
}

// Command line mode (original functionality)
function runCommandLineMode(args) {
  if (args.length === 0) {
    console.log('🚀 Welcome to Clean Todo CLI!');
    console.log('Starting interactive mode...\n');
    startInteractiveMode();
    return;
  }

  const command = args[0].toLowerCase();
  const commandArgs = args.slice(1);
  
  processCommand(command, commandArgs);
}

// Main application entry point
function main() {
  const args = process.argv.slice(2);
  
  // Check if user wants to force command-line mode
  if (args.length > 0 && args[0] === '--cli') {
    const command = args[1]?.toLowerCase();
    const commandArgs = args.slice(2);
    
    if (!command) {
      console.log('🚀 Welcome to Clean Todo CLI!');
      showUsage();
      return;
    }
    
    processCommand(command, commandArgs);
    return;
  }
  
  // Default to interactive mode, but allow single commands
  runCommandLineMode(args);
}

// Run the application
if (require.main === module) {
  main();
}

module.exports = {
  createTask,
  addTask,
  listTasks,
  completeTask,
  removeTask,
  processCommand,
  parseInput
};