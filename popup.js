chrome.bookmarks.getTree((tree) => {
    const coll = document.querySelector('#list')
    const root = tree[0].children
    coll.innerHTML += scanBookmarks(root, '')
});

const bookmarks = []
function scanBookmarks(nodes, inn) {
    let s = ''
    let main = ''
    for (const node of nodes) {
        if (node.url) {
            s += `<mdui-list-item icon="link" href="${node.url}" target="_blank">${node.title}</mdui-list-item>`
            bookmarks.push({ url: node.url, title: node.title })
        }
        if (node.children) {
            main = scanBookmarks(node.children, s)
            inn += mainItem(node.title, subItem(main))
        } else {
            inn += s
        }
        s = ''
        main = ''
    }
    return inn
}

function mainItem(title, subTitle) {
    return `<mdui-collapse>
  <mdui-collapse-item >
    <mdui-list-item slot="header" icon="folder">${title}</mdui-list-item>
    ${subTitle}
</mdui-collapse-item></mdui-collapse>`
}

function subItem(s) {
    return `<div style="margin-left: 2.5rem">${s}</div>`
}

const btnFab = document.getElementById('fab')
btnFab.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

window.onscroll = () => {
    btnFab.style.display = 'block';
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    if (height === 0) {
        btnFab.style.display = 'none'
    }
}

const uiSearchList = document.getElementById('search-list')
function uiSearchListItem(url, name) {
    return `<mdui-tooltip content="${url}"><mdui-list-item href="${url}" target="_blank" icon="link">${name}</mdui-list-item></mdui-tooltip>`
}

const uiSearch = document.getElementById('search')
function runSearch(name) {
    uiSearchList.innerHTML = ''
    const results = bookmarks.filter((item) => item.title.toUpperCase().includes(name.toUpperCase()))
    if (results.length > 0) {
        for (const item of results) {
            uiSearchList.innerHTML += uiSearchListItem(item.url, item.title)
        }
        uiSearchList.style.display = 'block'
    } else {
        uiSearchList.innerHTML = '未检索到相关联的结果'
    }
}
uiSearch.addEventListener("keyup", function (event) {
    event.preventDefault()
    if (event.key === 'Enter') {
        runSearch(uiSearch.value)
    }
})
uiSearch.addEventListener('input', function (event) {
    if (!event.target.value) {
        uiSearchList.style.display = 'none'
    }
})

uiSearch.focus()
mdui.setColorScheme('#0061A4');