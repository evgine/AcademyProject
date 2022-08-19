const bcrypt = require("bcrypt");
const Model = require("./model");
const GroupStudent = require("./group-student");

class User extends Model {
    constructor(age, name, lastname, email, password, role, imageName) {
        super();
        this.age = age;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.image_name = imageName;
    }

    static async getByEmail(email, showPassword = false) {
        const users = await Model.readFile('users.json')

        if (!users.length) {
            return;
        }

        const filteredUser = users.find((user) => user.email === email);
        if (showPassword) {
            delete filteredUser.password;
        }

        return filteredUser;
    }

    static async getById(id) {
        const users = await Model.readFile('users.json')

        if (!users.length) {
            return;
        }

        const filteredUser = users.find((user) => user.id === id);
        delete filteredUser.password;

        return filteredUser;
    }

    static async getByRole(role) {
        const users = await Model.readFile('users.json')

        if (!users.length) {
            return [];
        }

        return users.reduce(async (aggregator, user ) => {
            const isByRole = user.role === role;

            const agg = await aggregator;
            if (isByRole) {
                delete user.password;
                agg.push(user);
            }

            return agg;
        }, [])
    }

    static async getFreeStudents() {
        const users = await Model.readFile('users.json')

        if (!users.length) {
            return [];
        }

        return users.reduce(async (aggregator, user ) => {
            const isStudentFree = await GroupStudent.getByStudentId(user.id);

            if (typeof isStudentFree === 'undefined') {
                delete user.password;
                aggregator.push(user);
            }

            return aggregator;
        }, [])
    }

    async save() {
        this.password = await bcrypt.hash(this.password, 9);
        await Model.writeFile('users.json', this);
    }
}
module.exports = User;