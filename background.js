function getBookmarks(sendResponse) {
    chrome.bookmarks.getTree((tree) => {
        let bookmarks = []
        const root = tree[0].children
        scanBookmarks(root, bookmarks)
        sendResponse(bookmarks)
    });
}

function searchBookmarks(query, sendResponse) {
    chrome.bookmarks.search(query, (res) => {
        sendResponse(res)
    })
}

function scanBookmarks(nodes, bookmarks) {
    for (const node of nodes) {
        if (node.url) {
            bookmarks.push({ url: node.url, title: node.title })
        }
        if (node.children) {
            scanBookmarks(node.children, bookmarks)
        }
    }
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    switch (req.op) {
        case 'getBookmarks':
            getBookmarks(sendResponse)
            return true
        case 'searchBookmarks':
            searchBookmarks(req.query, sendResponse)
            return true
        default:
            sendResponse({ op: 'error', message: 'Unknown operation' })
    }
})