const Rate = require("../models/rate");
const User = require("../models/user");

async function index(req, res) {
    const user = req.session.user;
    const userRates = Rate.getByUserId(user.id);

    return res.send({
        success: true,
        messages: [],
        data: {
            user_name: req.session.user.name,
            avatar_name: req.session.user.image_name,
            rates: userRates
        }
    });
}

async function indexPost(req, res) {
    const estimator = req.session.user;
    const rate = req.body.rate;
    const userId = req.body.user_id;

    if (!userId || !rate) {
        return res.status(401).send({
            success: false,
            messages: [ 'All Fields Is Required' ]
        });
    }

    if (userId === estimator.id) {
        return res.status(401).send({
            success: false,
            messages: [ 'Permission Denied' ]
        });
    }

    const user = await User.getById(userId);
    if (user.role === estimator.role) {
        return res.status(401).send({
            success: false,
            messages: [ 'Permission Denied' ]
        });
    }

    if(!await Rate.canEstimate(estimator.id, userId)){
        return res.status(401).send({
            success: false,
            messages: ['You Cant Estimate!']
        });
    }

    const newRate = new Rate(userId, estimator.id, rate);
    await newRate.save();

    return res.send({
        success: true,
        errors: []
    });
}


module.exports = {
    index,
    indexPost
}
