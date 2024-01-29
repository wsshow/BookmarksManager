document.body.innerHTML += `
<div class="wsbm-s-main">
      <div class="wsbm-s-title">Searcher</div>
      <div class="wsbm-s-box">
        <input class="wsbm-s-input" type="text" placeholder="输入关键词进行检索" />
        <button class="wsbm-s-btn">搜索</button>
      </div>
      <ul class="wsbm-s-list"></ul>
    </div>
`

const objList = document.querySelector(".wsbm-s-list");
const objInput = document.querySelector(".wsbm-s-input");
const objBtn = document.querySelector(".wsbm-s-btn");
const objTitle = document.querySelector(".wsbm-s-title");
const objBox = document.querySelector(".wsbm-s-box");
const objMain = document.querySelector(".wsbm-s-main");

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
objMain.style.top = (winHeight / 3) + 'px'

window.addEventListener("load", function () {
  hideMain();
})

objBtn.addEventListener("click", function () {
  objList.innerHTML = "";
  if (!objInput.value) {
    const li = document.createElement("li");
    li.textContent = "请输入关键词再进行检索";
    li.style.color = "red";
    objList.appendChild(li);
    objList.style.display = "flex";
    return;
  }
  bookmarkSearch(objInput.value)
  objList.style.display = "flex";
});

objInput.addEventListener("input", function () {
  if (!objInput.value) {
    objList.style.display = "none";
    return;
  }
});

objTitle.addEventListener("click", function () {
  if (objBox.style.display === "none") {
    showMain();
  } else {
    hideMain();
  }
});

function isBoxHide() {
  return objBox.style.display === "none";
}

function showMain() {
  objBox.style.display = "flex";
  objMain.classList.remove("wsbm-s-main-hide");
}

function hideMain() {
  objBox.style.display = "none";
  objList.style.display = "none";
  objMain.classList.add("wsbm-s-main-hide");
}

document.addEventListener("keyup", function (e) {
  if (e.key === "/") {
    if (objBox.style.display === "none") {
      showMain();
    }
    objInput.focus();
    return;
  }
  if (e.key === "Escape") {
    if (objBox.style.display !== "none") {
      hideMain();
    }
    return;
  }
  if (e.key === "Enter") {
    isBoxHide() || objBtn.click();
    return;
  }
});

function bookmarkSearch(name) {
  chrome.runtime.sendMessage({
    op: 'searchBookmarks',
    query: name
  }, res => {
    objList.innerHTML = '';
    if (res.length === 0) {
      const li = document.createElement('li');
      li.textContent = "未检索到匹配的内容";
      objList.appendChild(li);
      return;
    }
    res.forEach(el => {
      if (!el.url) {
        return;
      }
      const li = document.createElement('li');
      li.onclick = () => {
        li.querySelector('a').click();
      }
      li.innerHTML = `<a href="${el.url}" target="_blank" rel="noopener noreferrer">${el.title}</a>`;
      objList.appendChild(li);
    });
  })
}
