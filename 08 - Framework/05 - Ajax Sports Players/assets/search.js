const form = document.getElementById('search_form');
const results = document.getElementById('results');

//Ask the server for the cards only, then drop them into the results box
async function search() {
    const params = new URLSearchParams(new FormData(form));

    //Tells the controller to render the partial instead of the whole page
    params.append('ajax', '1');

    try {
        const response = await fetch('/search?' + params);
        const html = await response.text();

        results.innerHTML = html;
    } catch (error) {
        console.log(error);
    }
}

//SUBMIT: stop the page from reloading and search by ajax instead
form.addEventListener('submit', function(event) {
    event.preventDefault();

    search();
});
