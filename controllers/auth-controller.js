const User = require("../models/user");
const bcrypt = require("bcrypt");

function logout(req, res) {
    delete req.session.user;

    return res.send({
        success: true,
        messages: []
    });
}

async function login(req, res) {
    const email = req.body.email || '';
    const password = req.body.password || '';

    if (!email || !password) {
        return res.status(401).send({
            success: false,
            messages: ['Invalid Password Or Email']
        })
    }

    const user = await User.getByEmail(email);
    if (!user) {
        return res.status(401).send({
            success: false,
            messages: ['Incorrect Email']
        })
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({
            success: false,
            messages: ['Incorrect Password']
        })
    }

    req.session.user = user;

    return res.send({
        success: true,
        messages: ['User Successfully Logged In']
    });
}


async function register(req, res) {
    const age = req.body.age;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password.toString();
    const role = req.body.role;

    if (!age || !name || !lastname || !email || !password || !role || !req.file) {
        return res.status(401).send({
            success: false,
            messages: ['All Fields Required']
        })
    }

    const user = await User.getByEmail(email);
    if (user) {
        return res.status(401).send({
            success: false,
            messages: ['User of this email already exists']
        })
    }

    const newUser = new User(age, name, lastname, email, password, role, req.file.filename);
    await newUser.save();

    req.session.user = newUser;

    return res.send({
        success: true,
        messages: ['User Successfully Created']
    });
}

module.exports = {
    logout,
    login,
    register
}
