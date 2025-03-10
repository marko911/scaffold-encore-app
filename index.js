#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the template directory path (relative to this script)
const templateDir = path.join(__dirname, 'template');

function copyDirectory(source, destination) {
  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Read all items in the source directory
  const items = fs.readdirSync(source);

  // Process each item
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const destPath = path.join(destination, item);

    // Check if the item is a directory or file
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Recursively copy the directory
      copyDirectory(sourcePath, destPath);
    } else {
      // Skip node_modules, .git, and other common excluded directories
      if (item === 'node_modules' || item === '.git' || item === 'dist' || 
          item === '.DS_Store' || item.endsWith('.log')) {
        continue;
      }
      
      // Handle gitignore.template files
      if (item === 'gitignore.template') {
        // Rename to .gitignore when copying
        const gitignorePath = path.join(destination, '.gitignore');
        fs.copyFileSync(sourcePath, gitignorePath);
        console.log(`Created .gitignore from template in ${destination}`);
      } else {
        // Copy the file normally
        fs.copyFileSync(sourcePath, destPath);
      }
    }
  }
}

function initializeGitRepo(projectPath) {
  try {
    execSync('git init', { cwd: projectPath });
    console.log('Git repository initialized.');
  } catch (error) {
    console.warn('Failed to initialize git repository:', error.message);
  }
}

function setupFrontendDependencies(projectPath) {
  try {
    console.log('Setting up frontend dependencies...');
    // Check if pnpm is installed
    try {
      execSync('pnpm --version', { stdio: 'ignore' });
    } catch (e) {
      console.log('pnpm not found, installing globally...');
      execSync('npm install -g pnpm');
    }
    execSync('cd frontend && pnpm install', { cwd: projectPath });
    console.log('Frontend dependencies installed with pnpm.');
    console.log('Building frontend...');
    execSync('cd frontend && pnpm run build', { cwd: projectPath });
    console.log('Frontend build completed.');
  } catch (error) {
    console.warn('Failed to install frontend dependencies:', error.message);
    console.log('You can install them manually by running "cd frontend && pnpm install" in your project directory.');
  }
}

function setupGoDependencies(projectPath) {
  try {
    console.log('Installing Go dependencies...');
    execSync('go mod download', { cwd: projectPath });
    console.log('Go dependencies installed successfully.');
  } catch (error) {
    console.warn('Failed to install Go dependencies:', error.message);
    console.log('You can install them manually by running "go mod download" in your project directory.');
  }
}

function initializeEncoreApp(projectName) {
  try {
    console.log('To start your Encore application, run:');
    console.log(`cd ${projectName} && encore run and cd frontend && pnpm run dev`);
  } catch (error) {
    console.warn('Note: You need to install Encore CLI to initialize the application.');
  }
}

function main() {
  console.log('Time to init your Encore/React project.');
  
  rl.question('Enter project name: ', (projectName) => {
    if (!projectName) {
      console.error('Project name is required.');
      rl.close();
      return;
    }

    const projectPath = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(projectPath)) {
      rl.question(`Directory ${projectName} already exists. Overwrite? (y/N): `, (answer) => {
        if (answer.toLowerCase() === 'y') {
          bootstrapProject(projectPath, projectName);
        } else {
          console.log('Bootstrap cancelled.');
        }
        rl.close();
      });
    } else {
      bootstrapProject(projectPath, projectName);
      rl.close();
    }
  });
}

function bootstrapProject(projectPath, projectName) {
  console.log(`Creating project in ${projectPath}...`);
  
  // Create project directory
  fs.mkdirSync(projectPath, { recursive: true });
  
  // Copy template files
  copyDirectory(templateDir, projectPath);
  
  // Initialize git repository
  initializeGitRepo(projectPath);
  
  // Setup frontend dependencies
  setupFrontendDependencies(projectPath);
  
  // Setup Go dependencies
  setupGoDependencies(projectPath);
  
  // Initialize Encore app
  initializeEncoreApp(projectName);
  
  console.log(`
Project ${projectName} created successfully!

Next steps:
1. cd ${projectName}
2. Install Encore CLI if you haven't already: https://encore.dev/docs/install
3. Run 'encore app create' to initialize your Encore application
4. Start development with 'encore run'
  `);
}

main(); 