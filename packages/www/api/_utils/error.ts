class SuperError extends Error {
  data: any;

  constructor(msg: string, data: any) {
    super(msg);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SuperError);
    }

    this.name = 'SuperError';
    this.data = data;
  }
}

export default SuperError;
