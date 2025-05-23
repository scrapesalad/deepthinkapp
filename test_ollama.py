import requests

def test_ollama_api():
    url = "http://localhost:11434/api/chat"
    payload = {
        "model": "mistral:latest",
        "messages": [
            {
                "role": "user",
                "content": "Hello, are you working?"
            }
        ],
        "stream": False
    }
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    test_ollama_api() 