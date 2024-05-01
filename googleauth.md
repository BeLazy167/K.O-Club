# Google OAuth 2.0 Setup Guide

This guide will walk you through the process of setting up Google OAuth 2.0 for your web application in just five minutes.

## Step 1: Create a Google Project
1. visit https://console.cloud.google.com/

1. If you don't have any existing Google projects, you'll see a screen that looks like this:

   ![Create a Project](https://i.ibb.co/8BndVPN/image.png)

2. Click on "Create a project" and give your project a name (e.g., "Google Auth"). You don't need an organization, but you can select one if you want. Then press "Create".

## Step 2: Configure OAuth Consent Screen

1. Once your project is created, you should see a screen like this:

   ![Project Dashboard](https://i.ibb.co/1bR44qY/image.png)

2. Look for "OAuth consent screen" under "APIs and services".

  ![OAuth Screen](https://i.ibb.co/85Kn7SV/image.png)

3. Select "External" as the user type. This allows you to use any Google account 

4. Fill out the required information:
   - App name
   - User support email
   - Developer contact email

5. Save and continue.

## Step 3: Add Scopes

1. Add the scopes that your Google API needs to access. For example, you can add "See your email address" and "See your personal info".

2. Press "Update" to see the selected scopes and then press "Save and continue".

## Step 4: Add Test Users

1. Press "Save and continue".

3. You can ignore the summary and press "Back to dashboard".

## Step 5: Create OAuth Client ID

1. From the dashboard, click on "Credentials" in the left sidebar.

2. Press the "+" button and select "Create credentials" > "OAuth client ID".

3. Choose "Web application" as the application type.

4. Add the authorized JavaScript origins and authorized redirect URLs for your web application. For example, if you're using React, the default URL is `http://localhost:3000`.

   ![authorized redirect URLs](https://i.ibb.co/4fK2CM1/image.png)

5. Press "Create".

6. You will receive a client ID and client secret for your OAuth client.

That's it! You have successfully set up Google OAuth 2.0 for your web application. Make sure to keep your client ID and client secret secure and use them in your client `env` to authenticate users with Google.