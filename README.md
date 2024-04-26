
# K0 Club README

Welcome to the **K0 Club** project repository! K0 Club is a dynamic Next.js web application tailored for combat sports enthusiasts. It's designed to offer users an engaging platform where they can register, create profiles, explore and share fight listings, subscribe to fights, and earn points based on their activity. With a focus on real-time interaction and a vibrant community, K0 Club aims to connect fans worldwide, offering an unparalleled digital experience in the realm of combat sports.

## Key Features

- **Secure User Authentication**: Utilizing NextAuth for robust security and user authentication. Each user can create a personalized profile.
- **Fight Listings**: Users can create, search, and subscribe to fight listings, each detailed with information such as name, description, location, and date/time.
- **Vote System**: A voting system to foster user engagement, with a live showcase of votes for what people think abput the fight.
- **Real-Time Chat**: Leveraging WebSockets to provide users with instant messaging capabilities for specific fights, enabling engaging conversations and discussions.
- **Fight requests**: Users can create or accept fight requests, fostering interactive challenges within the community.


## Technology Stack

- **Frontend**: Next.js for the frontend framework, ensuring efficient API routes, server-side rendering, and seamless user experience.
- **Backend**: 
  - PostgreSQL (Neon DB) for the database, chosen for its robustness and reliability in handling relational data.
  - MongoDB for storing real-time chat messages and conversations.
- **ORM**: Drizzle ORM for simplifying database interactions with PostgreSQL through a type-safe query builder and auto-generated migrations.
- **Real-Time Chat**: Socket.IO integration for enabling real-time chat functionality, allowing users to engage in conversations specific to each fight.
- **Authentication**: NextAuth.js for secure user authentication and authorization.

## Database Schema 📊

K0Club utilizes a combination of PostgreSQL (Neon DB) and MongoDB databases to store different types of data:

### PostgreSQL (Neon DB):
- 👥 **Users**: Stores user information, including credentials, profile details, and activity points.
- 🥊 **Fights**: Details about fight listings, including participants, location, date/time, and the user who created the listing.
- 📝 **Subscriptions**: Tracks user subscriptions to specific fights.
- 🗳️ **Votes**: Records user votes for fight participants, indicating who they think will win.

### MongoDB:
- 💬 **Messages**: Stores individual chat messages associated with specific fights.
- 🗣️ **Conversations**: Manages chat conversations for each fight, linking messages to participants.

The PostgreSQL database handles the structured data related to users, fights, subscriptions, and votes, while the MongoDB database is used for storing real-time chat messages and conversations, which benefit from its flexibility and scalability.

## API Endpoints 🌐

- 🥊 **GET /api/allFights**: Retrieves all accepted fights from the database.
- 🤝 **GET /fight/:fightId/accept**: Accepts a fight request for the specified fight ID.
- 🥊 **GET /api/fight/:fightId**: Fetches the details of a specific fight along with the author and challenged user information.
- 📝 **POST /api/fight/create**: Creates a new fight listing by an authenticated user.
- 📥 **GET /api/fight/received**: Retrieves the fights received by the authenticated user.
- 📤 **GET /api/fight/sent**: Retrieves the fights sent by the authenticated user.
- 🗳️ **GET /fight/vote/:fightId/all**: Fetches all the votes for a specific fight.
- 🗳️ **POST /api/fight/vote/:fightId**: Allows an authenticated user to vote for a specific fight.
- 🗳️ **GET /api/fight/vote/:fightId**: Retrieves the vote of the authenticated user for a specific fight.
- 🔍 **POST /api/username/search**: Searches for users based on the provided username query.
- 📝 **PUT /api/username**: Updates the username of the authenticated user.

These endpoints provide comprehensive functionality for managing fights, accepting fight requests, retrieving fight details, creating new fights, handling user votes, searching for users, and updating user information.

## Real-Time Chat with Socket.IO 💬

K0 Club incorporates real-time chat functionality using Socket.IO, enabling users to engage in live conversations specific to each fight. Here's a quick overview:

- 🚀 Socket.IO server is set up and connected to the Express application.
- 👥 User mapping and authentication ensure secure communication.
- 🥊 Clients join specific fight rooms to receive real-time updates and messages.
- 💬 Messages are sent, received, and persisted using MongoDB.
- 📡 Server broadcasts updates to all participants in the relevant fight room.
- 🔌 Disconnection handling ensures efficient resource management.

With Socket.IO, K0 Club delivers a dynamic and interactive chat experience for users to discuss and engage with fights in real-time.

## Getting Started 🚀

To get started with the K0 Club project, please refer to the [Setup Guide](setup.md) for detailed instructions on setting up the development environment, configuring the necessary dependencies, and running the application locally.

The setup guide covers the following steps:

    1. Cloning the repository
    2. Installing dependencies for both the client and server
    3. Configuring environment variables
    4. Setting up the databases (PostgreSQL and MongoDB)
    5. Running the development servers
    6. Building the application for production

By following the setup guide, you'll have the K0 Club application up and running on your local machine in no time!

If you encounter any issues during the setup process, please refer to the troubleshooting section in the documentation or reach out to the development team for assistance.

Happy coding! 💪

## Contribution Guidelines

We welcome contributions to the K0 Club! Please read our [Contribution Guidelines](CONTRIBUTING.md) for more information on how to report bugs, suggest features, and submit pull requests.

## License

K0 Club is open source under the [MIT License](LICENSE).

---

K0 Club combines modern web technologies to create an intuitive, real-time platform for combat sports enthusiasts. With its scalable architecture and engaging features, it promises to deliver a knockout experience for users around the globe. Join us in building the future of combat sports community engagement!
