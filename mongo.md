# Getting Started with MongoDB

## Overview

MongoDB is a flexible and scalable NoSQL database solution that allows you to store and manage your data efficiently. This guide will walk you through the process of getting started with MongoDB.

## Step 1: Sign up for MongoDB Atlas

1. Visit the [MongoDB Atlas website](https://www.mongodb.com/atlas).
2. Click on the **Start Free** button.
3. Follow the prompts to create an account. You'll need to provide your email address, create a password, and agree to the terms of service.
4. Once you've created an account, log in to MongoDB Atlas.

   ![mongodbImage](https://webimages.mongodb.com/_com_assets/cms/kko6fv1oxcwoavwi9-mongodb-atlas-create-project.png?auto=format%2Ccompress)
   ![mongodbImage](https://webimages.mongodb.com/_com_assets/cms/kko6gp6k5mcdhjw3w-mongodb-atlas-create-cluster.png?auto=format%2Ccompress)
   ![mongodbImage](https://webimages.mongodb.com/_com_assets/cms/kko6gby3qdbez0sjw-mongodb-atlas-choose-cloud-provider.png?auto=format%2Ccompress)

## Step 2: Create a Cluster

1. After logging in to MongoDB Atlas, click on the **Clusters** tab in the left sidebar.
2. Click on the **Build a New Cluster** button.
3. Choose a cloud provider, region, and cluster tier that best suits your needs. You can also customize additional settings such as cluster name and shared cluster options.
4. Click on the **Create Cluster** button to provision your cluster. This may take a few minutes.

## Step 3: Create a Database User

1. Once your cluster is provisioned, navigate to the **Database Access** tab in the left sidebar.
2. Click on the **Add New Database User** button.
3. Enter a username and password for your database user. Make sure to remember these credentials as you'll need them to connect to your database.

## Step 4: Get the connection url

1. After creating your database user, click on the **Database** tab in the left sidebar.
2. Click on the **Connect** button for your cluster.
3. Choose **drivers** connection method.
4. Copy the connection string provided. It should start with `mongodb+srv://` and replace the `<username>` and `<password>` with the user details created during step 3

## Step 5: Use the uri

With the connection string obtained from Step 4, you can use it as server db

You can set the `MONGODB_URI` environment variable in your K0 Club server's `.env` file like this:

```dotenv
MONGODB_URI="your_connection_uri_here"
```
