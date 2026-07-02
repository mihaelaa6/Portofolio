from flask import Flask, request
from twilio.twiml.voice_response import VoiceResponse
from dotenv import load_dotenv
import os
import openai
import requests

load_dotenv()
app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")
DEEPGRAM_KEY = os.getenv("DEEPGRAM_API_KEY")
ELEVEN_KEY = os.getenv("ELEVENLABS_API_KEY")


def transcribe_audio(url):
    # Download Twilio audio
    audio = requests.get(url).content

    # Send to Deepgram
    dg = requests.post(
        "https://api.deepgram.com/v1/listen",
        headers={"Authorization": f"Token {DEEPGRAM_KEY}"},
        data=audio
    ).json()

    return dg["results"]["channels"][0]["alternatives"][0]["transcript"]


def generate_reply(text):
    completion = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a warm, human-sounding patient calling a medical office. "
                    "Speak naturally with short sentences, occasional pauses, and conversational tone. "
                    "You are testing scheduling, refills, and office questions, but stay realistic."
                )
            },
            {"role": "user", "content": text}
        ]
    )

    reply = completion.choices[0].message["content"]
    # Add soft pauses for more natural speech
    reply = reply.replace(".", "... ")
    return reply


def synthesize_voice(text):
    response = requests.post(
        "https://api.elevenlabs.io/v1/text-to-speech/nicole",
        headers={"xi-api-key": ELEVEN_KEY},
        json={
            "text": text,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "stability": 0.2,
                "similarity_boost": 0.85,
                "style": 0.6,
                "use_speaker_boost": True
            }
        }
    )

    # Save audio file
    filename = "response.mp3"
    with open(filename, "wb") as f:
        f.write(response.content)

    return filename


@app.route("/voice", methods=["POST"])
def voice():
    recording_url = request.form.get("RecordingUrl")

    if not recording_url:
        # Ask caller to speak
        response = VoiceResponse()
        response.say("Hello, I'm your AI assistant. What can I help you with?")
        response.record(
            play_beep=True,
            max_length=5,
            action="/voice"
        )
        return str(response)

    # Step 1: Transcribe caller speech
    user_text = transcribe_audio(recording_url)

    # Fallback if transcription is empty
    if not user_text or not user_text.strip():
        ai_reply = "Sorry, I didn’t catch that. Could you repeat that for me?"
        audio_file = synthesize_voice(ai_reply)

        response = VoiceResponse()
        response.play(f"https://palpitate-ashamed-five.ngrok-free.dev/{audio_file}")
        response.record(
            play_beep=True,
            max_length=5,
            action="/voice"
        )
        return str(response)

    # Step 2: Generate AI response
    ai_reply = generate_reply(user_text)

    # Step 3: Convert AI reply to natural voice
    audio_file = synthesize_voice(ai_reply)

    # Step 4: Play the audio file
    response = VoiceResponse()
    response.play(f"https://palpitate-ashamed-five.ngrok-free.dev/{audio_file}")

    # Step 5: Continue conversation
    response.record(
        play_beep=True,
        max_length=5,
        action="/voice"
    )

    return str(response)


if __name__ == "__main__":
    app.run(port=5000)
