import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import WebSocket from 'ws';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

const txtPath = path.join(projectRoot, 'public', 'assets', 'self-intro.txt');
const mp3Path = path.join(projectRoot, 'public', 'assets', 'self-intro.mp3');
const jsonPath = path.join(projectRoot, 'public', 'assets', 'self-intro.json');

if (!fs.existsSync(txtPath)) {
  console.error(`Error: self-intro.txt not found at ${txtPath}`);
  process.exit(1);
}

const text = fs.readFileSync(txtPath, 'utf8').trim();

// Voice: en-US-AndrewNeural (natural English male voice)
// Alternate options: en-IN-PrabhatNeural (Indian English male)
const voice = 'en-US-AndrewNeural';

console.log(`Generating audio with voice: ${voice}...`);

function getUUID() {
  return crypto.randomUUID().replace(/-/g, '');
}

function getSSML(text, voice) {
  return `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${voice}'><prosody pitch='+0Hz' rate='+0%' volume='+0%'>${text}</prosody></voice></speak>`;
}

// Generate the Sec-MS-GEC token based on Microsoft's algorithm
// Round the current Windows Filetime (ticks since 1601) to the nearest 5-minute interval
const ticks = BigInt(Date.now()) * 10000n + 116444736000000000n;
const roundedTicks = (ticks / 3000000000n) * 3000000000n;
const inputStr = roundedTicks.toString() + "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const gecToken = crypto.createHash('sha256').update(inputStr).digest('hex').toUpperCase();

const wsUrl = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4`;

console.log(`Sec-MS-GEC Token Generated: ${gecToken}`);

const ws = new WebSocket(wsUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Sec-MS-GEC': gecToken,
    'Sec-MS-GEC-Version': '1-1.30.0',
  }
});

let audioData = [];
let wordBoundaries = [];

ws.on('open', () => {
  console.log('Connected to Edge TTS WebSocket.');
  
  // Send speech.config
  const requestId = getUUID();
  const configMsg = `X-Timestamp:${new Date().toISOString()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"system":{"name":"SpeechSDK","version":"1.30.0","build":"JavaScript","lang":"JavaScript"}}}`;
  ws.send(configMsg);

  // Send SSML
  const ssmlMsg = `X-RequestId:${requestId}\r\nContent-Type:ssml+xml; charset=utf-8\r\nPath:ssml\r\n\r\n${getSSML(text, voice)}`;
  ws.send(ssmlMsg);
});

ws.on('message', (data, isBinary) => {
  if (isBinary) {
    const headerLength = data.readUInt16BE(0);
    const headers = data.toString('utf8', 2, 2 + headerLength);
    const payload = data.subarray(2 + headerLength);
    
    if (headers.includes('Path: audio')) {
      audioData.push(payload);
    }
  } else {
    const textMsg = data.toString('utf8');
    if (textMsg.includes('Path: speech.config')) {
      // Config response
    } else if (textMsg.includes('Path: audio.metadata')) {
      try {
        const bodyIndex = textMsg.indexOf('\r\n\r\n');
        if (bodyIndex !== -1) {
          const bodyJson = textMsg.substring(bodyIndex + 4);
          const metadata = JSON.parse(bodyJson);
          if (metadata.Metadata) {
            for (const meta of metadata.Metadata) {
              if (meta.Type === 'WordBoundary') {
                const data = meta.Data;
                const startSec = data.Offset / 10000000;
                const durationSec = data.Duration / 10000000;
                wordBoundaries.push({
                  word: data.text.text,
                  start: Math.round(startSec * 1000) / 1000,
                  end: Math.round((startSec + durationSec) * 1000) / 1000
                });
              }
            }
          }
        }
      } catch (e) {
        console.error('Error parsing metadata:', e);
      }
    } else if (textMsg.includes('Path: turn.end')) {
      console.log('Synthesis finished.');
      ws.close();
    }
  }
});

ws.on('close', () => {
  if (audioData.length === 0) {
    console.error('Error: No audio data received!');
    process.exit(1);
  }
  
  const buffer = Buffer.concat(audioData);
  fs.writeFileSync(mp3Path, buffer);
  console.log(`Audio saved to: ${mp3Path}`);
  
  fs.writeFileSync(jsonPath, JSON.stringify(wordBoundaries, null, 2), 'utf8');
  console.log(`Subtitles JSON saved to: ${jsonPath}`);
  
  process.exit(0);
});

ws.on('error', (err) => {
  console.error('WebSocket error:', err);
  process.exit(1);
});
