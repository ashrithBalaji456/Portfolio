import fs from 'fs';

const files = ['src/projectsData.js', 'src/freelanceData.js'];

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\.\/assets\/(project-[a-zA-Z0-9_-]+)\.(jpg|png)/g, './assets/$1.webp');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated:', file);
});
