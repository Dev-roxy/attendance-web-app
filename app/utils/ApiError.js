class ApiError extends Error {
  constructor( status = 500 , message = 'Internal Server Error' ,errors=[]) {
    super(message);
    this.status = status;
    this.data = null;
    this.errors = errors;

  }
}