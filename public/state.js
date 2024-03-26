var config = {
    cUrl: 'https://api.countrystatecity.in/v1',
    cKey: 'TFEyUmo3ZXlOd3dNa0FUeTZrTEFqdU1oYWdUU2J1cEtGRXp3OHNIbA=='
};

var state = document.getElementById("state"),
    city = document.getElementById("city");

const selectedCountry = () => {
    return new Promise((resolve, reject) => {
        fetch(config.cUrl + '/countries', { headers: { "X-CSCAPI-KEY": config.cKey } })
            .then(response => response.json())
            .then(data => {
                const india = data.find(country => country.name === "India");
                if (india) {
                    const selectedCountryISO2 = india.iso2;
                    resolve(selectedCountryISO2);
                } else {
                    console.log("India not found in the response.");
                    reject("India not found in the response.");
                }
            })
            .catch(error => reject(error));
    });
};

const loadStates = () => {
    selectedCountry()
        .then(selectedCountryISO2 => {
            state.innerHTML = '<option value="">Select State</option>';
            fetch(`${config.cUrl}/countries/${selectedCountryISO2}/states`, { headers: { "X-CSCAPI-KEY": config.cKey } })
                .then(response => response.json())
                .then(data => {
                    // Sort states by name
                    data.sort((a, b) => a.name.localeCompare(b.name));
                    data.forEach(stateData => {
                        const option = document.createElement('option');
                        option.value = stateData.iso2;
                        option.textContent = stateData.name;
                        state.appendChild(option);
                    });
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
};

const loadCity = () => {
    selectedCountry()
        .then(selectedCountryISO2 => {
            const selectedStateCode = state.value;
            city.innerHTML = '<option value="">Select City</option>';
            fetch(`${config.cUrl}/countries/${selectedCountryISO2}/states/${selectedStateCode}/cities`, { headers: { "X-CSCAPI-KEY": config.cKey } })
                .then(response => response.json())
                .then(data => {
                    // Sort cities by name
                    data.sort((a, b) => a.name.localeCompare(b.name));
                    data.forEach(cityData => {
                        const option = document.createElement('option');
                        option.value = cityData.name;
                        option.textContent = cityData.name;
                        city.appendChild(option);
                    });
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
};

// Add event listeners to trigger loading of states and cities
state.addEventListener('change', loadCity);

// Load states initially
loadStates();
