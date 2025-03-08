import React, { useState } from "react"

const EventCreateForm = () => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    startTime: "",
    endTime: "",
    location: "",
    url: "",
    description: "",
    organizer: "",
    performer: "",
    latitude: "",
    longitude: "",
    image: ""
  })

  const handleEventChange = (e) => {
    const { name, value } = e.target
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const handleSubmitEvent = () => {
    console.log("Event details submitted:", eventDetails)
    document.getElementById("event_modal").close()
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          className="btn bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
          onClick={() => document.getElementById("event_modal").showModal()}
        >
          Create Event
        </button>
      </div>

      <dialog id="event_modal" className="absolute modal modal-bottom sm:modal-middle z-50">
        <div className="modal-box">
          <h2 className="text-xl font-semibold mb-3">Create Event</h2>
          <form className="space-y-2">
            <div className="">
              <label className="block text-sm font-medium ">Organizer</label>
              <input
                type="text"
                name="organizer"
                value={eventDetails.organizer}
                onChange={handleEventChange}
                className="input input-bordered w-full"
                placeholder="Organizer Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Event Name</label>
              <input
                type="text"
                name="name"
                value={eventDetails.name}
                onChange={handleEventChange}
                className="input input-bordered w-full"
                placeholder="Event Name"
              />
            </div>

            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-medium ">Event Time Start</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={eventDetails.startTime}
                  onChange={handleEventChange}
                  className="input input-bordered w-fit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium ">Event Time End</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={eventDetails.endTime}
                  onChange={handleEventChange}
                  className="input input-bordered"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Event Location</label>
                <input
                  type="text"
                  name="location"
                  value={eventDetails.location}
                  onChange={handleEventChange}
                  className="input input-bordered w-full"
                  placeholder="Event Location"
                />
              </div>

              <div className="flex space-x-2">
                <div className="w-20">
                  <label className="text-sm font-medium">Lat</label>
                  <input
                    type="text"
                    name="latitude"
                    value={eventDetails.latitude}
                    onChange={handleEventChange}
                    className="input input-bordered w-full"
                    placeholder="Latitude"
                  />
                </div>
                <div className="w-20">
                  <label className="text-sm font-medium">Long</label>
                  <input
                    type="text"
                    name="longitude"
                    value={eventDetails.longitude}
                    onChange={handleEventChange}
                    className="input input-bordered w-full"
                    placeholder="Longitude"
                  />
                </div>
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium ">Event URL</label>
              <input
                type="url"
                name="url"
                value={eventDetails.url}
                onChange={handleEventChange}
                className="input input-bordered w-full"
                placeholder="Event URL"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium ">Event Description</label>
              <textarea
                name="description"
                value={eventDetails.description}
                onChange={handleEventChange}
                className="textarea textarea-bordered w-full"
                placeholder="Event Description"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => document.getElementById("event_modal").close()}
                className="btn bg-gray-400 text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitEvent}
                className="btn bg-blue-600 text-white"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default EventCreateForm
