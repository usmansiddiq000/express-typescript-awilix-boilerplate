

export class HomeController {
    constructor(){}
    get = async(req, res) => {
        res.jsonp({'message': 'Welcome to express app'})
    }
}

  