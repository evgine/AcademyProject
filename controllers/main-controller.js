const User = require("../models/user");
const Group = require("../models/group");
const Rate = require("../models/rate");

async function home(req, res) {
    const user = req.session.user;

    if (user.role === 1) {
        const groups = await Group.getByTeacherId(user.id);
        const userAvgRate = await Rate.getAvgRate(user.id);

        return res.send({
            success: true,
            messages: [],
            data: {
                user_name: user.name,
                avatar_name: user.image_name,
                avg_rate: userAvgRate,
                groups,
            }
        })

    } else if (user.role === 2) {
        const teachers = await User.getByRole(1);
        const userAvgRate = await Rate.getAvgRate(user.id);

        return res.send({
            success: true,
            messages: [],
            data: {
                user_name: user.name,
                avatar_name: user.image_name,
                avg_rate: userAvgRate,
                teachers
            }
        })
    }

    const teachers = await User.getByRole(1);

    return res.send({
        success: true,
        messages: [],
        data: {
            user_name: user.name,
            avatar_name: user.image_name,
            teachers
        }
    });
}

module.exports = {
    home,
}
