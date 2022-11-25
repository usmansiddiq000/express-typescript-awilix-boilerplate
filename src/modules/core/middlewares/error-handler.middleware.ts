import {validationResult} from 'express-validator';

export class ErrorHandler {
  handle400 = (res, e = 'Bad Request, Invalid Parameters') => {
    return this.send(res, 400, {status: false, message: e});
  };

  handle401 = (res, e = 'Request Unauthenticated') => {
    return this.send(res, 401, {status: false, message: e});
  };

  handle404 = (res, e = 'Resource Not Found') => {
    return this.send(res, 404, {status: false, message: e});
  };

  handle403 = (res, e = 'Request Unauthorized') => {
    return this.send(res, 403, {status: false, message: e});
  };

  handle422 = (res, e = []) => {
    return this.send(res, 422, {status: false, message: e});
  };

  handle500 = (res, e = 'Error in completing your request') => {
    console.log(e);
    return this.send(res, 500, {
      status: false,
      message: e,
    });
  };

  send = (res, status, data) => {
    return res.status(status).jsonp(data);
  };

  validatorErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return this.handle422(res, errors.array());
    }
    next();
  };
}
