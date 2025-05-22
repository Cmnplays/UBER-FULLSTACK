export const statusCodes = {
  OK: 200, //get
  CREATED: 201, //post
  NO_CONTENT: 204, //delete
  BAD_REQUEST: 400, //bad request; missing or invalid input
  UNAUTHORIZED: 401, //un authorized, authorization failed
  FORBIDDEN: 403, //logged in but not allowed to access this
  NOT_FOUND: 404, //item doesn't exist
  CONFLICT: 409, //conflict; duplicatr or existing data
  INTERNAL_SERVER_ERROR: 500 //server crased or server fault
};
