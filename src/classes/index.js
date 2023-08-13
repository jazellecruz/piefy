
class ClientError extends Error {
  constructor(httpCode, clientMessage, err){
    super(err);

    this.httpCode = httpCode;
    this.clientMessage = clientMessage;
  }
}

class ServerError extends Error {
  constructor(httpCode, err){
    super(err);

    this.httpCode = httpCode;
  }
}

module.exports = {ClientError, ServerError}