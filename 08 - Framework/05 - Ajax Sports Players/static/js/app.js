//cache dom elements
const searchInput = document.getElementById('search-name');
const genderCheckboxes = document.querySelectorAll('input[name="gender"]');
const sportCheckboxes = document.querySelectorAll('input[name="sport"]');
const resetBtn = document.getElementById('reset-btn');
const playersTbody = document.getElementById('players-tbody');
const playerCount = document.getElementById('player-count');

//debounce timer variable
let debounceTimer = null;

//helper to capitalize strings
const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

//helper to escape html in dynamic content to prevent xss
const escapeHtml = (str) => {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

//fetch and render players via ajax
async function fetchPlayers() {
    try {
        //gather search query parameter
        const name = searchInput.value.trim();

        //gather checked genders
        const selectedGenders = Array.from(genderCheckboxes)
            .filter((cb) => cb.checked)
            .map((cb) => cb.value);

        //gather checked sports
        const selectedSports = Array.from(sportCheckboxes)
            .filter((cb) => cb.checked)
            .map((cb) => cb.value);

        //construct query string
        const params = new URLSearchParams();
        if (name) params.append('name', name);
        selectedGenders.forEach((g) => params.append('gender', g));
        selectedSports.forEach((s) => params.append('sport', s));

        //perform ajax get request
        const response = await fetch(`/players/search?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        renderTable(data.players || []);
    } catch (error) {
        console.error('Failed to fetch players:', error);
        playersTbody.innerHTML = '<tr><td colspan="4" class="no-records">Error loading player data. Please try again.</td></tr>';
    }
}

//render player table rows
function renderTable(players) {
    //update count badge
    playerCount.textContent = `Showing ${players.length} players`;

    //handle empty search results
    if (players.length === 0) {
        playersTbody.innerHTML = '<tr><td colspan="4" class="no-records">No players found matching your criteria.</td></tr>';
        return;
    }

    //generate table row markup
    const rowsHtml = players.map((player) => {
        return `
            <tr>
                <td>${player.id}</td>
                <td class="player-name">${escapeHtml(player.name)}</td>
                <td>${escapeHtml(capitalize(player.gender))}</td>
                <td>${escapeHtml(capitalize(player.sport))}</td>
            </tr>
        `;
    }).join('');

    playersTbody.innerHTML = rowsHtml;
}

//debounced input handler for text search
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fetchPlayers();
    }, 250);
});

//instant change handler for gender checkboxes
genderCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        fetchPlayers();
    });
});

//instant change handler for sport checkboxes
sportCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        fetchPlayers();
    });
});

//reset button handler
resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    genderCheckboxes.forEach((cb) => (cb.checked = false));
    sportCheckboxes.forEach((cb) => (cb.checked = false));
    fetchPlayers();
});
