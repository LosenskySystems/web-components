#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find all component directories
const componentDirs = glob.sync('src/**/index.js', { cwd: process.cwd() });

// Base exports that should always be present
const baseExports = {
  '.': {
    import: './dist/index.esm.js',
    require: './dist/index.cjs.js',
    browser: './dist/index.umd.js',
    style: './dist/index.css'
  },
  './styles/*': './dist/styles/*',
  './package.json': './package.json'
};

// Auto-generate component exports
const componentExports = {};

componentDirs.forEach(componentPath => {
  // Extract the component path without src/ prefix and index.js suffix
  const exportPath = componentPath
    .replace('src/', './')
    .replace('/index.js', '');
  
  // Skip if it's the main index.js
  if (exportPath === './index') return;
  
  // Generate exports for each component
  const distPath = './dist/' + exportPath.replace('./', '');
  componentExports[exportPath] = {
    import: distPath + '/index.esm.js',
    require: distPath + '/index.cjs.js'  
  };
  
  // Add style export if CSS exists
  const cssPath = componentPath.replace('index.js', 'index.css');
  const srcCssPath = cssPath.replace('src/', '');
  if (fs.existsSync(path.join(process.cwd(), 'src', srcCssPath))) {
    componentExports[exportPath].style = distPath + '/index.css';
  }
});

// Merge all exports - ensure main exports stay clean
const allExports = { ...baseExports };
allExports['.'] = {
  import: './dist/index.esm.js',
  require: './dist/index.cjs.js', 
  browser: './dist/index.umd.js',
  style: './dist/index.css'
};
Object.assign(allExports, componentExports);

// Read current package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update exports
packageJson.exports = allExports;

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ Exports updated successfully!');
console.log('📦 Generated exports for components:', Object.keys(componentExports));
