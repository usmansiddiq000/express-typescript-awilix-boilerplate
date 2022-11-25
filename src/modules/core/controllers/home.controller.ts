

export class HomeController {
  get = async (req, res) => {
    res.jsonp({'message': 'Welcome to express app'});
  };
}

