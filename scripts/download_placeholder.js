import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

const mp3Path = path.join(projectRoot, 'public', 'assets', 'self-intro.mp3');
const jsonPath = path.join(projectRoot, 'public', 'assets', 'self-intro.json');

// Read the text from public/assets/self-intro.txt if it exists
const txtPath = path.join(projectRoot, 'public', 'assets', 'self-intro.txt');
let text = "Hi, I'm Ashrith Balaji, a Java Developer from Hyderabad, India. I recently graduated with a B.Tech in Computer Science with a focus on AI and ML from the Institute of Aeronautical Engineering. I work with Java and Spring Boot to build backend systems and REST APIs. I'm now looking for a full-time Java developer role where I can work on real systems and keep growing. I'm excited about this opportunity and happy to walk you through any of my projects.";

if (fs.existsSync(txtPath)) {
  text = fs.readFileSync(txtPath, 'utf8').trim();
}

async function main() {
  // Use StreamElements TTS API (wraps Amazon Polly neural voices - Matthew is a very natural US English Male voice)
  const url = `https://api.streamelements.com/api/v2/speech?voice=Matthew&text=${encodeURIComponent(text)}`;
  console.log(`Downloading high-quality male voiceover (Amazon Polly Matthew) from StreamElements...`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(mp3Path, Buffer.from(arrayBuffer));
    console.log(`Audio saved successfully to: ${mp3Path}`);
    
    // Estimate word timings (about 25.5 seconds for 76 words at standard speaking rate)
    const words = text.split(/\s+/);
    const duration = 25.5; // seconds
    const timePerWord = duration / words.length;
    
    const subtitles = words.map((word, index) => {
      const start = index * timePerWord;
      const end = start + timePerWord;
      return {
        word: word,
        start: Math.round(start * 100) / 100,
        end: Math.round(end * 100) / 100
      };
    });
    
    fs.writeFileSync(jsonPath, JSON.stringify(subtitles, null, 2), 'utf8');
    console.log(`Subtitles JSON saved successfully to: ${jsonPath}`);
    
  } catch (error) {
    console.error(`Error downloading audio:`, error);
  }
}

main();
