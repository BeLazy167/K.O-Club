## API Documentation

### Create Fight

-   **URL**: `/api/fight/create`
-   **Method**: `POST`
-   **Authentication**: Required (User must be logged in)
-   **Description**: Creates a new fight listing. The authenticated user becomes the author of the fight, and the `challengedId` parameter specifies the user being challenged. The fight is initially created with `authorAccepted` set to `true` and `challengedAccepted` set to `false`. The challenged user needs to accept the fight for it to be considered fully accepted.
-   **Request Body**:
    ```json
    {
        "title": "string",
        "description": "string",
        "location": "string",
        "dateTime": "string",
        "challengedId": "string"
    }
    ```
-   **Response**:
    -   Status Code: 201 (Created)
    -   Body:
        ```json
        {
            "message": "Fight created successfully"
        }
        ```

### Get All Fights

-   **URL**: `/api/allFights`
-   **Method**: `GET`
-   **Authentication**: Not Required
-   **Description**: Retrieves all accepted fights. An accepted fight is a fight where both the author and the challenged user have accepted the fight. The response includes details about the fight, such as the title, description, location, date and time, and information about the author and challenged user.
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        [
            {
                "id": "string",
                "title": "string",
                "description": "string",
                "location": "string",
                "dateTime": "string",
                "createdAt": "string",
                "author": {
                    "id": "string",
                    "name": "string",
                    "username": "string",
                    "image": "string",
                    "email": "string"
                },
                "challenged": {
                    "id": "string",
                    "name": "string",
                    "username": "string",
                    "image": "string",
                    "email": "string"
                }
            }
        ]
        ```

### Get Fight by ID

-   **URL**: `/api/fight/:fightId`
-   **Method**: `GET`
-   **Authentication**: Not Required
-   **Description**: Retrieves a specific fight by its ID. The response includes detailed information about the fight, such as the title, description, location, date and time, and information about the author and challenged user.
-   **Parameters**:
    -   `fightId` (string): The ID of the fight to retrieve.
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        {
            "id": "string",
            "title": "string",
            "description": "string",
            "location": "string",
            "dateTime": "string",
            "createdAt": "string",
            "author": {
                "id": "string",
                "name": "string",
                "username": "string",
                "image": "string",
                "email": "string"
            },
            "challenged": {
                "id": "string",
                "name": "string",
                "username": "string",
                "image": "string",
                "email": "string"
            }
        }
        ```

### Accept Fight

-   **URL**: `/fight/:fightId/accept`
-   **Method**: `GET`
-   **Authentication**: Required (User must be logged in)
-   **Description**: Allows the authenticated user to accept a fight challenge. The user must be the challenged user of the fight to accept it. Once accepted, the `challengedAccepted` field of the fight is set to `true`, indicating that the fight has been fully accepted by both parties.
-   **Parameters**:
    -   `fightId` (string): The ID of the fight to accept.
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        {
            "message": "Fight accepted successfully"
        }
        ```

### Get Received Fights

-   **URL**: `/api/fight/received`
-   **Method**: `GET`
-   **Authentication**: Required (User must be logged in)
-   **Description**: Retrieves all fights received by the authenticated user. These are the fights where the authenticated user is the challenged user. The response includes details about each received fight, such as the title, description, location, date and time, acceptance status, and information about the author.
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        [
          {
            "id": "string",
            "title": "string",
            "description": "string",
            "location": "string",
            "dateTime": "string",
            "authorAccepted": boolean,
            "challengedAccepted": boolean,
            "author": {
              "id": "string",
              "name": "string",
              "username": "string",
              "image": "string",
              "email": "string"
            },
            "createdAt": "string"
          }
        ]
        ```

### Get Sent Fights

-   **URL**: `/api/fight/sent`
-   **Method**: `GET`
-   **Authentication**: Required (User must be logged in)
-   **Description**: Retrieves all fights sent by the authenticated user. These are the fights where the authenticated user is the author. The response includes details about each sent fight, such as the title, description, location, date and time, acceptance status, and information about the challenged user.
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        [
          {
            "id": "string",
            "title": "string",
            "description": "string",
            "location": "string",
            "dateTime": "string",
            "authorAccepted": boolean,
            "challengedAccepted": boolean,
            "challengedUser": {
              "id": "string",
              "name": "string",
              "username": "string",
              "image": "string",
              "email": "string"
            },
            "createdAt": "string"
          }
        ]
        ```

### Vote for a Fight

-   **URL**: `/api/fight/vote/:fightId`
-   **Method**: `POST`
-   **Authentication**: Required (User must be logged in)
-   **Description**: Allows the authenticated user to vote for a fight. The user specifies the ID of the fight they want to vote for and the ID and username of the user they are voting for. If the user has already voted for the fight, their vote will be updated with the new selection.
-   **Parameters**:
    -   `fightId` (string): The ID of the fight to vote for.
-   **Request Body**:
    ```json
    {
        "votedForId": "string",
        "votedForUsername": "string"
    }
    ```
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        {
            "fightId": "string",
            "userId": "string",
            "votedForId": "string",
            "votedForUsername": "string"
        }
        ```

### Get Vote for a Fight

-   **URL**: `/api/fight/vote/:fightId`
-   **Method**: `GET`
-   **Authentication**: Required (User must be logged in)
-   **Description**: Retrieves the vote of the authenticated user for a specific fight. If the user has not voted for the fight, an empty response will be returned.
-   **Parameters**:
    -   `fightId` (string): The ID of the fight to retrieve the vote for.
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        {
            "fightId": "string",
            "userId": "string",
            "votedForId": "string",
            "votedForUsername": "string"
        }
        ```

### Get All Votes for a Fight

-   **URL**: `/fight/vote/:fightId/all`
-   **Method**: `GET`
-   **Authentication**: Required (User must be logged in)
-   **Description**: Retrieves all votes for a specific fight. This endpoint allows the authenticated user to see how other users have voted for the fight.
-   **Parameters**:
    -   `fightId` (string): The ID of the fight to retrieve votes for.
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        [
            {
                "fightId": "string",
                "userId": "string",
                "votedForId": "string",
                "votedForUsername": "string"
            }
        ]
        ```

### Search Users

-   **URL**: `/api/username/search`
-   **Method**: `POST`
-   **Authentication**: Not Required
-   **Description**: Searches for users based on a provided query. This endpoint allows users to search for other users by their username. The search is performed in a case-insensitive manner, and the response includes a list of users whose usernames match the search query.
-   **Request Body**:
    ```json
    {
        "query": "string"
    }
    ```
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        {
            "users": [
                {
                    "id": "string",
                    "name": "string",
                    "username": "string",
                    "image": "string",
                    "email": "string"
                }
            ]
        }
        ```

### Update Username

-   **URL**: `/api/username`
-   **Method**: `PUT`
-   **Authentication**: Required (User must be logged in)
-   **Description**: Allows the authenticated user to update their username. The user provides the new username in the request body, and if the update is successful, the response will contain the updated username.
-   **Request Body**:
    ```json
    {
        "username": "string"
    }
    ```
-   **Response**:
    -   Status Code: 200 (OK)
    -   Body:
        ```json
        {
            "username": "string"
        }
        ```
