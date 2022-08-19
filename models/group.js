const User = require("./user");
const Model = require("./model");

class Group extends Model {
    constructor(name, teacherId) {
        super();
        this.name = name;
        this.teacher_id = teacherId;
    }

    static async getByTeacherId(teacherId) {
        const groups = await Model.readFile('groups.json')

        if (!groups.length) {
            return [];
        }

        const filteredGroups = groups.filter((group) => group.teacher_id === teacherId);

        if (!filteredGroups.length) {
            return [];
        }

        return filteredGroups.map(async (filteredGroup) => {
            const teacher = await User.getById(filteredGroup.teacher_id);
           return {
            ...filteredGroup,
                teacher
            }
        });
    }

    static async getById(id) {
        const groups = await Model.readFile('groups.json')

        if (!groups.length) {
            return;
        }

        return groups.find((group) => group.id === id);
    }

    static async getAll() {
        return await Model.readFile('groups.json')
    }

    async save() {
        await Model.writeFile('groups.json', this);
    }
}
module.exports = Group;