import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

def make_call():
    client = Client(
        os.getenv("TWILIO_ACCOUNT_SID"),
        os.getenv("TWILIO_AUTH_TOKEN")
    )

    call = client.calls.create(
        to=os.getenv("TEST_NUMBER"),
        from_=os.getenv("TWILIO_CALLER_NUMBER"),
        url=" https://palpitate-ashamed-five.ngrok-free.dev",
        record=True
    )

    print("Call started:", call.sid)
