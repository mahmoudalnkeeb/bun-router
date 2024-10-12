# Simple Bun Router

A lightweight, custom router for Bun that supports GET, POST, PUT, and DELETE requests, along with middleware handling. This project demonstrates how to set up routing with middleware in a Bun server environment.

## Features

- **Routing:** Supports handling of `GET`, `POST`, `PUT`, and `DELETE` requests.

- **Middleware Support:** Apply one or more middleware functions to routes, such as logging, authentication, etc.

- **Simple Setup:** Easy to extend with new methods.

## Getting Started

### Installation

To install dependencies:

```bash
bun install
```

### Usage

To run the server:

```bash
bun run index.ts
```

The server will start at `http://localhost:3000`. You can modify the routes and middlewares in the `index.ts` file to fit your requirements.

### Example Routes

- **GET `/hello`**: Returns a simple "Hello World!" response.

  **Request**:

  ```http
  GET /hello
  ```

  **Response**:

  ```http
  200 OK
  Hello World!
  ```

- **GET `/profile`**: Returns user profile data if authorized.

  **Request**:

  ```http
  GET /profile
  ```

  **Response**:

  ```http
  200 OK
  {
    "userId": "id"
  }
  ```

- **GET `/protected`**: A protected route that returns "Unauthorized" if the authorization middleware blocks the request.

  **Request**:

  ```http
  GET /protected
  ```

  **Response**:

  ```http
  401 Unauthorized
  ```

### Contribution

Contributions are welcome! Here's how you can contribute to this project:

1. **Fork the repository** and clone it to your local machine.

2. **Create a new branch** for your feature or bug fix:

3. **Make your changes**, ensuring the code adheres to the project's style and functionality.

4. **Commit your changes**:

   ```bash
   git commit -m "short and clear commit message about changes"
   ```

5. **Push to your branch**:

6. **Open a pull request** to the `main` branch with a description of your changes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
