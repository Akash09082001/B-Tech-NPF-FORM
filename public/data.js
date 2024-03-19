document.addEventListener("DOMContentLoaded", function() {
const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');

// Fetch JSON data
fetch('./update-state.json')
 .then(response => response.json())
 .then(data => {

     // Populate states dropdown
     data.forEach(state => {
         const option = document.createElement('option');
         option.value = state.id;
         option.textContent = state.name;
         stateSelect.appendChild(option);
     });

     // Function to populate cities dropdown based on selected state
     function populateCities(selectedStateId) {
         // Clear previous options
         citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';

         // Find selected state
         const selectedState = data.find(state => state.id == selectedStateId);
         if (selectedState) {
             // Populate cities dropdown
             selectedState.cities.forEach(city => {
                 const option = document.createElement('option');
                 option.value = city.id;
                 option.textContent = city.name;
                 citySelect.appendChild(option);
             });
         }
     }

     // Event listener for state dropdown change
     stateSelect.addEventListener('change', () => {
         const selectedStateId = stateSelect.value;
         populateCities(selectedStateId);
     });

     // Call populateCities initially with the default selected state
     const defaultStateId = stateSelect.value;
     populateCities(defaultStateId);
 })
 .catch(error => console.error('Error fetching data:', error));
});
