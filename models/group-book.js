const Model = require("./model");
const Book = require("./book");
const Group = require("./group");

class GroupBook extends Model {
    constructor(groupId, bookId) {
        super();
        this.group_id = groupId;
        this.book_id =  bookId;
    }

    static async getByGroupId(groupId) {
        const groupBooks = await Model.readFile('group_books.json')

        if (!groupBooks.length) {
            return [];
        }

        const filteredGroupBooks = groupBooks.filter((groupBook) => groupBook.group_id === groupId);

        return await Promise.all(filteredGroupBooks.map(async (groupBook) => {
            const group = await Group.getById(groupBook.group_id);
            const book = await Book.getById(groupBook.book_id);

            return {
                ...groupBook,
                book,
                group
            }
        }));
    }
    static async getByBookId(bookId) {
        const groupBooks = await Model.readFile('group_books.json')

        if (!groupBooks.length) {
            return;
        }

        return groupBooks.find((groupBook) => groupBook.book_id === bookId);
    }

    async save() {
        await Model.writeFile('group_books.json', this);
    }
}
module.exports = GroupBook;