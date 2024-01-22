document.body.innerHTML += `
<div class="container" id="bm_search">
        <input checked="" class="checkbox" type="checkbox"> 
        <div class="mainbox">
            <div class="iconContainer">
                <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="search_icon"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
            </div>
            <input class="search_input" placeholder="请输入需要检索的书签名称" type="text">
        </div>
</div>
`

const bmSearch = document.getElementById('bm_search');
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
bmSearch.style.position = 'absolute';

bmSearch.style.right = 0 + 'px'
bmSearch.style.top = (winHeight / 3) + 'px'
console.log(bmSearch);

const searchInput = bmSearch.querySelector('.search_input');
const checkbox = bmSearch.querySelector('.checkbox');

searchInput.addEventListener('focus', (e) => {
  console.log(e);
})

searchInput.addEventListener('blur', (e) => {
  checkbox.checked = true;
})