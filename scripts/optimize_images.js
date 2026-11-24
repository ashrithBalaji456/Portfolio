import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('public/assets');

async function optimizeImages() {
  console.log('Optimizing project and site images in:', assetsDir);
  const files = fs.readdirSync(assetsDir);
  let totalOriginal = 0;
  let totalOptimized = 0;
  let convertedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const inputPath = path.join(assetsDir, file);
    const baseName = path.basename(file, ext);
    const outputPath = path.join(assetsDir, `${baseName}.webp`);

    const stat = fs.statSync(inputPath);
    totalOriginal += stat.size;

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      // Resize wide landscape images to max width 1000px (crystal sharp for retina, tiny filesize)
      let transform = sharp(inputPath);
      if (metadata.width && metadata.width > 1000) {
        transform = transform.resize({ width: 1000, withoutEnlargement: true });
      }

      await transform
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);

      const outStat = fs.statSync(outputPath);
      totalOptimized += outStat.size;
      convertedCount++;

      console.log(
        `✓ ${file} (${Math.round(stat.size / 1024)} KB) -> ${baseName}.webp (${Math.round(outStat.size / 1024)} KB) [${Math.round((1 - outStat.size / stat.size) * 100)}% smaller]`
      );
    } catch (err) {
      console.error(`✗ Error converting ${file}:`, err.message);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Converted ${convertedCount} images.`);
  console.log(`Original total: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized WebP total: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total bandwidth saved: ${((totalOriginal - totalOptimized) / (1024 * 1024)).toFixed(2)} MB (${Math.round((1 - totalOptimized / totalOriginal) * 100)}% reduction)`);
}

optimizeImages();
