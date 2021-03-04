const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const stories = [
    {
        id: '1',
        title: 'A funny story',
        content: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac laoreet ex, nec consequat orci. Fusce quis pulvinar ante. Praesent lacinia mauris et metus aliquam, sed dictum orci condimentum. Phasellus ultrices leo vel nunc fringilla sagittis. Donec imperdiet ligula ac felis pulvinar porttitor. In vitae ante vitae purus commodo laoreet ac quis tortor. ',
        author: 'Zeke',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    },
    {
        id: '2',
        title: 'A rainy story',
        content: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac laoreet ex, nec consequat orci. Fusce quis pulvinar ante. Praesent lacinia mauris et metus aliquam, sed dictum orci condimentum. Phasellus ultrices leo vel nunc fringilla sagittis. Donec imperdiet ligula ac felis pulvinar porttitor. In vitae ante vitae purus commodo laoreet ac quis tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent sed turpis eget nibh viverra pretium quis at sapien. In hac habitasse platea dictumst. Vestibulum in blandit ligula. Donec in augue enim. Integer tempus euismod massa, imperdiet tincidunt augue facilisis interdum. Nulla et faucibus lacus. Morbi lobortis gravida egestas. Nunc facilisis, lectus sed pellentesque eleifend, enim quam condimentum turpis, vitae facilisis est magna ut nisl. Integer non volutpat sem. Suspendisse hendrerit tincidunt tellus aliquam efficitur. ',
        author: 'Zeke',
        createdAt: DateTime.local(1999, 10, 26, 2, 30).toLocaleString(DateTime.DATETIME_SHORT),
    },

];

exports.find = () => stories;

exports.findById = (id) => stories.find(story => story.id === id);
exports.save = (story) => {
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story)
};
exports.updateById = (id, story) => {
    let s = stories.find(story => story.id === id);
    if (s) {
        s.title = story.title;
        s.content = story.content;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = (id) => {
    let index = stories.findIndex(story => story.id === id);
    if (index !== -1) {
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
};

