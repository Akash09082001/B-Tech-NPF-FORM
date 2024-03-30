document.addEventListener('DOMContentLoaded', function () {
    const stateSearchInput = document.getElementById("state");
    const citySearchInput = document.getElementById("city");
    const stateResults = document.getElementById("stateResults");
    const cityResults = document.getElementById("cityResults");

    // Initially hide the state and city results
    stateResults.style.display = 'none';
    stateResults.style.visibility = 'hidden';
    cityResults.style.display = 'none';
    cityResults.style.visibility = 'hidden';

    // Placeholder for states and cities data
    let statesData = [];

    // Function to load states from JSON file
    async function loadStates() {
        try {
            const response = await fetch('data.json');
            statesData = await response.json();
        } catch (error) {
            console.error('Error loading states:', error);
        }
    }

    // Function to filter states based on user input
    function searchStates() {
        const searchTerm = stateSearchInput.value.toLowerCase();
        stateResults.innerHTML = ''; // Clear previous results
        statesData.forEach(state => {
            if (state.name.toLowerCase().includes(searchTerm)) {
                const li = document.createElement("li");
                li.classList.add("search-li");
                li.textContent = state.name;
                li.onclick = () => selectState(state);
                stateResults.appendChild(li);
            }
        });
        // Set display and visibility properties based on search input and focus
        if (searchTerm !== '' && stateSearchInput === document.activeElement) {
            stateResults.style.display = 'block';
            stateResults.style.visibility = 'visible';
        } else {
            stateResults.style.display = 'none';
            stateResults.style.visibility = 'hidden';
        }
    }

    // Function to filter cities based on user input and selected state
    function searchCities(selectedState) {
        const searchTerm = citySearchInput.value.toLowerCase();
        cityResults.innerHTML = ''; // Clear previous results

        // Check if selectedState has cities and is an array
        if (Array.isArray(selectedState.cities)) {
            selectedState.cities.forEach(cityObj => {
                const city = cityObj.name.toLowerCase(); // Access city name from nested object
                if (city.includes(searchTerm)) {
                    const li = document.createElement("li");
                    li.classList.add("search-li");
                    li.textContent = city;
                    li.onclick = () => selectCity(city);
                    cityResults.appendChild(li);
                }
            });
        }
        // Show city results
        cityResults.style.display = 'block';
        cityResults.style.visibility = 'visible';
    }

    // Function to handle selection of state
    function selectState(selectedState) {
        stateSearchInput.value = selectedState.name;
        stateResults.style.display = 'none';
        stateResults.style.visibility = 'hidden';
        // Search cities for the selected state
        searchCities(selectedState);
    }

    // Function to handle selection of city
    function selectCity(city) {
        const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
        citySearchInput.value = capitalizedCity;
        cityResults.style.display = 'none';
        cityResults.style.visibility = 'hidden';
    }

    // Event listener for input change in state search
    stateSearchInput.addEventListener("input", searchStates);

    // Event listener for input change in city search
    citySearchInput.addEventListener("input", function () {
        const selectedStateName = stateSearchInput.value.toLowerCase();
        const selectedState = statesData.find(state => state.name.toLowerCase() === selectedStateName);
        if (selectedState) {
            searchCities(selectedState);
        }
    });

    // Event listener to hide results when clicking outside the search inputs
    document.addEventListener('click', function (event) {
        if (!event.target.closest('#state')) {
            stateResults.style.display = 'none';
            stateResults.style.visibility = 'hidden';
        }
        if (!event.target.closest('#city')) {
            cityResults.style.display = 'none';
            cityResults.style.visibility = 'hidden';
        }
    });

    // Initially load states
    loadStates();
});
