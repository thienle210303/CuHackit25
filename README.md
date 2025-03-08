# CuHackit25


# Event Map Web Application

## Overview

The Event Map Web Application is a platform that allows users to view and interact with events happening around Clemson University. The project utilizes a React-based frontend, a .NET backend, and AWS services for managing data and database operations. It also integrates several APIs to scrape event data and provide additional information.

## Technologies Used

### Services use
- **Google Maps API**: To display events on a map with geolocation and interactivity.
- **AWS RDS (PostgreSQL)**: For storing event data and other related information.
- **AWS Location Services**: Used to resolve building names to full addresses for event locations.
- **Gemini API**: For summarizing event descriptions and providing relevant summaries.
- **BeautifulSoup**: A Python library for web scraping, used to gather data from the Clemson University official website.
- **AWS BedRock***:  Used to suggest events based on user input in the search bar. It helps recommend events relevant to the user's preferences.


### Frontend:
- **React**: For building the user interface.
- **Vite**: A modern build tool that significantly improves development speed.
- **Yarn**: A package manager used to manage dependencies.
- **Tailwind CSS & Daisy UI**: For styling and UI components.

### Backend:
- **.NET MVC**: A model-view-controller architecture for building the backend of the application.

## How to Run the Project

### Frontend Setup:
1. Navigate to the `frontend` directory:

```ruby
cd frontend
```

2. Install the dependencies using Yarn:
```ruby
yarn
```

3.Start the development server:
```ruby
yarn dev
```

### Backend Setup:
1.Navigate to the backend directory:
```ruby
cd backend
```


2.Build the .NET application:
 ```ruby
dotnet build
```


3.Run the application in watch mode:
 ```ruby
dotnet watch
  ```
This will start the backend server, and the application will be live on http://localhost:5000.


### Data Scraping

A script has been developed to scrape event data from the Clemson University official website using BeautifulSoup.
The script pulls data like event name, description, location, and timings.
The AWS Location Services API is used to convert building names into full addresses.
Gemini API is used to generate short summaries for event descriptions to make them more concise.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

#### Acknowledgements
Thanks to Clemson University for providing the event data.
Special thanks to the creators of the libraries and APIs used in this project:
- React
- Tailwind CSS
- Daisy UI
- .NET MVC
- AWS RDS
- Google Maps API
- BeautifulSoup
- Gemini API


   
