import assemblyai as aai

audio_url = "https://storage.googleapis.com/aai-web-samples/meeting.mp3"

config = aai.TranscriptionConfig(
    speaker_labels=True,)

transcript = aai.Transcriber().transcribe(audio_url, config)

for utterance in transcript.utterances:
    start_sec = utterance.start // 1000
    end_sec = utterance.end // 1000
    start_min, start_s = divmod(start_sec, 60)
    end_min, end_s = divmod(end_sec, 60)
    print(
        f"Speaker {utterance.speaker} [{start_min:02d}:{start_s:02d} - {end_min:02d}:{end_s:02d}]: {utterance.text}"
    )