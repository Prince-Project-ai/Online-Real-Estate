class ApiError extends Error {
  constructor(status, message = "SomeThing Went wrong", errors = [], stack) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.success = false;

    if (this.stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
