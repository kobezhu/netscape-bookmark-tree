# NETSCAPE-Bookmark-tree

把**NETSCAPE-Bookmark-file-1**格式书签转换成**JavaScript**树形数据（数组）。

Parse a **NETSCAPE-Bookmark-file-1** style bookmarks string into nested array.

[Demo](https://kobezhu.github.io/netscape-bookmark-tree/example)

## Installation

NPM

```
npm install netscape-bookmark-tree
```

In the **dist/** directory of the NPM package you will find many different builds.
Here’s an overview of the difference between them:

- amd – Asynchronous Module Definition, used with module loaders like RequireJS
- system – Native format of the SystemJS loader
- cjs – CommonJS, suitable for Node and other bundlers
- esm – Keep the bundle as an ES module file, suitable for other bundlers and inclusion as a `<script type=module>` tag in modern browsers
- iife – A self-executing function, suitable for inclusion as a `<script>` tag. use global variable `bookmark` to access the exports of your bundle.

## Quick start

```
const fs = require('fs');
const bookmark = require('netscape-bookmark-tree');

let content = fs.readFileSync('bookmarks.html', 'utf8');
let tree = bookmark(content);

console.log(tree);
```

## API

The module is very simple, and has only one method, the method returns an array.

```
/**
 * @param {String} string Bookmark text
 * @param {Object} option Configuration Options
 */
bookmark(string, option);
```

### Parameters

1. string

NETSCAPE-Bookmark-file-1 格式书签字符串，Chrome、Firefox导出的书签就是这种格式，文件开头为：

```
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
```

[Netscape Bookmark File Format](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582(v=vs.85))

2. option

```
{
    // 显示键名
    name: 'name',
    // 子节点键名
    children: 'children',
    // 每个节点都会调用该函数，必须返回节点对象，函数签名：each(node, match)
    each: utils.identity
}
```

### Returns

如果传入的字符串符合格式，会返回转换后的树形数据（一个普通的**JavaScript**数组，每一个元素都是对象）。
如果不符合格式，返回`null`。

```
[
    {
        "name": "root",
        "children": [
            {
                "name": "书签栏",
                "children": [
                    {
                        "href": "https://github.com/",
                        "icon": "data:image/png;base64,iVB...",
                        "name": "GitHub"
                    },
                    {
                        "href": "https://gitlab.com/",
                        "icon": "data:image/png;base64,iVB...",
                        "name": "GitLab"
                    },
                    {
                        "href": "https://gitee.com/",
                        "icon": "data:image/png;base64,iVB...",
                        "name": "码云"
                    },
                    {
                        "href": "https://developer.mozilla.org/zh-CN/docs/Web/API",
                        "icon": "data:image/png;base64,iVB...",
                        "name": "MDN"
                    }
                ]
            }
        ]
    }
]
```

## License

[MIT](LICENSE)