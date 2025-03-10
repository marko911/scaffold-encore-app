# Booking System Bootstrap

This package provides a simple way to bootstrap a new Encore booking system application.

## Usage

```bash
npx enstack
```

This will prompt you for a project name and create a new directory with that name containing a fully functional booking system application.

## What's Included

- **Frontend**: React application with Vite, TypeScript, and modern UI components
- **Booking Service**: Complete booking management system with availability checking
- **User Service**: Authentication and user management
- **Database**: SQL migrations and queries for booking data
- **Encore Integration**: Ready to deploy with Encore
- **Automatic Setup**: Installs both frontend and Go dependencies

## Development

To modify the template:

1. Edit files in the `template` directory
2. If you add any `.gitignore` files to the template, run `node scripts/rename-gitignore.js` to rename them to `gitignore.template`
3. Test your changes by running `node index.js` from the bootstrap directory
4. Publish to npm with `./publish.sh`

## Publishing

To publish a new version:

1. Make sure all `.gitignore` files in the template are renamed to `gitignore.template` (run `node scripts/rename-gitignore.js`)
2. Run `./publish.sh` to bump the version, prepare the package, and publish to npm

## Requirements

- Node.js 14 or higher
- npm or yarn
- pnpm (for frontend dependencies)
- Go 1.18 or higher (for backend dependencies)
- Encore CLI (for running the application)

## Features

- React frontend with Vite (using pnpm for dependencies)
- Booking service with availability management
- User authentication
- Automatic installation of Go dependencies
- Ready to deploy with Encore
