
export class ResponseHandler {
  handle200 = (res, data) => {
    return this.send(res, 200, {status: true, data});
  };

  send = (res, status, data) => {
    return res.status(status).jsonp(data);
  };
}
