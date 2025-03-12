# StreamVID

A comprehensive backend project for a video platform with complex architecture, built using Node.js, Express, and MongoDB. This project features user authentication, video management, subscriptions, likes, comments, and more.

## Features

- User authentication and authorization
- Video upload and management
- User profile management
- Cloudinary integration for media storage
- JWT based authentication
- Password encryption
- Cookie based sessions
- File upload support

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for media storage
- Multer for file handling

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- Cloudinary account
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/1av22/StreamVID.git
cd Backend-Project
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

## Project Structure

```
Backend-Project/
├── public/
│   └── temp/          # Temporary storage for uploads
├── src/
│   ├── controllers/   # Request handlers
│   ├── db/           # Database configuration
│   ├── middlewares/  # Custom middleware functions
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions
│   ├── app.js        # Express app configuration
│   ├── constants.js  # Application constants
│   └── index.js      # Application entry point
├── .env              # Environment variables
├── .gitignore       # Git ignore file
└── package.json     # Project dependencies
```

## API Endpoints

### User Routes

- POST `/api/v1/users/register` - Register a new user
- POST `/api/v1/users/login` - Login user
- POST `/api/v1/users/logout` - Logout user
- POST `/api/v1/users/refresh-token` - Refresh access token
- PATCH `/api/v1/users/update-account` - Update user details
- PATCH `/api/v1/users/avatar` - Update user avatar
- PATCH `/api/v1/users/coverimage` - Update user cover image
- GET `/api/v1/users/c/:username` - Get channel profile

### Video Routes

- GET `/api/v1/videos` - Get all videos
- POST `/api/v1/videos` - Upload a new video
- GET `/api/v1/videos/:videoId` - Get video by ID
- PATCH `/api/v1/videos/:videoId` - Update video
- DELETE `/api/v1/videos/:videoId` - Delete video
- PATCH `/api/v1/videos/toggle/publish/:videoId` - Toggle video publish status

## Running the Project

Development mode:

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default: 8000).
