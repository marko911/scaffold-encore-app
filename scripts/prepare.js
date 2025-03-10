#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to find and rename .gitignore files to gitignore.template
function processGitignoreFiles(directory) {
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processGitignoreFiles(itemPath);
    } else if (item === '.gitignore') {
      // Rename .gitignore to gitignore.template
      const newPath = path.join(directory, 'gitignore.template');
      fs.renameSync(itemPath, newPath);
      console.log(`Renamed ${itemPath} to ${newPath}`);
    }
  }
}

// Main function
function main() {
  const templateDir = path.join(__dirname, '..', 'template');
  
  if (fs.existsSync(templateDir)) {
    console.log('Processing template directory for gitignore files...');
    processGitignoreFiles(templateDir);
    console.log('Done processing gitignore files.');
  } else {
    console.log('Template directory not found.');
  }
}

main(); 