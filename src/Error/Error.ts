type Options = {
  message: string,
  statusCode: 200 | 404 | 400 | 401 | 500,
  domain: 'Unknown' | 'Authentication' | 'Cities' | 'Timeout' | ''
}

class ServerError extends Error {
  domain: Options["domain"] = '';
  statusCode: Options["statusCode"] = 400;

  constructor({ message, statusCode, domain }: Options) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.domain = domain;
  }
}

export default ServerError;