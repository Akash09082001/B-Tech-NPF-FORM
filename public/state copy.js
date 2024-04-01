
function initializeSearch(stateInputId, cityInputId, stateResultsId, cityResultsId, dataUrl) {
    const stateSearchInput = document.getElementById(stateInputId);
    const citySearchInput = document.getElementById(cityInputId);
    const stateResults = document.getElementById(stateResultsId);
    const cityResults = document.getElementById(cityResultsId);

    stateResults.style.display = 'none';
    stateResults.style.visibility = 'hidden';
    cityResults.style.display = 'none';
    cityResults.style.visibility = 'hidden';

    let statesData = [];

    async function loadStates() {
        try {
            const response = await fetch(dataUrl);
            statesData = await response.json();
        } catch (error) {
            console.error('Error loading states:', error);
        }
    }

    function displayAllStates() {
        stateResults.innerHTML = '';
        statesData.forEach(state => {
            const li = document.createElement("li");
            li.classList.add("search-li");
            li.textContent = state.name;
            li.onclick = () => selectState(state);
            stateResults.appendChild(li);
        });
        stateResults.style.display = 'block';
        stateResults.style.visibility = 'visible';
    }

    function displayAllCities(selectedState) {
        cityResults.innerHTML = '';
        if (Array.isArray(selectedState.cities)) {
            selectedState.cities.forEach(cityObj => {
                const city = cityObj.name.toLowerCase();
                const li = document.createElement("li");
                li.classList.add("search-li");
                li.textContent = city;
                li.onclick = () => selectCity(city);
                cityResults.appendChild(li);
            });
        }
        cityResults.style.display = 'block';
        cityResults.style.visibility = 'visible';
    }

    function searchStates() {
        const searchTerm = stateSearchInput.value.toLowerCase();
        stateResults.innerHTML = '';
        statesData.forEach(state => {
            if (state.name.toLowerCase().includes(searchTerm)) {
                const li = document.createElement("li");
                li.classList.add("search-li");
                li.textContent = state.name;
                li.onclick = () => selectState(state);
                stateResults.appendChild(li);
            }
        });
        if (searchTerm !== '' && stateSearchInput === document.activeElement) {
            stateResults.style.display = 'block';
            stateResults.style.visibility = 'visible';
        } else {
            stateResults.style.display = 'none';
            stateResults.style.visibility = 'hidden';
        }
    }

    function searchCities(selectedState) {
        const searchTerm = citySearchInput.value.toLowerCase();
        cityResults.innerHTML = '';

        if (Array.isArray(selectedState.cities)) {
            selectedState.cities.forEach(cityObj => {
                const city = cityObj.name.toLowerCase();
                if (city.includes(searchTerm)) {
                    const li = document.createElement("li");
                    li.classList.add("search-li");
                    li.textContent = city;
                    li.onclick = () => selectCity(city);
                    cityResults.appendChild(li);
                }
            });
        }
        cityResults.style.display = 'block';
        cityResults.style.visibility = 'visible';
    }

    function selectState(selectedState) {
        stateSearchInput.value = selectedState.name;
        stateResults.style.display = 'none';
        stateResults.style.visibility = 'hidden';
        citySearchInput.disabled = false;
        displayAllCities(selectedState);
    }

    function selectCity(city) {
        const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
        citySearchInput.value = capitalizedCity;
        cityResults.style.display = 'none';
        cityResults.style.visibility = 'hidden';
    }

    stateSearchInput.addEventListener("input", searchStates);

    stateSearchInput.addEventListener("focus", displayAllStates);

    citySearchInput.addEventListener("focus", function () {
        const selectedStateName = stateSearchInput.value.toLowerCase();
        const selectedState = statesData.find(state => state.name.toLowerCase() === selectedStateName);
        if (selectedState) {
            displayAllCities(selectedState);
        }
    });

    citySearchInput.addEventListener("input", function () {
        const selectedStateName = stateSearchInput.value.toLowerCase();
        const selectedState = statesData.find(state => state.name.toLowerCase() === selectedStateName);
        if (selectedState) {
            searchCities(selectedState);
        }
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('#' + stateInputId)) {
            stateResults.style.display = 'none';
            stateResults.style.visibility = 'hidden';
        }
        if (!event.target.closest('#' + cityInputId)) {
            cityResults.style.display = 'none';
            cityResults.style.visibility = 'hidden';
        }
    });

    citySearchInput.disabled = true;
    loadStates();
}

document.addEventListener('DOMContentLoaded', function () {
    initializeSearch("state", "city", "stateResults", "cityResults", "data.json");
});
