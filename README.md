
# CrudApiRequest

CrudApiRequest is a versatile JavaScript library for interacting with CRUD (Create, Read, Update, Delete) APIs. It simplifies the process of making HTTP requests to a CRUD API and handling responses.

## Features

- Easy-to-use methods for GET, POST, PUT, and DELETE requests.
- Built-in error handling.
- Debug mode for additional logging.

## Installation

```bash
npm install crudapi-request
```

## Usage

First, import the `CrudApiRequest` class from the library.

```javascript
import CrudApiRequest from 'crudapi-request';
```

### Initialization

Create an instance of the `CrudApiRequest` class. You'll need to provide the API URL and your API key.

```javascript
const request = new CrudApiRequest('https://crudapi.co.uk/api/v1/', '<Your-API-Key>', true);
```

### Making Requests

Here are examples of how to make different types of requests:

**GET Request**

```javascript
// Fetch all posts
const allPosts = await request.get('posts');

// Fetch a specific post by ID
const post = await request.get('posts', 'post-id');
```

**POST Request**

```javascript
// Create a new user
const newUser = await request.post('users', { name: 'John Doe' });
```

**PUT Request**

```javascript
// Update a user's name
const updatedUser = await request.put('users', 'user-id', { name: 'Jane Doe' });
```

**DELETE Request**

```javascript
// Delete a user
const deleteUser = await request.delete('users', 'user-id');
```

### Error Handling

Errors are thrown as exceptions. Use try-catch blocks to handle them.

```javascript
try {
  const users = await request.get('users');
} catch (error) {
  console.error('Failed to fetch users:', error);
}
```

## Debug Mode

Enable debug mode in the constructor to log errors to the console. This is useful for development.

```javascript
const request = new CrudApiRequest('https://crudapi.co.uk/api/v1/', '<Your-API-Key>', true);
```

## Contributing

Feel free to contribute to the library by submitting pull requests or issues on the GitHub repository.

## License

This project is licensed under the MIT License.
