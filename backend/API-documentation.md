# API Documentation

## Base URL

http://localhost:8000/api

## Endpoints

### Authentication

#### Sign Up

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Description**: Create a new user account.
- **Request Body**:
    ```json
    {
        "fullname": "Abhinay",
        "username": "abhinay",
        "password": "123",
        "confirmPassword": "123",
        "gender": "male"
    }   
    ```
- **Success Response**:
    - **Code**: `201 Created`
    - **Content**:
        ```json
        {
            "id": "clysrod3u0000y7gxt4winjzo",
            "fullname": "Abhinay",
            "username": "abhinay",
            "profilePic": "https://avatar.iran.liara.run/public/boy?username=abhinay"
        }
        ```
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**:
        ```json
        {
            "error": "Error message"
        }
        ```

#### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Log in to an existing user account.
- **Request Body**:
    ```json
    {
        "username": "abhinay",
        "password": "123"
    }
    ```
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
        ```json
        {
            "id": "clysrod3u0000y7gxt4winjzo",
            "username": "abhinay",
            "fullname": "Abhinay",
            "profilePic": "https://avatar.iran.liara.run/public/boy?username=abhinay"
        }
        ```
- **Error Response**:
    - **Code**: `401 Unauthorized`
    - **Content**:
        ```json
        {
            "error": "Invalid credentials"
        }
        ```

#### Log Out 

- **URL**: `/auth/logout`
- **Method**: `POST`
- **Description**: Log out to an existing user account.

- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
        ```json
        {
            "message": "Logged out successfully"
        }
        ```
- **Error Response**:
    - **Code**: `401 Unauthorized`
    - **Content**:
        ```json
        {
            "error": "Invalid Token"
        }
        ```

#### Get Current User 

- **URL**: `/auth/me`
- **Method**: `GET`
- **Description**: Retrieve the currently authenticated user's information.

- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
        ```json
        {
            "id": "clysrod3u0000y7gxt4winjzo",
            "fullname": "Abhinay",
            "username": "abhinay",
            "profilePic": "https://avatar.iran.liara.run/public/boy?username=abhinay"
        }
        ```
- **Error Response**:
    - **Code**: `401 Unauthorized`
    - **Content**:
        ```json
        {
            "error": "Unauthorized - No token provided"
        }
        ```

### Message

#### Send Message

- **URL**: `/message/send/:id`
- **Method**: `POST`
- **Description**: Send a message to another user. Provide a user to chat Id.
- **Request Body**:
    ```json
    {
        "message": "Hiii!"
    }
    ```

- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
        ```json
        {
            "id": "clyss651n0008y7gxyrkznbe8",
            "conversationId": "clyss5tja0004y7gxj7yi3zs5",
            "senderId": "clysrod3u0000y7gxt4winjzo",
            "body": "Hiii!",
            "createdAt": "2024-07-19T14:13:34.091Z",
            "updatedAt": "2024-07-19T14:13:34.091Z"
        }
        ```
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**:
        ```json
        {
            "error": "Error message"
        }
        ```

#### Get Message

- **URL**: `/message/:id`
- **Method**: `GET`
- **Description**: Get a message from Users. Id is the user to chat.  

- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
        ```json
        [
            {
                "id": "clyss651n0008y7gxyrkznbe8",
                "conversationId": "clyss5tja0004y7gxj7yi3zs5",
                "senderId": "clysrod3u0000y7gxt4winjzo",
                "body": "Hiii!",
                "createdAt": "2024-07-19T14:13:34.091Z",
                "updatedAt": "2024-07-19T14:13:34.189Z"
            }
        ]
        ```
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**:
        ```json
        {
            "error": "Error message"
        }
        ```

#### Get Users

- **URL**: `/message/conversations`
- **Method**: `GET`
- **Description**: Get users for sidebars.

- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
        ```json
        [
            {
                "id": "clx24xss60000mp1xo93nxct2",
                "fullname": "abhinay",
                "profilePic": "https://avatar.iran.liara.run/public/boy?username=abhinay"
            },
            {
                "id": "clx5rxw0h0000p32c9e4kxhc4",
                "fullname": "abhinay1",
                "profilePic": "https://avatar.iran.liara.run/public/boy?username=abhinay1"
            },
            {
                "id": "clynhagw10000m2l8i5jhj6pd",
                "fullname": "abhinay2",
                "profilePic": "https://avatar.iran.liara.run/public/boy?username=abhinay2"
            },
            {
                "id": "clyoq19d40002k09v3hejzlqp",
                "fullname": "abhinay3",
                "profilePic": "https://avatar.iran.liara.run/public/girl?username=abhinay3"
            }
        ]
        ```
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**:
        ```json
        {
            "error": "Error message"
        }
        ```

## Error Handling

Common error responses include:

- **400 Bad Request**: The request was invalid or cannot be otherwise served.
- **401 Unauthorized**: Authentication failed or user does not have permissions for the desired action.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server.
