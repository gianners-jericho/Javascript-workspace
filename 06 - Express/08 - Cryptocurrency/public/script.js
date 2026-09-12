// Shared by index.ejs, exchange.ejs, and platform.ejs.
// Reads which API endpoint to call from a data attribute on <body>,
// so this one file never needs to know which page it's running on.

const endpoint = document.body.dataset.endpoint;
const displayBox = document.getElementById("display-box");

const previousButton = document.getElementById("previous-button");
const topButton = document.getElementById("top-button");
const nextButton = document.getElementById("next-button");

let currentPage = 1;

// We start on page 1, so there's nothing to go "previous" to yet.
previousButton.disabled = true;

// Coins, exchanges, and platforms all have a "name" field, so this one
// function can render any of them.
function renderItems(items) {
    displayBox.innerHTML = "";
    items.forEach(function (item) {
        const div = document.createElement("div");
        div.textContent = item.name;
        displayBox.appendChild(div);
    });
}

function updateButtons(items, top100Mode) {
    previousButton.disabled = top100Mode || currentPage === 1;
    nextButton.disabled = top100Mode || items.length < 10;
    topButton.disabled = top100Mode;
}

function loadPage(page) {
    fetch(endpoint + "?page=" + page)
        .then(function (response) {
            return response.json();
        })
        .then(function (items) {
            currentPage = page;
            renderItems(items);
            updateButtons(items, false);
        });
}

previousButton.addEventListener("click", function () {
    if (currentPage > 1) {
        loadPage(currentPage - 1);
    }
});

nextButton.addEventListener("click", function () {
    loadPage(currentPage + 1);
});

topButton.addEventListener("click", function () {
    fetch(endpoint + "/top100")
        .then(function (response) {
            return response.json();
        })
        .then(function (items) {
            renderItems(items);
            updateButtons(items, true);
        });
});