# Full Stack Web Chat Application

This repository contains a fully functional web chat application written in Typescript and built using React, Zustand, Express, Node.js, PostgreSQL, Prisma, Socket.io and Daisy UI.

## Features

- **Real-time Chat**: Communicate with other users in real-time using Socket.io.
- **Online Users**: See who is currently online.
- **User Search**: Easily find and connect with other users.
- **Authentication**: Sign-up, login, and logout functionalities to secure user credentials.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Zustand**: A small, fast, and scalable state-management solution.
- **DaisyUI**: A component library built on Tailwind CSS for styling and UI components.
- **Socket.io-client**: Enables real-time, bidirectional, and event-based communication.

### Backend
- **Express**: Node.js web application framework.
- **Node.js**: A JavaScript runtime.
- **Socket.io**: Enables real-time, bidirectional, and event-based communication.

### Database
- **PostgreSQL**: For the database.
- **Prisma**: For managing database models and handling queries.

## Installation and Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/kabhinayak02/chat-app-pern.git
    cd chat-app-pern
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables in `.env`:**

    ```env
    DATABASE_URL=
    JWT_SECRET=
    NODE_ENV=
    PORT=8000
    ```

4. **Run database migrations**
    ```bash
    npx prisma migrate dev
    ```

5. **Start the application**
    ```bash
    npm run dev
    ```

## Usage

1. **Sign Up**: Create a new account.
2. **Login**: Access your account using your credentials.
3. **Search Users**: Find other users easily using the search functionality.
4. **See Online Users**: Check who is online and available to chat.
5. **Chat**: Start chatting with other users.
6. **Edit Profile**: User can edit username  and fullname.
7. **Delete Profile**: User can delele profile.
8. **Logout**: Securely log out of your account when done.

## API Documentation

See here: [Documentation](/backend/API-documentation.md)



## Screenshots

![Signup Screenshot](/screenshots/ss1.png)

![Login Screenshot](/screenshots/ss2.png)

![Chat Screenshot](/screenshots/ss3.png)

![Myprofile Screenshot](/screenshots/ss4.png)

![Edit Screenshot](/screenshots/ss5.png)

![Delete Screenshot](/screenshots/ss6.png)