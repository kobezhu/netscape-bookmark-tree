# NETSCAPE-Bookmark-tree

[![npm](https://img.shields.io/npm/v/netscape-bookmark-tree.svg?color=%23CB3837)](https://www.npmjs.com/package/netscape-bookmark-tree)


Parse a **NETSCAPE-Bookmark-file-1** style bookmarks string into nested array.

[中文](README-CN.md)
[Example](https://kobezhu.github.io/netscape-bookmark-tree/example)

## Installation

NPM

```
npm install netscape-bookmark-tree
```

In the **dist/** directory of the NPM package you will find many different builds.
Here’s an overview of the difference between them:

- cjs – CommonJS, suitable for Node and other bundlers
- esm – Keep the bundle as an ES module file, suitable for other bundlers and inclusion as a `<script type=module>` tag in modern browsers
- iife – A self-executing function, suitable for inclusion as a `<script>` tag. use global variable `bookmark` to access the exports of your bundle.
- amd – Asynchronous Module Definition, used with module loaders like RequireJS
- system – Native format of the SystemJS loader

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

NETSCAPE-Bookmark-file-1 file format bookmarks string, The file starts with the following text:

```
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
```

> [Related documentation](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582(v=vs.85))

2. option

```
{
    // Invokes function for each node. Signature: each(node, match)
    each: utils.identity,
    // Display key
    name: 'name',
    // Children key
    children: 'children',
    // ID split
    split: '_'
}
```

### Returns

If the input parameters are correct, you see the value of the returned result as nested array,
if not, then return `null`.

```
[
    {
        "id": "0",
        "name": "书签栏",
        "add_date": "1534832849",
        "last_modified": "1557029578",
        "personal_toolbar_folder": "true",
        "children": [
            {
                "id": "0_0",
                "name": "GitHub",
                "href": "https://github.com/",
                "add_date": "1548396453",
                "icon": "data:image/png;base64,iV..."
            }
        ]
    }
]
```

## License

[MIT](LICENSE)