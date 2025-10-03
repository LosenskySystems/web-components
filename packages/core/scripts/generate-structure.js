#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const packageJsonPath = path.join(rootDir, 'package.json');

// Read package.json for metadata
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Helper function to read TypeScript files and extract exports/props
function analyzeComponent(componentPath) {
  const indexPath = path.join(componentPath, 'index.tsx');
  if (!fs.existsSync(indexPath)) return null;
  
  const content = fs.readFileSync(indexPath, 'utf8');
  
  // Extract interface/type definitions (basic regex parsing)
  const interfaceMatch = content.match(/export interface (\w+Props)\s*{([^}]+)}/s);
  const exportMatch = content.match(/export const (\w+):/);
  
  let props = {};
  if (interfaceMatch) {
    const propsContent = interfaceMatch[2];
    // Basic prop extraction (this could be more sophisticated)
    const propLines = propsContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));
    propLines.forEach(line => {
      const match = line.match(/^\s*(\w+)\??\s*:\s*(.+?);?\s*$/);
      if (match) {
        props[match[1]] = match[2].replace(/;$/, '').trim();
      }
    });
  }
  
  const componentName = exportMatch ? exportMatch[1] : null;
  const propsName = interfaceMatch ? interfaceMatch[1] : null;
  
  return {
    name: componentName,
    exports: [componentName, propsName].filter(Boolean),
    props
  };
}

// Scan components directory
function scanComponents() {
  const componentsDir = path.join(srcDir, 'components');
  const structure = {};
  
  // Scan elements directory
  const elementsDir = path.join(componentsDir, 'elements');
  if (fs.existsSync(elementsDir)) {
    structure.elements = {};
    
    const elementDirs = fs.readdirSync(elementsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    elementDirs.forEach(elementName => {
      const elementPath = path.join(elementsDir, elementName);
      const analysis = analyzeComponent(elementPath);
      
      if (analysis) {
        // Determine subcategory based on component type
        let subcategory = 'general';
        if (elementName.includes('button')) subcategory = 'interactive';
        if (elementName.includes('input') || elementName.includes('form')) subcategory = 'form';
        
        structure.elements[elementName] = {
          name: analysis.name,
          path: `./components/elements/${elementName}`,
          exports: analysis.exports,
          props: analysis.props,
          css: `./components/elements/${elementName}/index.css`,
          category: 'elements',
          subcategory
        };
      }
    });
  }
  
  return structure;
}

// Scan constants
function scanConstants() {
  const constantsPath = path.join(srcDir, 'constants', 'index.ts');
  if (!fs.existsSync(constantsPath)) return {};
  
  const content = fs.readFileSync(constantsPath, 'utf8');
  const exports = content.match(/export\s+(?:const|let|var)\s+(\w+)/g) || [];
  
  const constants = {};
  exports.forEach(exportMatch => {
    const name = exportMatch.match(/export\s+(?:const|let|var)\s+(\w+)/)[1];
    constants[name] = {
      path: './constants',
      exports: [name],
      description: `Design system ${name} tokens`
    };
  });
  
  return constants;
}

// Scan utils
function scanUtils() {
  const helpersPath = path.join(srcDir, 'utils', 'helpers.ts');
  if (!fs.existsSync(helpersPath)) return {};
  
  const content = fs.readFileSync(helpersPath, 'utf8');
  const functionMatches = content.match(/export const (\w+) = \(([^)]+)\)[^=]*=>/g) || [];
  
  const utils = {};
  functionMatches.forEach(match => {
    const nameMatch = match.match(/export const (\w+)/);
    const paramsMatch = match.match(/\(([^)]+)\)/);
    
    if (nameMatch) {
      const name = nameMatch[1];
      const params = paramsMatch ? paramsMatch[1] : '';
      
      let description = '';
      switch (name) {
        case 'debounce': description = 'Debounce function calls'; break;
        case 'throttle': description = 'Throttle function calls'; break;
        case 'formatClassNames': description = 'Format and filter class names'; break;
        case 'generateUniqueId': description = 'Generate unique ID strings'; break;
        default: description = `Utility function: ${name}`;
      }
      
      utils[name] = {
        path: './utils/helpers',
        signature: `(${params}) => any`, // Simplified signature
        description
      };
    }
  });
  
  return utils;
}

// Generate the complete structure
function generateStructure() {
  const components = scanComponents();
  const constants = scanConstants();
  const utils = scanUtils();
  
  // Count components
  let totalComponents = 0;
  const categories = new Set();
  const subcategories = new Set();
  
  Object.values(components).forEach(category => {
    Object.values(category).forEach(component => {
      totalComponents++;
      categories.add(component.category);
      subcategories.add(component.subcategory);
    });
  });
  
  const structure = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    structure: {
      components,
      constants,
      utils
    },
    exports: {
      main: {
        path: './dist/index.js',
        types: './dist/index.d.ts',
        css: './dist/index.css'
      }
    },
    metadata: {
      totalComponents,
      categories: Array.from(categories),
      subcategories: Array.from(subcategories),
      generatedAt: new Date().toISOString(),
      buildTool: 'vite',
      framework: 'react'
    }
  };
  
  return structure;
}

// Write the structure file
function writeStructureFile() {
  const structure = generateStructure();
  const outputPath = path.join(rootDir, 'structure.json');
  
  fs.writeFileSync(outputPath, JSON.stringify(structure, null, 2));
}

// Run the script
writeStructureFile();
