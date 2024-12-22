# Blog API

This is a RESTful API for a blog application built with Node.js, Express, and MongoDB. The API supports user authentication and CRUD operations for posts and comments.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Posts](#posts)
  - [Comments](#comments)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

## Features

- User authentication with JWT
- CRUD operations for posts
- CRUD operations for comments

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/blog-api.git
   cd blog-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the server

   ```bash
   node server.js
   ```


## API Endpoints

### Authentication

- #### POST /auth/signup
  Create a new user.
  ```bash
  Request Body:
  {
    "email": "user3@example.com",
    "password": "password123"
  }

  Response:
  {
    "message": "User created successfully",
    "user": {
        "id": "user_id",
        "email": "user@example.com"
    }
  }
  ```

- #### POST /auth/login
  Authenticate a user and provide a JWT token.
  ```bash
  Request Body:
  {
  "email": "user@example.com",
  "password": "password123"
  }

  Response:
  {
  "token": "jwt_token"
  }
  ```

- #### POST /auth/logout
  Invalidate the current user's session.
  ```bash
  Headers:
  {
  "Authorization": "Bearer jwt_token"
  }

  Response:
  {
  "message": "User logged out successfully"
  }
  ```

### Posts

- #### GET /posts
  Retrieve all posts.
  ```bash
  Response:
  [
  {
    "id": "post_id",
    "title": "Post Title",
    "content": "Post Content",
    "author": {
      "id": "author_id",
      "email": "author@example.com"
    }
  },
  ...
  ]
  ```

- #### POST /posts
  Create a new post.
  ```bash
  Headers:
  {
  "Authorization": "Bearer jwt_token"
  }

  Request Body:
  {
  "title": "Post Title",
  "content": "Post Content"
  }

  Response:
  {
  "id": "post_id",
  "title": "Post Title",
  "content": "Post Content",
  "author": {
    "id": "author_id",
    "email": "author@example.com"
  }
  }
  ```

- #### GET /posts/:id
  Retrieve a single post by ID.
  ```bash
  Response:
  {
  "id": "post_id",
  "title": "Post Title",
  "content": "Post Content",
  "author": {
    "id": "author_id",
    "email": "author@example.com"
  }
  }
  ```

- #### PUT /posts/:id
  Update a post by ID.
  ```bash
  Headers:
  {
  "Authorization": "Bearer jwt_token"
  }

  Request Body:
  {
  "title": "Updated Post Title",
  "content": "Updated Post Content"
  }

  Response:
  {
  "id": "post_id",
  "title": "Updated Post Title",
  "content": "Updated Post Content",
  "author": {
    "id": "author_id",
    "email": "author@example.com"
  }
  }
  ```

- #### DELETE /posts/:id
  Delete a post by ID.
  ```bash
  Headers:
  {
  "Authorization": "Bearer jwt_token"
  }

  Response:
  {
  "message": "Post deleted successfully"
  }
  ```


### Comments

- #### POST /comments/:postId
  Create a new comment for a specific post.
  ```bash
  Headers:
  {
  "Authorization": "Bearer jwt_token"
  }

  Request Body:
  {
  "content": "Comment Content"
  }

  Response:
  {
  "id": "comment_id",
  "content": "Comment Content",
  "author": {
    "id": "author_id",
    "email": "author@example.com"
  },
  "postId": "post_id"
  }
  ```

- #### PUT /comments/:id
  Update a comment by ID.
  ```bash
  Headers:
  {
  "Authorization": "Bearer jwt_token"
  }

  Request Body:
  {
  "content": "Updated Comment Content"
  }

  Response:
  {
  "id": "comment_id",
  "content": "Updated Comment Content",
  "author": {
    "id": "author_id",
    "email": "author@example.com"
  },
  "postId": "post_id"
  }
  ```

- #### DELETE /comments/:id
  Delete a comment by ID.
  ```bash
  Headers:
  {
  "Authorization": "Bearer jwt_token"
  }

  Response:
  {
  "message": "Comment deleted successfully"
  }
  ```