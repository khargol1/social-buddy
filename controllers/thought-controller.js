const { Thought } = require('../models');
const { User } = require('../models/');

const thoughtController = {
    //get all thoughts
    async getAllThoughts(req, res){
        try{
            const results = await Thought.find()
            .select('-__v')
            .sort({_id : -1});

            res.json(results);
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //get single thought by thought id @ api/thoughts/:id
    async getThoughtById({params}, res){
        try{
            const results = await Thought.findOne({_id: params.id})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .sort( { _id: -1} )
            .select('-__v');

            res.json(results);
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //create a new thought
    async createThought({body}, res){
        /*
            body = {
                "thoughtText": "String",
                "username": "Name of Creator",
                "userId": "id of creator"
            }
        */
        try{
            //create new thought
            const newComment = await Thought.create(body);
            //push thought ID to user's thought array
            const results = await User.findByIdAndUpdate(
                { _id: body.userId},
                { $push : { thoughts: newComment._id } },
                { new: true}
                );

                res.json(results);

        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //update a thought by thought id @ api/thoughts/:id
    async updateThought({params, body}, res){
        try{
            const results = await Thought.findByIdAndUpdate({_id: params.id}, body, {new: true});
            res.json(results);
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //delete a thought by thought id @api/thoughts/:id
    async deleteThought({params}, res){
        try{
            //remove thought from user
            //if I find the thought, i get the user and id it belongs to
            const userInfo = await Thought.findOne({_id: params.id});
            //delete the thought 
            const results = await Thought.findOneAndDelete({ _id: params.id});
            const _ = await User.findByIdAndUpdate(
                { _id: userInfo.userId},
                { $pull: {thoughts: params.id} },
                {new: true}
                );
            
            res.json(results);
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //create a reaction for a thought api/thoughts/:thoughtId/reactions
    async createReaction({params, body}, res){
        try{
            const results = await Thought.findByIdAndUpdate(
                { _id: params.thoughtId },
                { $push: {reactions: body } },
                {new: true}
            );
            res.json(results);
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //delete a reaction for a thought api/thoughts/:thoughtId/reactions/:reactionId
    async deleteReaction({params}, res){
        try{
            const results = await Thought.findByIdAndUpdate(
                { _id: params.thoughtId },
                { $pull: {reactions: {reactionId: params.reactionId } } },
                {new: true}
            );
            res.json(results);
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
    }

};

module.exports = thoughtController;