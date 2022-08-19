const Book = require("../models/book");
const GroupBook = require("../models/group-book");
const GroupStudent = require("../models/group-student");

async function indexPost(req, res) {
    const userId = req.session.user.id;
    const groupStudent = await GroupStudent.getByStudentId(userId);
    if(!groupStudent) {
        return res.status(401).send({
            success: false,
            messages: [ 'There is not group student' ]
        });
    }
    const groupBooks =  await GroupBook.getByGroupId(groupStudent.group_id);

    return res.send({
        success: true,
        messages: [],
        data: {
            groupBooks
        }
    });
}

module.exports = {
    indexPost
}
