Architecture Overview
This voice bot is designed to simulate realistic patient phone calls to the Pretty Good AI test line. The system uses Twilio for telephony, Deepgram for transcription, OpenAI for natural language generation, and ElevenLabs for voice synthesis. The goal is to create natural, human‑like conversations that test scheduling, medication refills, office questions, and edge‑case scenarios.

Call Flow
Outbound Call (Twilio)  
The bot initiates a call to the test number using Twilio’s REST API. Twilio handles the PSTN connection and sends call audio to the Flask server via webhook.

Audio Recording (Twilio)  
Each turn uses <Record> to capture caller speech. Twilio posts the recording URL to the /voice endpoint.

Speech‑to‑Text (Deepgram)  
The server downloads the audio file and sends it to Deepgram’s /listen endpoint for transcription.
Deepgram returns a transcript used as the user’s message.

AI Response (OpenAI)  
The transcript is passed to GPT‑4o‑mini with a system prompt that simulates a warm, natural‑sounding patient.
The model generates a short, conversational reply.

Voice Synthesis (ElevenLabs)  
The reply text is converted into natural speech using ElevenLabs’ multilingual v2 model with expressive voice settings.
The audio is saved as response.mp3.

Playback + Next Turn (Twilio)  
The server returns TwiML that plays the synthesized audio and immediately starts a new <Record> to continue the conversation.

Design Choices
Twilio was chosen for reliable PSTN calling and webhook control.

Deepgram provides fast, accurate transcription with low latency.

OpenAI GPT‑4o‑mini balances cost and conversational quality.

ElevenLabs produces natural, human‑like voice output suitable for long calls.

Short turn windows (5 seconds) reduce latency and create realistic pacing.

Reply smoothing (replace(".", "... ")) adds natural pauses to speech.

Fallback logic ensures the bot gracefully handles empty or unclear audio.

This architecture prioritizes clarity, natural pacing, and robustness during long conversations — all critical for the Pretty Good AI evaluation criteria.