// Get the search form and results container
const form = document.querySelector("form");
const results = document.querySelector("#results");

form.addEventListener("submit", async function(event) {
    // Prevent the browser from reloading the entire page
    event.preventDefault();

    // Collect all values submitted by the form
    const formData = new FormData(form);
    const params = new URLSearchParams(formData);

    // Tell the controller to return only the player cards
    params.append("ajax", "1");

    try {
        // Send the search request without leaving the current page
        const response = await fetch(`/search?${params}`);

        if (!response.ok) {
            throw new Error("Search request failed");
        }

        // Get the rendered player-card HTML from the server
        const html = await response.text();

        // Replace only the results section
        results.innerHTML = html;
    } catch (error) {
        console.log(`Search failed: ${error}`);
    }
});