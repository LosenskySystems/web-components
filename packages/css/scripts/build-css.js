#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy all CSS files to dist
function copyCSS(srcPath, distPath) {
  const items = fs.readdirSync(srcPath, { withFileTypes: true });
  
  for (const item of items) {
    const srcItemPath = path.join(srcPath, item.name);
    const distItemPath = path.join(distPath, item.name);
    
    if (item.isDirectory()) {
      if (!fs.existsSync(distItemPath)) {
        fs.mkdirSync(distItemPath, { recursive: true });
      }
      copyCSS(srcItemPath, distItemPath);
    } else if (item.name.endsWith('.css')) {
      fs.copyFileSync(srcItemPath, distItemPath);
    }
  }
}

// Build process
function build() {
  console.log('🎨 Building CSS package...');
  
  // Copy all CSS files
  copyCSS(srcDir, distDir);
  
  console.log('✅ CSS build complete!');
  console.log(`📁 Output: ${distDir}`);
}

build();
