import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const srcDir = path.join(__dirname, '../../src/assets/blog');
const distDir = path.join(__dirname, '../../dist/assets');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy images from src to dist/assets
try {
  const files = fs.readdirSync(srcDir);
  
  console.log(`Found ${files.length} files in ${srcDir}`);
  
  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(distDir, file);
    
    // Only copy image files
    if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} to ${destPath}`);
    }
  });
  
  console.log('Assets copied successfully!');
} catch (error) {
  console.error('Error copying assets:', error);
} 