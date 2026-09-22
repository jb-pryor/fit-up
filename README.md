# Pickup Sports

Pickup Sports is a mobile application for discovering and organizing local sports and physical activities. Users will be able to browse nearby events on a map, create their own events, and indicate whether they plan to attend.

The goal is to make it easier to find casual games, meet people with similar interests, and stay active without needing an existing team or group.

## Current Status

The project is in early development. The current version includes an interactive map with example sporting events and custom markers showing the number of attendees.

## Planned Features

* Browse nearby sporting events on a map
* View event details by selecting a marker
* Create and publish an event
* Join or leave an event
* Set player limits and skill levels
* Filter events by sport, date, and distance
* Create an account and user profile
* View hosted and joined events
* Receive event reminders
* Report inappropriate events or users

## Tech Stack

* React Native
* Expo
* TypeScript
* Expo Router
* React Native Maps

A backend and authentication service will be added as the project develops.

## Getting Started

### Prerequisites

Install the following before running the project:

* Node.js
* npm
* Expo Go on an iOS or Android device

### Installation

Clone the repository:

```bash
git clone https://github.com/jb-pryor/pickup-sports-app.git
```

Enter the project directory:

```bash
cd pickup-sports-app
```

Install the dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Scan the displayed QR code with Expo Go to open the application on a physical device.

## Project Structure

```text
app/          Application screens and navigation
components/   Reusable interface components
assets/       Images, icons, and fonts
```

Additional directories will be added as the event model, authentication, and backend are implemented.

## Development Roadmap

1. Build the interactive event map
2. Add event details and map filters
3. Create the event submission flow
4. Add navigation for events and profiles
5. Implement authentication
6. Connect the application to a database
7. Add attendance and event-management features

## Author

Developed by [James Pryor](https://github.com/jb-pryor).

