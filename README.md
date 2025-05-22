# User & Captain Authentication API Documentation

---

## 1. User Endpoints

### Register User

**Endpoint**: `POST /user/register`

**Description**: Registers a new user by validating input fields, saving the user to the database, and returning access and refresh tokens.

**Request Body**:

| Field       | Type   | Validation                                             |
| ----------- | ------ | ------------------------------------------------------ |
| `firstName` | String | Minimum 2 characters, trimmed, converted to lowercase  |
| `lastName`  | String | Minimum 2 characters, trimmed, converted to lowercase  |
| `email`     | String | Must be a valid email, trimmed, converted to lowercase |
| `password`  | String | Minimum 5 characters long                              |

#### Example

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

### Login User

**Endpoint**: `POST /user/login`

**Description**: Logs in an existing user by validating credentials and returning new access and refresh tokens.

**Request Body**:

| Field      | Type   | Validation                |
| ---------- | ------ | ------------------------- |
| `email`    | String | Must be a valid email     |
| `password` | String | Minimum 5 characters long |

#### Example

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

### Get User Profile

**Endpoint**: `GET /user/profile`

**Description**: Fetches the authenticated user's profile. Requires access token.

**Headers**:

| Header          | Value              |
| --------------- | ------------------ |
| `Authorization` | Bearer accessToken |

---

### Logout User

**Endpoint**: `GET /user/logout`

**Description**: Logs out the user by deleting the refresh token and clearing the access and refresh token cookies.

---

### Refresh Tokens

**Endpoint**: `POST /user/refreshToken`

**Description**: Generates new access and refresh tokens using the current valid refresh token from cookies.

**Cookies**:

| Name           | Description                   |
| -------------- | ----------------------------- |
| `refreshToken` | Secure HttpOnly refresh token |

---

## 2. Captain Endpoints

### Register Captain

**Endpoint**: `POST /captain/register`

**Description**: Registers a new captain with vehicle details and returns access and refresh tokens.

**Request Body**:

| Field                 | Type    | Validation                                  |
| --------------------- | ------- | ------------------------------------------- |
| `firstName`           | String  | Minimum 2 characters, trimmed, lowercase    |
| `lastName`            | String  | Minimum 2 characters, trimmed, lowercase    |
| `email`               | String  | Valid email, lowercase                      |
| `password`            | String  | Minimum 2 characters                        |
| `vehicle.color`       | String  | Minimum 3 characters                        |
| `vehicle.plate`       | String  | Minimum 3 characters                        |
| `vehicle.capacity`    | Integer | Minimum value of 1                          |
| `vehicle.vehicleType` | String  | Must be one of: `car`, `motorcycle`, `auto` |

#### Example

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "password": "captain123",
  "vehicle": {
    "color": "Blue",
    "plate": "AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### Login Captain

**Endpoint**: `POST /captain/login`

**Description**: Logs in a captain using their email and password, returns access and refresh tokens.

**Request Body**:

| Field      | Type   | Validation           |
| ---------- | ------ | -------------------- |
| `email`    | String | Valid email          |
| `password` | String | Minimum 2 characters |

---

### Get Captain Profile

**Endpoint**: `GET /captain/profile`

**Description**: Returns the profile of the authenticated captain.

**Authentication**: Requires valid access token in cookies.

---

### Logout Captain

**Endpoint**: `GET /captain/logout`

**Description**: Logs out the captain and clears refresh token.

**Authentication**: Requires valid access token in cookies.

---

### Refresh Captain Tokens

**Endpoint**: `GET /captain/refreshTokens`

**Description**: Refreshes access and refresh tokens using the refresh token in cookies.

**Cookies**:

| Name           | Description                   |
| -------------- | ----------------------------- |
| `refreshToken` | Secure HttpOnly refresh token |

---

## Status Codes

| Status Code | Description        |
| ----------- | ------------------ |
| 200         | Success            |
| 201         | Resource created   |
| 400         | Validation error   |
| 401         | Unauthorized       |
| 404         | Resource not found |
