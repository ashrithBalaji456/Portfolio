import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processImage(inputPath, outputPath, options = {}) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = Buffer.from(data);

  const {
    type = 'luma', // 'circle', 'ellipse', 'luma', 'astronaut'
    threshold = 28,
    feather = 22,
    centerRatio = [0.5, 0.5],
    radiusRatio = [0.45, 0.45]
  } = options;

  if (type === 'circle' || type === 'ellipse') {
    const cx = width * centerRatio[0];
    const cy = height * centerRatio[1];
    const rx = width * radiusRatio[0];
    const ry = height * radiusRatio[1];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const dx = (x - cx) / rx;
        const dy = (y - cy) / ry;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist >= 1.0) {
          pixels[idx + 3] = 0;
        } else if (dist > 0.92) {
          const factor = (1.0 - dist) / (1.0 - 0.92);
          pixels[idx + 3] = Math.round(pixels[idx + 3] * factor);
        }
      }
    }
  } else {
    // Smart flood-fill or edge-connected dark removal + luma ramp
    // First, find all pixels connected to the borders that are dark
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Helper to get pixel brightness
    const getBrightness = (x, y) => {
      const idx = (y * width + x) * channels;
      return 0.299 * pixels[idx] + 0.587 * pixels[idx + 1] + 0.114 * pixels[idx + 2];
    };

    // Seed borders
    for (let x = 0; x < width; x++) {
      queue.push(x, 0);
      queue.push(x, height - 1);
      visited[x] = 1;
      visited[(height - 1) * width + x] = 1;
    }
    for (let y = 0; y < height; y++) {
      queue.push(0, y);
      queue.push(width - 1, y);
      visited[y * width] = 1;
      visited[y * width + (width - 1)] = 1;
    }

    let head = 0;
    while (head < queue.length) {
      const qx = queue[head++];
      const qy = queue[head++];
      const b = getBrightness(qx, qy);

      // If this connected pixel is dark space
      if (b <= threshold + feather) {
        // Compute alpha based on brightness
        const idx = (qy * width + qx) * channels;
        if (b <= threshold) {
          pixels[idx + 3] = 0;
        } else {
          const alphaFactor = (b - threshold) / feather;
          pixels[idx + 3] = Math.round(255 * Math.min(1, Math.max(0, alphaFactor)));
        }

        // Check 4 neighbors
        const neighbors = [
          [qx + 1, qy],
          [qx - 1, qy],
          [qx, qy + 1],
          [qx, qy - 1]
        ];

        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nPos = ny * width + nx;
            if (!visited[nPos]) {
              visited[nPos] = 1;
              const nb = getBrightness(nx, ny);
              // Only flood into dark / space pixels
              if (nb <= threshold + feather) {
                queue.push(nx, ny);
              }
            }
          }
        }
      }
    }

    // Also do an edge vignette feather to guarantee ZERO rectangular border cutoffs
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const edgeDistX = Math.min(x, width - 1 - x);
        const edgeDistY = Math.min(y, height - 1 - y);
        const edgeDist = Math.min(edgeDistX, edgeDistY);
        const margin = 20;
        if (edgeDist < margin) {
          const idx = (y * width + x) * channels;
          const factor = edgeDist / margin;
          pixels[idx + 3] = Math.round(pixels[idx + 3] * factor);
        }
      }
    }
  }

  await sharp(pixels, {
    raw: {
      width,
      height,
      channels
    }
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Saved transparent PNG to ${outputPath}`);
}

async function main() {
  const assetsDir = path.resolve('public/assets');

  // 1. Mars: pure planet sphere
  console.log('Processing Mars...');
  await processImage(
    path.join(assetsDir, 'mars-realistic.jpg'),
    path.join(assetsDir, 'mars-realistic.png'),
    {
      type: 'circle',
      centerRatio: [0.5, 0.5],
      radiusRatio: [0.44, 0.44]
    }
  );

  // 2. Astronaut: smart connected dark-space removal
  console.log('Processing Astronaut...');
  await processImage(
    path.join(assetsDir, 'astronaut-realistic.jpg'),
    path.join(assetsDir, 'astronaut-realistic.png'),
    {
      type: 'luma',
      threshold: 30,
      feather: 25
    }
  );

  // 3. Saturn: ellipse with rings or luma
  console.log('Processing Saturn...');
  await processImage(
    path.join(assetsDir, 'saturn-realistic.jpg'),
    path.join(assetsDir, 'saturn-realistic.png'),
    {
      type: 'luma',
      threshold: 24,
      feather: 20
    }
  );

  // 4. Spaceship: luma
  console.log('Processing Spaceship...');
  await processImage(
    path.join(assetsDir, 'spaceship-realistic.jpg'),
    path.join(assetsDir, 'spaceship-realistic.png'),
    {
      type: 'luma',
      threshold: 28,
      feather: 22
    }
  );

  console.log('All realistic PNG assets processed successfully!');
}

main().catch(err => {
  console.error('Error processing assets:', err);
  process.exit(1);
});
