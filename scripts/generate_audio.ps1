Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Load text
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$txtPath = Join-Path $projectRoot "public\assets\self-intro.txt"
$wavPath = Join-Path $projectRoot "public\assets\self-intro.wav"
$jsonPath = Join-Path $projectRoot "public\assets\self-intro.json"

if (-not (Test-Path $txtPath)) {
    Write-Error "self-intro.txt not found!"
    exit 1
}

$text = [System.IO.File]::ReadAllText($txtPath).Trim()

# Find a male voice (Microsoft David is standard on all Windows machines)
$voices = $synth.GetInstalledVoices()
$selectedVoice = $null
foreach ($v in $voices) {
    if ($v.VoiceInfo.Name.Contains("David") -or $v.VoiceInfo.Name.Contains("Mark")) {
        $selectedVoice = $v.VoiceInfo.Name
        break
    }
}

if ($selectedVoice -ne $null) {
    $synth.SelectVoice($selectedVoice)
    Write-Output "Selected male voice: $selectedVoice"
} else {
    # Fallback to any voice containing male keywords
    foreach ($v in $voices) {
        if ($v.VoiceInfo.Description.ToLower().Contains("male")) {
            $selectedVoice = $v.VoiceInfo.Name
            $synth.SelectVoice($selectedVoice)
            Write-Output "Selected voice: $selectedVoice"
            break
        }
    }
}

if ($selectedVoice -eq $null) {
    Write-Output "No specific male voice found. Using Windows default voice."
}

# Synthesize speech to WAV
$synth.SetOutputToWaveFile($wavPath)
$synth.Speak($text)
$synth.Dispose()

Write-Output "Generated WAV audio saved to: $wavPath"

# Generate simple estimated word boundary JSON
$words = $text -split '\s+'
$duration = 24.5 # Estimated duration in seconds for David speaking this text at normal rate
$timePerWord = $duration / $words.Count

$subtitles = @()
for ($i = 0; $i -lt $words.Count; $i++) {
    $start = $i * $timePerWord
    $end = ($i + 1) * $timePerWord
    $subtitles += [PSCustomObject]@{
        word = $words[$i]
        start = [Math]::Round($start, 2)
        end = [Math]::Round($end, 2)
    }
}

$json = $subtitles | ConvertTo-Json
[System.IO.File]::WriteAllText($jsonPath, $json)
Write-Output "Subtitles JSON updated: $jsonPath"
