const { createSecureServer } = require('http2');
const { User } = require('../models');

const userController = {
    //get all users
    async getAllUsers(req, res) {
        try {
            const results = await User.find({})
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ id: -1 });

            res.json(results)
        }
        catch (err) {
            console.log(err);
            res.status.json(err);
        }
    },
    //creates a new user
    async createUser({ body }, res){
        /*
        body = {
            "username" : "lorem", 
            "email" : "lorem@ipsum"
        }
         */
        try{
            const results = await User.create(body);
            res.json(results);
        }
        catch (err) {
            console.log(err);
            res.status.json(err);
        }
    }




};

module.exports = userController;