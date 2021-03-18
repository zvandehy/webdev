const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

// TODO: Add 3 connections for 2 projects
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
        images: ['/src/textbooks/america1.jpg', '/src/textbooks/america2.jpg', '/src/textbooks/america3.jpg']
    },
    {
        id: '11',
        subject: 'Social Studies',
        title: 'America Divided',
        price: '25.00',
        isbn: '1-415-72351-1',
        author: 'Maurice Isserman',
        quality: 'Used',
        classcode: 'LBST 2102',
        classname: 'Global Connections: The 1970s',
        professor: 'Dr. Greene',
        images: ['/src/textbooks/america1.jpg', '/src/textbooks/america2.jpg', '/src/textbooks/america3.jpg']
    },
    {
        id: '111',
        subject: 'Social Studies',
        title: 'America Divided',
        price: '25.00',
        isbn: '1-415-72351-1',
        author: 'Maurice Isserman',
        quality: 'Used',
        classcode: 'LBST 2102',
        classname: 'Global Connections: The 1970s',
        professor: 'Dr. Greene',
        images: ['https://media.npr.org/assets/news/2009/09/15/collegetextbook_43-aad50f9f8c5caf5428f10661e746416cb5273c2f-s800-c85.jpg', '/src/textbooks/america2.jpg', '/src/textbooks/america3.jpg']
    },
    {
        id: '1111',
        subject: 'Social Studies',
        title: 'America Divided',
        price: '25.00',
        isbn: '1-415-72351-1',
        author: 'Maurice Isserman',
        quality: 'Used',
        classcode: 'LBST 2102',
        classname: 'Global Connections: The 1970s',
        professor: 'Dr. Greene',
        images: ['/src/textbooks/america1.jpg', '/src/textbooks/america2.jpg', '/src/textbooks/america3.jpg']
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
        images: ['https://media.npr.org/assets/news/2009/09/15/collegetextbook_43-aad50f9f8c5caf5428f10661e746416cb5273c2f-s800-c85.jpg', '/src/textbooks/designing2.jpg']
    },
    {
        id: '22',
        subject: 'Computer Science',
        title: 'Designing Interfaces - Patterns for Effective Interaction Design',
        price: '20.00',
        isbn: '0-596-00803-1',
        author: 'Jennifer Tidwell',
        quality: 'Like New',
        classcode: 'ITSC 3130',
        classname: 'Human-Computer Design',
        professor: 'Dr. Mejias',
        images: ['/src/textbooks/designing.jpg', '/src/textbooks/designing2.jpg']
    },
    {
        id: '222',
        subject: 'Computer Science',
        title: 'Designing Interfaces - Patterns for Effective Interaction Design',
        price: '20.00',
        isbn: '0-596-00803-1',
        author: 'Jennifer Tidwell',
        quality: 'Like New',
        classcode: 'ITSC 3130',
        classname: 'Human-Computer Design',
        professor: 'Dr. Mejias',
        images: ['/src/textbooks/designing.jpg', '/src/textbooks/designing2.jpg']
    },
    {
        id: '3',
        subject: 'Education',
        title: 'Educating people on interfaces',
        price: '20.00',
        isbn: '0-596-00803-1',
        author: 'Jennifer Tidwell',
        quality: 'Like New',
        classcode: 'ITSC 3130',
        classname: 'Human-Computer Design',
        professor: 'Dr. Mejias',
        images: ['https://media.npr.org/assets/news/2009/09/15/collegetextbook_43-aad50f9f8c5caf5428f10661e746416cb5273c2f-s800-c85.jpg', '/src/textbooks/designing2.jpg']
    }
];

exports.find = () => textbooks;

exports.findById = (id) => textbooks.find(textbook => textbook.id === id);

exports.save = (textbook) => {
    textbook.id = uuidv4();
    // TODO: when using uploaded images, make sure to get the right relative path. 
    textbook.images = [textbook.imageurl];
    textbooks.push(textbook)
};
exports.updateById = (id, textbook) => {
    let t = textbooks.find(textbook => textbook.id === id);
    if (t) {
        t.title = textbook.title;
        t.price = textbook.price;
        t.isbn = textbook.isbn;
        t.subject = textbook.subject;
        t.author = textbook.author;
        t.quality = textbook.quality;
        t.classcode = textbook.classcode;
        t.classname = textbook.classname;
        t.professor = textbook.professor;
        t.images = [textbook.imageurl];
        // TODO: Update images
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

