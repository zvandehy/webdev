const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const textbooks = [
    {
        id: '1',
        subject: 'Social Studies',
        title: 'America Divided',
        price: '25.00',
        isbn: '1-415-72351-1',
        author: 'Maurice Isserman',
        quality: 'Used',
        classcode: 'LBST 2102',
        classname: 'Global Connections: The 1970s',
        professor: 'Dr. Greene',
        images: ['america1.jpg', 'america2.jpg', 'america3.jpg']
    },
    {
        id: '2',
        subject: 'Computer Science',
        title: 'Designing Interfaces - Patterns for Effective Interaction Design',
        price: '20.00',
        isbn: '0-596-00803-1',
        author: 'Jennifer Tidwell',
        quality: 'Like New',
        classcode: 'ITSC 3130',
        classname: 'Human-Computer Design',
        professor: 'Dr. Mejias',
        images: ['designing.jpg', 'designing2.jpg']
    }
];

exports.find = () => textbooks;

exports.findById = (id) => textbooks.find(textbook => textbook.id === id);

exports.save = (textbook) => {
    textbook.id = uuidv4();
    textbook.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    textbooks.push(textbook)
};
exports.updateById = (id, textbook) => {
    let t = textbooks.find(textbook => textbook.id === id);
    if (t) {
        t.title = textbook.title;
        t.content = textbook.content;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = (id) => {
    let index = textbooks.findIndex(textbook => textbook.id === id);
    if (index !== -1) {
        textbooks.splice(index, 1);
        return true;
    } else {
        return false;
    }
};

