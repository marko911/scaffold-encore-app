#!/bin/bash

# Make the script executable
chmod +x ./index.js
chmod +x ./scripts/prepare.js

# Get the current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

# Bump the patch version
echo "Bumping version..."
npm version patch --no-git-tag-version

# Get the new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "New version: $NEW_VERSION"

# Run the prepare script to handle gitignore files
echo "Preparing package..."
node ./scripts/prepare.js

# Pack the package for testing
echo "Creating package for testing..."
npm pack

# Publish to npm
echo "Publishing to npm..."
npm publish

echo "Successfully published enstack version $NEW_VERSION to npm"
echo "You can now install it with: npx enstack" 