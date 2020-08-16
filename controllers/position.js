const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function(req,    res) {
    try {
        const position = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        setTimeout(() => {
            res.status(200).json(position)    
        }, 3000);
    } catch(e) {
        errorHandler(   res, e)
    }
}

module.exports.create = async function(req,     res) {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
            res.status(201).json(position)
    } catch(e) {
        errorHandler(   res, e)
    }
}

module.exports.remove = async function(req,     res) {
    try {
        await Position.remove({_id: req.params.id})
            res.status(200).json({
            message: 'Position has been deleted'
        })
    } catch(e) {
        errorHandler(   res, e)
    }
}

module.exports.update = async function(req,     res) {
    try {
        const position = await Position.findOneAndUpdate(
            // FINDING A POSTION WE WANT TO UPDATE
            {_id: req.params.id},
            // UPDATING POSITION
            {$set: req.body},
            // TO return an UPDATED POSITION
            {new: true}
        )
    } catch(e) {
        errorHandler(   res, e)
    }
}