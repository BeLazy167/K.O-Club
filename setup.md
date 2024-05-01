# Setup Guide for K0 Club

This guide will walk you through the steps to set up and run the K0 Club application on your local machine.

## Prerequisites

Before proceeding with the setup, ensure that you have the following installed on your system:

-   Node.js (version >= 12.0.0)
-   npm (version >= 6.0.0)
-   PostgreSQL (for the client-side database)(NEON DB PREFFERD)
-   MongoDB (for the server-side database)

## Client Setup (Next.js)

1. **Clone the repository:**

    ```bash
    git clone https://github.com/BeLazy167/K0-Club.git
    ```

2. **Navigate to the client directory:**

    ```bash
    cd K0-club/client
    ```

3. **Install the required dependencies:**

    ```bash
    npm install
    ```

4. **Configure environment variables:**
   Create a `.env` file in the client directory by referring to the `.env.example` file for necessary variables and their format.

5. **Run the development server:**

    ```bash
    npm run dev
    ```

6. **Access the client-side application:**
   Open your browser and visit `http://localhost:3000` to see the client-side application in action.

## Server Setup (Express.js)

1. **Navigate to the server directory:**

    ```bash
    cd K0-club/server
    ```

2. **Install the required dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**
   Create a `.env` file in the server directory by referring to the `.env.example` file for necessary variables and their format.

4. **Start the server:**

    ```bash
    npm start
    ```

5. **Access the server-side application:**
   The server will be running on `http://localhost:5000`.

## Database Setup

### PostgreSQL (Client-side)

1. **Create a new PostgreSQL database:**
   Create a new PostgreSQL database for the client-side application.
   For a neondb database follow the guide: [NeonDB Setup Guide](neon.md)

2. **Update the database connection URL:**
   Update the `DATABASE_URL` environment variable in the client's `.env` file with the appropriate PostgreSQL connection URL.

### MongoDB (Server-side)

1. **Create a new MongoDB database:**
   Create a new MongoDB database for the server-side application.
   [MongoDB Setup Guide](mongo.md)

2. **Update the database connection URL:**
   Update the `MONGODB_URI` environment variable in the server's `.env` file with the appropriate MongoDB connection URL.

## Running the Application

1. **Ensure both client and server are running:**
   Ensure that both the client and server are running.

2. **Access the K0 Club application:**
   Open your browser and visit `http://localhost:3000` to access the K0 Club application.

## Additional Configuration **Needed**

-   **Google Authentication:**
    If you want to use Google Authentication, set up a Google OAuth application and obtain the necessary client ID and client secret. Update the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables in the client's `.env` file accordingly.

    [Google Setup Guide](googleauth.md)
    
-   **Troubleshooting:**
    If you encounter any issues during the setup process, please refer to the troubleshooting section in the documentation or reach out to the development team for assistance.

That's it! You should now have the K0 Club application up and running on your local machine. Happy coding! 🚀🥊

This version incorporates the app name "K0 Club" throughout the setup guide.
