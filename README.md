# User Registration API Documentation

## Endpoint: `/user/register`

### Description
This endpoint is used to register a new user in the system. It validates the input data, creates a new user in the database, and generates access and refresh tokens for the user.

---

### HTTP Method
`POST`

---

### Request Body
The following fields are required in the request body:

| Field       | Type   | Validation                                                                 |
|-------------|--------|---------------------------------------------------------------------------|
| `firstName` | String | Must be at least 2 characters long, trimmed, and converted to lowercase.  |
| `lastName`  | String | Must be at least 2 characters long, trimmed, and converted to lowercase.  |
| `email`     | String | Must be a valid email address, trimmed, and converted to lowercase.       |
| `password`  | String | Must be at least 5 characters long.                                       |

Example JSON request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
