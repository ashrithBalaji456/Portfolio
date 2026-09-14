import asyncio
import json
import os
import sys

# Ensure dependencies are installed
try:
    import edge_tts
except ImportError:
    print("Installing edge-tts library...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts"])
    import edge_tts

async def amain():
    # Paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    txt_path = os.path.join(project_root, "public", "assets", "self-intro.txt")
    mp3_path = os.path.join(project_root, "public", "assets", "self-intro.mp3")
    json_path = os.path.join(project_root, "public", "assets", "self-intro.json")

    if not os.path.exists(txt_path):
        print(f"Error: self-intro.txt not found at {txt_path}")
        sys.exit(1)

    with open(txt_path, "r", encoding="utf-8") as f:
        text = f.read().strip()

    # Voice: en-IN-PrabhatNeural (Indian English male voice)
    voice = "en-IN-PrabhatNeural"
    print(f"Generating voiceover using voice: {voice}...")
    
    communicate = edge_tts.Communicate(text, voice)
    
    subtitles = []
    audio_data = bytearray()
    sentences = []
    
    # We use communicate.stream() to get both audio data and boundary timestamps
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data.extend(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            start_sec = chunk["offset"] / 10000000.0
            duration_sec = chunk["duration"] / 10000000.0
            subtitles.append({
                "word": chunk["text"],
                "start": round(start_sec, 3),
                "end": round(start_sec + duration_sec, 3)
            })
        elif chunk["type"] == "SentenceBoundary":
            start_sec = chunk["offset"] / 10000000.0
            duration_sec = chunk["duration"] / 10000000.0
            sentences.append({
                "text": chunk["text"],
                "start": start_sec,
                "duration": duration_sec
            })

    # If WordBoundary wasn't yielded by the API, derive words from sentences
    if not subtitles and sentences:
        for s in sentences:
            words = s["text"].split()
            if not words:
                continue
            word_dur = s["duration"] / len(words)
            for i, w in enumerate(words):
                w_start = s["start"] + i * word_dur
                w_end = w_start + word_dur
                subtitles.append({
                    "word": w,
                    "start": round(w_start, 3),
                    "end": round(w_end, 3)
                })

    # Save audio
    with open(mp3_path, "wb") as f:
        f.write(audio_data)
    print(f"Audio saved to: {mp3_path}")

    # Save JSON subtitles
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(subtitles, f, indent=2, ensure_ascii=False)
    print(f"Subtitles JSON saved to: {json_path}")

if __name__ == "__main__":
    asyncio.run(amain())
