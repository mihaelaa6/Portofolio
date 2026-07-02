import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_reply(text):
    prompt = f"Patient speaking: {text}\nRespond as a realistic patient."
    completion = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return completion.choices[0].message["content"]
