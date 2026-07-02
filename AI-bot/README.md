AI Voice Bot
This project is an automated voice bot that calls the AI test line and simulates realistic patient conversations. It uses Twilio for telephony, Deepgram for transcription, OpenAI for conversation logic, and ElevenLabs for voice synthesis.

Features
Outbound phone calls to the test number

Natural, human‑like patient behavior

Full transcription + audio recordings

Multi‑turn conversations (1–3 minutes)

Bug discovery and scenario testing

Easy setup and single‑command execution

Requirements
Install dependencies:

Code
pip install -r requirements.txt
Create a .env file:

Code
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_CALLER_NUMBER=your_twilio_number
TEST_NUMBER=+18054398008

OPENAI_API_KEY=your_openai_key
DEEPGRAM_API_KEY=your_deepgram_key
ELEVENLABS_API_KEY=your_eleven_key
Run the Bot
1. Start the Flask server
Code
python server.py
2. Start ngrok
Code
ngrok http 5000
Copy the HTTPS URL and set it as your Twilio Voice Webhook:

Code
https://your-ngrok-url.ngrok-free.dev/voice
3. Start the outbound call
Code
python bot.py
Your bot will call the Pretty Good AI test line and begin a natural conversation.

Project Structure
Code
/ai-bot
│ server.py
│ bot.py
│ call_manager.py
│ requirements.txt
│ ARCHITECTURE.md
│ BUG_REPORT.md
│ README.md
│ recordings/
│ transcripts/