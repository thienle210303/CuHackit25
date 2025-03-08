const data = [
  {
    name: "Hackathon",
    startTime: "2025-03-07T18:00:00",
    endTime: "2025-03-08T20:00:00",
    location: "Clemson University",
    url: "https://thundering-liquid-c23.notion.site/CUHackit-Wiki-18ac44df478880cc86bdca756d689a7f",
    description: "A 24h hackathon",
    organizer: "CuHackit",
    latitude: "34.684930",
    longitude: "-82.814777",
  },
  {
    name: "Food",
    startTime: "2025-03-07T18:00:00",
    endTime: "2025-03-08T20:00:00",
    location: "Somewhere",
    url: "https://thundering-liquid-c23.notion.site/CUHackit-Wiki-18ac44df478880cc86bdca756d689a7f",
    description: "Food table all you can eat",
    organizer: "Culinary Creators",
    latitude: "34.684930",
    longitude: "-84.814777",
  },
  {
    name: "Tech Talk",
    startTime: "2025-03-09T10:00:00",
    endTime: "2025-03-09T12:00:00",
    location: "Clemson Innovation Center",
    url: "https://thundering-liquid-c23.notion.site/Tech-Talk-5dcb7e65b5eb4e5fb929e0c1b78c3f99",
    description: "Join us for an exciting tech talk on the latest in AI.",
    organizer: "Future Visionaries",
    latitude: "34.675540",
    longitude: "-82.837440"
  },
  {
    name: "Hackathon Kickoff",
    startTime: "2025-03-07T08:00:00",
    endTime: "2025-03-07T09:30:00",
    location: "Main Auditorium, Clemson University",
    url: "https://thundering-liquid-c23.notion.site/Hackathon-Kickoff-2f2d6e578347402c8adfb04c8fc2ca4f",
    description: "Start your hackathon journey with an inspirational kickoff session.",
    organizer: "Hackathon HQ",
    latitude: "34.675550",
    longitude: "-82.836850"
  },
  {
    name: "Code Sprint",
    startTime: "2025-03-08T12:00:00",
    endTime: "2025-03-08T15:00:00",
    location: "Clemson Hack Lab",
    url: "https://thundering-liquid-c23.notion.site/Code-Sprint-69b6d50c6f1847e989d9c4fe76b16568",
    description: "Compete in a fast-paced coding sprint and win exciting prizes.",
    organizer: "Code Masters",
    latitude: "34.675840",
    longitude: "-82.836600"
  },
  {
    name: "Networking Lunch",
    startTime: "2025-03-08T12:00:00",
    endTime: "2025-03-08T13:30:00",
    location: "Clemson Dining Hall",
    url: "https://thundering-liquid-c23.notion.site/Networking-Lunch-83e7054b85c74d3f91ed0722f9c36f62",
    description: "Enjoy a casual lunch while networking with fellow participants.",
    organizer: "Tech Connect",
    latitude: "34.673910",
    longitude: "-82.836000"
  },
  {
    name: "Project Showcase",
    startTime: "2025-03-08T16:00:00",
    endTime: "2025-03-08T19:00:00",
    location: "Clemson Memorial Stadium",
    url: "https://thundering-liquid-c23.notion.site/Project-Showcase-3df12d254d37479a80a5197bcbeb8b3b",
    description: "Show off your project and get feedback from judges and peers.",
    organizer: "Innovation Hub",
    latitude: "34.680460",
    longitude: "-82.834880"
  },
  {
    name: "Racing event",
    startTime: "2025-03-07T18:00:00",
    endTime: "2025-03-08T20:00:00",
    location: "Somewhere",
    url: "https://thundering-liquid-c23.notion.site/CUHackit-Wiki-18ac44df478880cc86bdca756d689a7f",
    description: "Horse racing between students",
    organizer: "Speed Masters",
    latitude: "34.684930",
    longitude: "-84.814777",
  },
  {
    name: "AI Workshop",
    startTime: "2025-03-10T09:00:00",
    endTime: "2025-03-10T12:00:00",
    location: "Clemson University Library",
    url: "https://thundering-liquid-c23.notion.site/AI-Workshop-91c9e90389b94cc58c56e464e4a0da7d",
    description: "Learn the basics of artificial intelligence and machine learning.",
    organizer: "AI Innovators",
    latitude: "34.674160",
    longitude: "-82.836990"
  },
  {
    name: "Hackathon Breakout Session",
    startTime: "2025-03-07T11:00:00",
    endTime: "2025-03-07T13:00:00",
    location: "Clemson Student Union",
    url: "https://thundering-liquid-c23.notion.site/Hackathon-Breakout-Session-7a6f6ac8f2b84c8c8c3504286dbd5ffb",
    description: "Collaborate and break down your hackathon projects with your team.",
    organizer: "Hackathon HQ",
    latitude: "34.677510",
    longitude: "-82.836440"
  },
  {
    name: "Mobile Development Workshop",
    startTime: "2025-03-09T14:00:00",
    endTime: "2025-03-09T17:00:00",
    location: "Clemson University College of Engineering",
    url: "https://thundering-liquid-c23.notion.site/Mobile-Development-Workshop-14925822a54b4d5fa9e60b10e2fd7bb4",
    description: "Learn the fundamentals of mobile app development.",
    organizer: "Mobile Devs Unite",
    latitude: "34.675720",
    longitude: "-82.834970"
  },
  {
    name: "Design Thinking Session",
    startTime: "2025-03-08T10:00:00",
    endTime: "2025-03-08T12:00:00",
    location: "Clemson Design Lab",
    url: "https://thundering-liquid-c23.notion.site/Design-Thinking-Session-c2c928cc23924be98bc4789bc30a383a",
    description: "A hands-on workshop to learn how to use design thinking for problem-solving.",
    organizer: "Creative Minds",
    latitude: "34.674290",
    longitude: "-82.835160"
  },
  {
    name: "Networking Mixer",
    startTime: "2025-03-07T18:00:00",
    endTime: "2025-03-07T20:00:00",
    location: "Clemson Alumni Center",
    url: "https://thundering-liquid-c23.notion.site/Networking-Mixer-fb4e0f99841d4d2fb82f2b81cfdb1587",
    description: "Relax and network with professionals in the tech industry.",
    organizer: "Tech Connect",
    latitude: "34.680650",
    longitude: "-82.839080"
  },
  {
    name: "Web Development Crash Course",
    startTime: "2025-03-08T13:30:00",
    endTime: "2025-03-08T16:30:00",
    location: "Clemson Computer Science Building",
    url: "https://thundering-liquid-c23.notion.site/Web-Development-Crash-Course-0b2f7dbfdb1e49679b67b0fd17f59e68",
    description: "A fast-paced course covering web development basics.",
    organizer: "Web Dev Collective",
    latitude: "34.673210",
    longitude: "-82.835850"
  },
  {
    name: "Lunch & Learn",
    startTime: "2025-03-10T12:00:00",
    endTime: "2025-03-10T13:30:00",
    location: "Clemson Faculty Lounge",
    url: "https://thundering-liquid-c23.notion.site/Lunch-Learn-b7739f80e4f8480fa826987364a585f5",
    description: "Join us for lunch and an interactive learning session on tech trends.",
    organizer: "Tech Talks Group",
    latitude: "34.675870",
    longitude: "-82.836200"
  }
]

export default data