class ApiResponse {
  constructor(statusCode = 200, message = "success", data = null) {
    if (typeof statusCode !== "number") {
      throw new Error("Status code must be a number");
    }
    
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
