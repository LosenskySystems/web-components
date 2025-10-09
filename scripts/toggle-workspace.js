#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const workspaceFile = path.join(__dirname, '../pnpm-workspace.yaml');
const backupFile = path.join(__dirname, '../pnpm-workspace.backup.yaml');

const mode = process.argv[2];

const withApps = `packages:
  - "packages/*"
  - "apps/*"  # Local development mode - uses local packages
`;

const withoutApps = `packages:
  - "packages/*"
  # apps moved to separate repo
`;

if (mode === 'enable') {
  // Backup current workspace file
  const current = fs.readFileSync(workspaceFile, 'utf-8');
  fs.writeFileSync(backupFile, current);
  
  // Enable apps in workspace
  fs.writeFileSync(workspaceFile, withApps);
  console.log('✅ Local development mode ENABLED');
  console.log('   Apps will use local packages from workspace');
  console.log('   Run "pnpm install" to link packages');
} else if (mode === 'disable') {
  // Restore workspace without apps
  fs.writeFileSync(workspaceFile, withoutApps);
  
  // Clean up backup
  if (fs.existsSync(backupFile)) {
    fs.unlinkSync(backupFile);
  }
  
  console.log('✅ Local development mode DISABLED');
  console.log('   Workspace restored to packages only');
} else {
  console.error('Usage: node toggle-workspace.js [enable|disable]');
  process.exit(1);
}

