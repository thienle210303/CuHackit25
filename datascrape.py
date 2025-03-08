import requests
from bs4 import BeautifulSoup
import json
import boto3
import google.generativeai as genai
import os

# Gemini - to summarize the description incase it is too long to display
genai.configure(api_key=" ")

def summarize_text(text):
    """Summarize long text using Google Gemini API"""
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(f"Summarize this event description in 2-3 sentences:\n\n{text}")
        return response.text.strip()
    except Exception as e:
        return text  # Return original if summarization fail
    

# AWS location service - converting building name to full address

client = boto3.client("location", region_name="us-east-2")  # Change to your region

PLACE_INDEX_NAME = "scrape-clemson"  # Use the name from Step 1

def get_full_address(partial_location):
    """Convert building name to full address using AWS Location Service"""
    try:
        response = client.search_place_index_for_text(
            IndexName=PLACE_INDEX_NAME,
            Text=f"{partial_location}, Clemson University, SC",  # Add context for better results
            MaxResults=1
        )
        
        if response["Results"]:
            place = response["Results"][0]["Place"]
            full_address = place.get("Label", "No address found")
            lat = place["Geometry"]["Point"][1]  # AWS returns [Longitude, Latitude]
            lng = place["Geometry"]["Point"][0]
            return full_address, lat, lng
        else:
            return "Address not found", None, None
    except Exception as e:
        return f"Error: {e}", None, None
    

# URL of the events page
url = "https://calendar.clemson.edu/calendar/upcoming?card_size=small&order=date&experience=inperson"

# Fetch the page content
headers = {'User-Agent': 'Mozilla/5.0'}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract JSON-LD structured data
script_tags = soup.find_all("script", type="application/ld+json")

event_list = []

for script in script_tags:
    try:
        data = json.loads(script.string)
        if isinstance(data, list):  # If JSON-LD contains multiple events
            for event in data:
                if event.get("@type") == "Event":
                    # Extract event image
                    image = event.get("image", None)
                    if not image:
                        og_image = soup.find("meta", property="og:image")
                        image = og_image["content"] if og_image else "No image available"

                    # Process event details
                    location_name = event.get("location", {}).get("name", "No location provided")
                    full_address, lat, lng = get_full_address(location_name)

                    event_list.append({
                        "name": event.get("name"),
                        "description": summarize_text(event.get("description", "No description available")),
                        "startDate": event.get("startDate"),
                        "endDate": event.get("endDate"),
                        "eventStatus": event.get("eventStatus", "EventScheduled"),
                        "location": full_address,
                        "latitude": lat,
                        "longitude": lng,
                        "organizer": event.get("organizer", {}).get("name", "No organizer listed"),
                        "performer": event.get("performer", {}).get("name", "No performer listed"),
                        "link": event.get("url"),
                        "image": image
                    })
    except json.JSONDecodeError:
        continue  # Ignore scripts that aren't valid JSON-LD

# Print extracted events
for event in event_list:
    print(event)
