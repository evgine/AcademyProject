const User = require("../models/user");
const Group = require("../models/group");
const GroupStudent = require("../models/group-student");

async function createGroup(req, res) {
    const groupName = req.body.name || '';
    const teacherId = req.body.teacher_id || 0;
    const user = req.session.user;

    if (user.role !== 0) {
        return res.status(401).send({
            success: false,
            messages: ['Permission Denied']
        })
    }

    const newGroup = new Group(groupName, teacherId);
    await newGroup.save();

    const groups = await Group.getAll();
    const teachers = await User.getByRole(1);

    return res.send({
        success: true,
        messages: ['Group Successfully Created'],
        data: {
            user_name: req.session.user.name,
            avatar_name: req.session.user.image_name,
            teachers,
            groups
        }
    });
}

async function groupsIndex(req, res) {
    const groups = await Group.getAll();
    const teachers = await User.getByRole(1);

    return res.send({
        success: true,
        messages: [],
        data: {
            user_name: req.session.user.name,
            avatar_name: req.session.user.image_name,
            teachers,
            groups
        }
    });
}

async function index(req, res) {
    const groupId = req.params.groupId;
    const group = await Group.getById(groupId);
    const students = await User.getFreeStudents();
    const groupStudents = await GroupStudent.getByGroupId(groupId);

    return res.send({
        success: true,
        messages: [],
        data: {
            user_name: req.session.user.name,
            avatar_name: req.session.user.image_name,
            groupStudents,
            group,
            students
        }
    });
}


module.exports = {
    createGroup,
    groupsIndex,
    index
}
