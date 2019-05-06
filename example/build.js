const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const Renderer = require('vue-server-renderer');
const bookmark = require('../dist/netscape-bookmark-tree.cjs');

const filePath = {
    content: path.join(__dirname, 'bookmarks_2019_5_5.html'),
    template: path.join(__dirname, 'template.html'),
    index: path.join(__dirname, 'index.html'),
};

let content = fs.readFileSync(filePath.content, 'utf8');
let tree = bookmark(content);

const app = new Vue({
    render(h) {
        function renderList(tree, data) {
            let slots = tree.map(function (node) {
                const children = node.children;
                let liSlots = [];
                if (node.icon)
                    liSlots.push(h('img', { class: 'mr-1', attrs: { src: node.icon, width: 16 } }));

                if (children) {
                    liSlots.push(h('strong', node.name));
                    liSlots.push(renderList(children, data));
                } else {
                    liSlots.push(h('a', { attrs: { href: node.href } }, node.name));
                }

                return h('li', liSlots);
            });
            return h('ol', data, slots);
        }

        return h('div', { class: 'p-3', attrs: { id: 'app' } }, [
            h('h1', [
                'NETSCAPE-Bookmark-tree',
                h('a', { class: 'ml-5', attrs: { href: 'https://github.com/kobezhu/netscape-bookmark-tree/blob/master/README.md' } }, '文档')
            ]),
            h('section', { class: 'my-5' }, [
                h('h2', '渲染示例'),
                renderList(tree)
            ]),
            h('section', { class: 'mb-5' }, [
                h('h2', '转换后数据'),
                h('pre', JSON.stringify(tree, null, '    '))
            ]),
            h('section', [
                h('h2', '源数据'),
                h('pre', content)
            ])
        ]);

    }
});

let template = fs.readFileSync(filePath.template, 'utf8');
const renderer = Renderer.createRenderer({ template });

renderer.renderToString(app, function (err, html) {
    if (err) throw err;
    fs.writeFileSync(filePath.index, html, 'utf8');
});