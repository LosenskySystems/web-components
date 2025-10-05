#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';

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

// Process main CSS file with PostCSS (Tailwind v4 handles its own processing)
async function processMainCSS() {
  const inputFile = path.join(srcDir, 'index.css');
  const outputFile = path.join(distDir, 'index.css');
  
  const css = fs.readFileSync(inputFile, 'utf8');
  const result = await postcss([
    postcssImport
  ]).process(css, { from: inputFile, to: outputFile });
  
  fs.writeFileSync(outputFile, result.css);
}

// Build process
async function build() {
  console.log('🎨 Building Tailwind CSS v4 package...');
  
  // Copy all CSS files first
  copyCSS(srcDir, distDir);
  
  // Process main index.css with imports
  await processMainCSS();
  
  console.log('✅ Tailwind CSS v4 build complete!');
  console.log(`📁 Output: ${distDir}`);
}

build().catch(console.error);
