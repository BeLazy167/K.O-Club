# Creating a Neon Database

## Overview

Neon provides fully managed serverless PostgreSQL databases with branching, autoscaling, and bottomless storage. This guide will help you connect your Neon database to your app.

## Prerequisites

Before starting, make sure you have already:

-   Signed up for a Neon account (If you haven't visit [www.neon.tech](https://www.neon.tech) you can start for free!)
-   Created a PostgreSQL database within that account
-   Set up access to the correct access credentials for your Neon database (read-only or read/write)

## Step 1: Obtain Connection Details

1. Log in to your Neon account.
2. Navigate to your database instance.
3. In the "Dashboard" tab, find the Connection Details section.
4. Copy and paste the connection string (Make sure you click the copy button or open the eye so you copy your password and not a series of asterisks)

![neondb connection uri copy example](https://docs.outerbase.com/assets/providers/neon/neon_connect.png)

## Step 2: Use the connection URI

With the connection string obtained from Step 1, you can construct a connection URI that can be used to connect your Neon database to your app.

For example, if your connection string looks like this:

You can set the `DATABASE_URL` environment variable in your K0 Club client's `.env` file like this:

```dotenv
DATABASE_URL="your_connection_uri_here"
```
