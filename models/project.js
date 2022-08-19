const Model = require("./model");

class Project extends Model {
    constructor(name, description) {
        super();
        this.name = name;
        this.description = description;
    }

    static async getById(id) {
        const projects = await Model.readFile('projects.json')

        if (!projects.length) {
            return;
        }
        return projects.find((project) => project.id === id);
    }

    static async getAll() {
        return await Model.readFile('projects.json')
    }

    async save() {
        await Model.writeFile('projects.json', this);
    }
}
module.exports = Project;