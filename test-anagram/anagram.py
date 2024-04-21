import requests
import json


def fetch_anagrams(letters):
    api_url = f"http://www.anagramica.com/all/:{letters}"
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"Error: {response.status_code}")
        return None


def filter_one_letter_words(anagrams_data):
    if not anagrams_data:
        return None

    filtered_anagrams = []
    for word in anagrams_data["all"]:
        if len(word) > 2:
            filtered_anagrams.append(word)

    return filtered_anagrams


# Example input words
input_words = [
    "marvel",
    "toggle",
    "plunge",
    "danger",
    "expert",
    "candle",
    "wisely",
    "castle",
    "jigsaw",
    "rumble",
]


all_anagrams = {}

for word in input_words:
    anagrams_data = fetch_anagrams(word)
    if anagrams_data:
        filtered_anagrams = filter_one_letter_words(anagrams_data)
        if filtered_anagrams:
            all_anagrams[word] = filtered_anagrams
        else:
            print(f"No filtered anagrams for {word}.")
    else:
        print(f"Failed to fetch anagrams for {word}.")

# Save all anagrams to a single JSON file
filename = "all_anagrams.json"
with open(filename, "w") as file:
    json.dump(all_anagrams, file, indent=4)

print(f"All anagrams saved to {filename}")
