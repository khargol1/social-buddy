const { User } = require('../models');
const { update } = require('../models/User');

const userController = {
    //get all users
    async getAllUsers(req, res) {
        try {
            const results = await User.find({})
                .select('-__v')
                .sort({ id: -1 });

            res.json(results)
        }
        catch (err) {
            console.log(err);
            res.status.json(err);
        }
    },
    //Finds one user by ID and shows thoughts and friends
    async getUserById({params}, res){
        try{
            const results = await User.findById({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({id: -1});

            res.json(results);
        }
        catch(err){
            console.log(err);
            res.status(400).json(err);
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
    },
    //update a user by id
    async updateUser({params, body }, res){
        try{
            const results = await User.findOneAndUpdate({_id: params.id}, body, {new: true});
            res.json(results);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    //delete a user by id
    async deleteUser({params}, res){
        try{
        const results = await User.findOneAndDelete({_id: params.id});
        res.json(results);
        }
        catch(err){
            console.log(err);
            res.status(400).json(err);
        }
    }
    




};

module.exports = userController;