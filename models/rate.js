const User = require("./user");
const Model = require("./model");

class Rate extends Model {
    constructor(userId, estimatorId, rate) {
        super();
        this.rate = rate;
        this.user_id = userId;
        this.estimator_id = estimatorId;
        this.created_at = new Date();
        this.update_at = new Date();
    }

    static async getByUserId(userId) {
        const rates = await Model.readFile('rates.json')

        if (!rates.length) {
            return [];
        }

        const filteredRates = rates.filter((rate) => rate.user_id === userId);

        if (!filteredRates.length) {
            return [];
        }

        return filteredRates.map(async (filteredRate) => {
            const user = await User.getById(filteredRate.user_id);
            const estimator = await User.getById(filteredRate.estimator_id);
           return {
            ...filteredRate,
               user,
               estimator
            }
        });
    }

    static async getByEstimatorId(estimatorId) {
        const rates = await Model.readFile('rates.json')

        if (!rates.length) {
            return [];
        }

        const filteredRates = rates.filter((rate) => rate.estimator_id === estimatorId);

        if (!filteredRates.length) {
            return [];
        }

        return filteredRates.map(async (filteredRate) => {
            const user = await User.getById(filteredRate.user_id);
            const estimator = await User.getById(filteredRate.estimator_id);
           return {
            ...filteredRate,
               user,
               estimator
            }
        });
    }

    static async canEstimate(estimatorId, userId) {
        const rates = await Model.readFile('rates.json')

        if (!rates.length) {
            return true;
        }

        return !rates.find((rate) => rate.estimator_id === estimatorId && rate.user_id === userId);
    }

    static async getAvgRate(userId) {
        const rates = await Model.readFile('rates.json')

        if (!rates.length) {
            return 0;
        }

        let length = 0;

        return rates.reduce((acc, rate) => {
            if (rate.user_id === userId) {
                acc += rate.rate;
                length++;
            }

            return acc;
        }, 0) / (length || 1);
    }

    async save() {
        this.update_at = new Date();
        await Model.writeFile('rates.json', this);
    }
}
module.exports = Rate;