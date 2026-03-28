import os
import time
from dotenv import load_dotenv
from google import genai
from google.genai import types, errors

load_dotenv()
client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

def llm_call(question, retries=3):
    """
    Calls Gemini with a retry mechanism for 429 errors.
    """
    for i in range(retries):
        try:
            response = client.models.generate_content(
                model='gemini-flash-latest',
                contents=question,
                config=types.GenerateContentConfig(
                    system_instruction="You are a senior research assistant. " \
                    "Provide concise, accurate answers based on your knowledge.",
                    temperature=0.1,
                ),
            )
            return response.text
        except errors.ClientError as e:
            if "429" in str(e):
                wait_time = (i + 1) * 40  # Wait 40s, then 80s...
                print(f"Quota exceeded. Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                raise e
    return "Failed to get response after multiple retries."

# testing purpose
user_question = "What are the main advantages of OpenAI ChatGPT for agentic workflows?"
answer = llm_call(user_question)
print(f"A: {answer}")