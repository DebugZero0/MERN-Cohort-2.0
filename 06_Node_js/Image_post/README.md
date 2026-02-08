# PhotoFeed 

[Live Demo](https://image-adder-6q24.onrender.com)

A full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack that allows users to create, view, and delete image posts with captions. Images are uploaded to ImageKit cloud storage for reliable and optimized image delivery.

## 🎯 Features

- **Create Posts**: Upload images with captions using a user-friendly form
- **View Feed**: Browse all posts in a feed with the most recent posts first
- **Delete Posts**: Remove unwanted posts from the platform
- **Image Storage**: Secure image storage using ImageKit cloud service
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Real-time Updates**: Instant feedback for post creation and deletion operations

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library for building interactive user interfaces
- **Vite 7.2.4** - Fast build tool and dev server for modern web development
- **React Router DOM 7.13.0** - Client-side routing for multi-page navigation
- **Tailwind CSS 4.1.18** - Utility-first CSS framework for styling
- **Axios 1.13.4** - HTTP client for making API requests
- **ESLint 9.39.1** - Code linting for maintaining code quality

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express 5.2.1** - Web framework for building REST APIs
- **MongoDB** - NoSQL database for storing post data
- **Mongoose 9.1.5** - MongoDB object modeling tool
- **Multer 2.0.2** - Middleware for handling file uploads
- **ImageKit 7.2.2** - Cloud image storage and delivery service
- **CORS** - Middleware for handling Cross-Origin Resource Sharing
- **dotenv 17.2.3** - Environment variable management
- **Nodemon** - Development tool for auto-restarting the server on file changes

## 📁 Project Structure

```
Image_post/
├── Backend/
│   ├── public/                    # Static frontend files
│   │   ├── index.html
│   │   └── assets/               # Compiled frontend assets
│   ├── src/
│   │   ├── app.js               # Express app configuration
│   │   ├── db/
│   │   │   └── db.js            # MongoDB connection setup
│   │   ├── models/
│   │   │   └── post.models.js   # Mongoose Post schema
│   │   └── services/
│   │       └── storage.service.js # ImageKit file upload service
│   ├── server.js                 # Server entry point
│   ├── package.json
│   └── .env                      # Environment variables
│
└── Frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx          # Home page
    │   │   ├── CreatePost.jsx    # Post creation page
    │   │   └── Feed.jsx          # Feed display page
    │   ├── App.jsx               # Main app component with routing
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Global styles
    ├── index.html
    ├── vite.config.js            # Vite configuration
    ├── package.json
    └── eslint.config.js          # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud via MongoDB Atlas)
- ImageKit account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Image_post
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```

### Environment Configuration

Create a `.env` file in the `Backend` directory with the following variables:

```env
# MongoDB Connection URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/image_post

# ImageKit Configuration
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

**To get these credentials:**

1. **MongoDB Atlas**: Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **ImageKit**: Sign up at [imagekit.io](https://imagekit.io) and get your API keys

## 🏃 Running the Application

### Development Mode

1. **Start Backend Server** (from Backend directory):
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

2. **Start Frontend Development Server** (from Frontend directory in another terminal):
   ```bash
   npm run dev
   ```
   The frontend will typically run on `http://localhost:5173`

### Production Build

1. **Build Frontend**:
   ```bash
   cd Frontend
   npm run build
   ```
   This creates optimized production files in the `dist/` folder.

2. **Start Backend**:
   ```bash
   cd Backend
   npm start
   ```

## 📡 API Endpoints

### Create Post
- **Endpoint**: `POST /create-post`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `image` (File) - The image file to upload
  - `caption` (String) - Caption for the post
- **Response**:
  ```json
  {
    "message": "Post created successfully",
    "post": {
      "_id": "post_id",
      "image": "imagekit_url",
      "caption": "post_caption",
      "createdAt": "timestamp"
    }
  }
  ```

### Get All Posts
- **Endpoint**: `GET /posts`
- **Response**: Array of posts sorted by creation date (newest first)
  ```json
  {
    "posts": [
      {
        "_id": "post_id",
        "image": "imagekit_url",
        "caption": "post_caption",
        "createdAt": "timestamp"
      }
    ]
  }
  ```

### Delete Post
- **Endpoint**: `DELETE /posts/:id`
- **Parameters**: `id` (URL parameter) - The post ID to delete
- **Response**:
  ```json
  {
    "message": "Post deleted successfully"
  }
  ```

## 🔑 How It Works

### Image Upload Flow
1. User selects an image and enters a caption in the CreatePost component
2. Frontend sends a `POST` request to `/create-post` with the image file
3. Backend receives the file using Multer middleware (stored in memory)
4. Image is uploaded to ImageKit cloud storage via the storage service
5. ImageKit returns a URL for the uploaded image
6. Post document is created in MongoDB with the image URL and caption
7. Success response is sent back to the frontend

### Feed Display Flow
1. Feed component makes a `GET` request to `/posts` endpoint
2. Backend queries MongoDB for all posts, sorted by creation date
3. Posts are returned as JSON array
4. Frontend renders each post with the image, caption, and delete button

### Post Deletion Flow
1. User clicks delete button on a post
2. Frontend sends `DELETE` request to `/posts/:id`
3. Backend uses Mongoose to find and delete the post by ID
4. If post exists, it's removed from MongoDB
5. Frontend refreshes the feed to reflect the change

## 📋 Database Schema

### Post Model
```javascript
{
  image: String,      // URL of the image stored on ImageKit
  caption: String,    // Text caption for the post
  createdAt: Date,    // Automatically added by Mongoose
  updatedAt: Date     // Automatically added by Mongoose
}
```

## 🎨 Frontend Pages

### Home (`/`)
Landing page introducing the application with navigation links to:
- Create Post page
- Feed page

### Create Post (`/create-post`)
Form with:
- Image file input
- Caption text input
- Submit button
- Image preview
- Success/error messages

### Feed (`/feed`)
Displays all posts in chronological order with:
- Post images
- Captions
- Delete button for each post
- Loading states

## 🛡️ Security Features

- **CORS**: Configured to handle cross-origin requests safely
- **Environment Variables**: Sensitive information stored in `.env`
- **Multer**: Safe file handling with memory storage
- **ImageKit**: Secure image storage with CDN delivery

## 📦 Available Scripts

### Backend
- `npm run dev` - Start development server with auto-reload (nodemon)

### Frontend
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB URI in `.env`
- Check if MongoDB server is running
- Ensure IP address is whitelisted in MongoDB Atlas

### ImageKit Upload Failures
- Verify ImageKit credentials in `.env`
- Check file size limits
- Ensure API keys have upload permissions

### Port Already in Use
- Backend default port is 3000. Change it in `server.js` if needed
- Frontend default port is 5173 with Vite

## 🚀 Future Enhancements

- User authentication and authorization
- Image editing features
- Comments and likes functionality
- Search and filter posts
- User profiles
- Real-time notifications
- Image compression and optimization



## 👨‍💻 Author

Ankan Nandi

---

For more information or issues, please refer to the individual project documentation or contact the development team.
