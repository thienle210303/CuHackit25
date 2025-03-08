import React, { useState } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import axios from "axios"
import axios from "axios"

import EventCreateForm from "./components/EventCreateForm"


import icon from "./assets/icon.jpeg"
import data from "./DummyData.jsx"

const containerStyle = {
  width: "100%",
  height: "100vh",
}

function App() {
  const [location, setLocation] = useState({ lat: 34.684930, lng: -82.814777 })
  const [events, setEvents] = useState(data)
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null)

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  const handleHome = () => {
    window.location.reload()
  }

  const handleSearch = async () => {
    let filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      event.description.toLowerCase().includes(searchInput.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchInput.toLowerCase())
    )
    if (filtered.length <= 0) {
      const textResponse = await handleBedrockRequest(searchInput)
      filtered = events.filter((event) =>
        event.name.toLowerCase().includes(textResponse.toLowerCase()) ||
        event.description.toLowerCase().includes(textResponse.toLowerCase()) ||
        event.organizer.toLowerCase().includes(textResponse.toLowerCase())
      )
    }
    setFilteredEvents(filtered)
  }

  const handleMarkerClick = (event) => {
    setSelectedEvent(event)
  }

  const handleNavigateEvent = (event) => {
    setLocation({
      lat: parseFloat(event.latitude),
      lng: parseFloat(event.longitude),
    })
    handleMarkerClick(event)
  }

  const handleBedrockRequest = async (text) => {
    const requestData = {
      InputText: text,
    };

    try {
      const response = await axios.post(
        "http://localhost:5119/api/bedrock/invoke",
        requestData
      );
      return response.data.response.results[0].outputText
    } catch (error) {
      console.error("Error making POST request:", error);
    }
    return ""
  };

  return (
    <>
      <div className="absolute navbar bg-black text-white shadow-sm z-30 justify-between px-4 flex flex-wrap w-full space-y-2">
        <div className="flex-none">
          <img
            onClick={handleHome}
            src={icon}
            alt="Russian Blue Cat Logo"
            className="w-12 h-12 rounded-2xl cursor-pointer"
          />
        </div>

        <div className="relative w-full lg:max-w-[800px]">
          <label className="input input-bordered flex items-center gap-2 bg-gray-800 text-white w-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow bg-transparent text-white outline-none"
              placeholder="Search Event"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <kbd className="kbd kbd-sm cursor-pointer bg-gray-700 text-white" onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
              </svg>
            </kbd>
          </label>

          {searchInput.trim() && filteredEvents.length > 0 && (
            <ul className="absolute top-full mt-2 w-full menu bg-gray-900 text-white rounded-lg shadow-lg z-50">
              {filteredEvents.map((event) => (
                <li key={event.id} className="border-b border-gray-700 last:border-none">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-800 transition">
                    <span>{event.name} - {event.organizer}</span>
                    <button
                      onClick={() => handleNavigateEvent(event)}
                      className="btn btn-sm btn-primary"
                    >
                      Go
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>


        <div className="flex items-center space-x-4">
          <button
            onClick={getUserLocation}
            className="btn border border-white text-white bg-transparent px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition"
          >
            Current Location
          </button>
          <EventCreateForm />
        </div>
      </div>

      <div className="absolute h-screen w-full z-0">
        <LoadScript googleMapsApiKey="AIzaSyCprRyn7dVMBMfLhB1s1BlSDfP8dagT8CQ">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={15}
            options={{
              fullscreenControl: false,
              mapTypeControl: false,
            }}
          >
            {events.map((e) => {
              return (
                <Marker
                  key={e.name}
                  position={{ lat: parseFloat(e.latitude), lng: parseFloat(e.longitude) }}
                  onClick={() => handleMarkerClick(e)}
                />
              );
            })}

            {selectedEvent && (
              <InfoWindow
                position={{ lat: parseFloat(selectedEvent.latitude), lng: parseFloat(selectedEvent.longitude) }}
                onCloseClick={() => setSelectedEvent(null)}
              >
                <div className="text-black flex flex-col gap-1">
                  <h3 className="font-bold text-lg">{selectedEvent.name}</h3>
                  <p>{selectedEvent.description}</p>
                  <p><strong>Location:</strong> {selectedEvent.location}</p>
                  <p><strong>Start Time:</strong> {new Date(selectedEvent.startTime).toLocaleString()}</p>
                  <p><strong>End Time:</strong> {new Date(selectedEvent.endTime).toLocaleString()}</p>


                  <button className="btn btn-info"
                    onClick={() => window.open(selectedEvent.url, "_blank", "noopener,noreferrer")}
                  >
                    More Info
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
}

export default App
