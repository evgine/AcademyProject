const Model = require("./model");

class Book extends Model {
    constructor(name, type, fileName) {
        super();
        this.name = name;
        this.type = type;
        this.file_name = fileName;
    }

    static async getById(id) {
        const books = await Model.readFile('books.json')

        if (!books.length) {
            return;
        }

        return books.find((book) => book.id === id);
    }

    static async getAll() {
        return await Model.readFile('books.json')
    }

    static async getFreeBooks() {
        const books = await Model.readFile('books.json')

        if (!books.length) {
            return [];
        }

        return books.reduce(async (aggregator, book ) => {
            const isBookFree = await GroupBookId(book.id);

            if (typeof isBookFree === 'undefined') {
                aggregator.push(user);
            }
            return aggregator;
        }, [])
    }

    async save() {
        await Model.writeFile('books.json', this);
    }
}

module.exports = Book;