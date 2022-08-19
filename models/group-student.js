const Group = require("./group");
const User = require("./user");
const Model = require("./model");

class GroupStudent extends Model {
    constructor(groupId, studentId) {
        super();
        this.group_id = groupId;
        this.student_id = studentId;
    }

    static async getByStudentId(studentId) {
        const groupStudents = await Model.readFile('group_students.json')

        if (!groupStudents.length) {
            return;
        }

        return groupStudents.find((groupStudent) => groupStudent.student_id === studentId);
    }

    static async getByGroupId(groupId) {
        const groupStudents = await Model.readFile('group_students.json')

        if (!groupStudents.length) {
            return [];
        }
        const filteredGroupStudents = groupStudents.filter((groupStudent) => groupStudent.group_id === groupId);

        return filteredGroupStudents.map(async (groupStudent) => {
            const group = await Group.getById(groupStudent.group_id);
            const student = await User.getById(groupStudent.student_id);

            return {
                ...groupStudent,
                group,
                student
            }
        })
    }

    async save() {
        await Model.writeFile('group_students.json', this);
    }
}
module.exports = GroupStudent;