const Model = require("./model");
const Project = require("./project");
const User = require("./user");


class UserProject extends Model {
    constructor(userId, projectId) {
        super();
        this.user_id = userId;
        this.project_id = projectId;
    }

    static async getByUserId(id) {
        const userProjects = await Model.readFile('user_projects.json')

        if (!userProjects.length) {
            return;
        }

        const userProjectsFiltered = userProjects.filter((userProjects) => userProjects.user_id === id);
        if (!userProjectsFiltered) {
            return [];
        }

        return Promise.all(
            userProjectsFiltered.map(async (userProject) => {
                const user = await User.getById(userProject.user_id);
                const project = await Project.getById(userProject.project_id);

                return {
                    ...userProject,
                    user,
                    project
                }
            })
        );
    }

    static async getByProjectId(projectId) {
        const userProjects = await Model.readFile('user_projects.json')

        if (!userProjects.length) {
            return [];
        }

        const userProjectsFiltered = userProjects.filter((userProjects) => userProjects.project_id === projectId);
        if (!userProjectsFiltered) {
            return [];
        }

        return Promise.all(
            userProjectsFiltered.map(async (userProject) => {
                const user = await User.getById(userProject.user_id);
                const project = await Project.getById(userProject.project_id);

                return {
                    ...userProject,
                    user,
                    project
                }
            })
        );
    }

    static async getAll() {
        return await Model.readFile('user_projects.json')
    }
}
module.exports = UserProject;
