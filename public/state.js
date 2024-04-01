fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const stateSelect = document.getElementById('state');
        const citySelect = document.getElementById('city');

        data.forEach(state => {
            const option = document.createElement('option');
            option.value = state.name;
            option.textContent = state.name;
            stateSelect.appendChild(option);
        });

        function populateCities(selectedState) {
            citySelect.innerHTML = '<option value="" class="flex w-full h-full text-sm py-2 " disabled selected>Select City</option>';

            const stateObj = data.find(state => state.name === selectedState);

            if (stateObj) {
                stateObj.cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.name;
                    option.textContent = city.name;
                    citySelect.appendChild(option);
                });
            }
        }
        stateSelect.addEventListener('change', function () {
            populateCities(this.value);
            citySelect.disabled = false; // Enable city dropdown
        });
    })
    .catch(error => console.error('Error fetching data:', error));



fetch('country.json')
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('countrySelect');

        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.countryCode;
            option.textContent = country.countryCode;
            countrySelect.appendChild(option);
        });

        countrySelect.value = "+91";

        countrySelect.addEventListener('change', function () {
            const countryCode = this.value;
            const locationDivs = document.getElementsByClassName('location');

            const locationArray = Array.from(locationDivs);

            if (countryCode === "+91") {
                locationArray.forEach(div => {
                    if (div.style.display !== 'block') {
                        div.style.display = 'block';
                    }
                });
            } else {
                locationArray.forEach(div => {
                    if (div.style.display !== 'none') {
                        div.style.display = 'none';
                    }
                });
            }
        });
    })
    .catch(error => console.error('Error fetching countries:', error));
