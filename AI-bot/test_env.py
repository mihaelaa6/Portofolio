from dotenv import load_dotenv
import os

load_dotenv()

print("SID:", os.getenv("TWILIO_ACCOUNT_SID"))
print("OPENAI:", os.getenv("OPENAI_API_KEY"))
