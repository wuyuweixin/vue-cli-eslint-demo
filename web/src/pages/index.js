let suffix = '.html';
let prefix = './';

const pages = {
  index: {
    entry: './web/src/pages/index/main.js',
    template: './web/public/index.html',
    filename: `${prefix}index${suffix}`,
    title: 'Home'
  }
};

const ts = Date.now();
for (let key in pages) {
  pages[key].ts = ts;
  if (!['Home'].includes(pages[key].title)) {
    pages[key].minify = false;
  }
}
module.exports = pages;
