document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const navbarHeight = 100;
    const distanceFromTop = Math.abs(
      document.body.getBoundingClientRect().top
    );
    if (distanceFromTop >= navbarHeight) navbar.classList.add("fixed-top");
    else navbar.classList.remove("fixed-top");
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Load saved colors from localStorage
    const savedBgColor = localStorage.getItem('bgColor');
    const savedTextColor = localStorage.getItem('textColor');
    if (savedBgColor) {
        document.body.style.backgroundColor = savedBgColor;
    }
    if (savedTextColor) {
        document.body.style.color = savedTextColor;
        updateTextColors(savedTextColor);
    }
});

// Function to set theme (light mode or dark mode)
function setTheme(theme) {
    if (theme === 'light') {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        localStorage.setItem('bgColor', '#fff');
        localStorage.setItem('textColor', '#000');
        updateTextColors('#000');
    } else if (theme === 'dark') {
        document.body.style.backgroundColor = '#222';
        document.body.style.color = '#fff';
        localStorage.setItem('bgColor', '#222');
        localStorage.setItem('textColor', '#fff');
        updateTextColors('#fff');
    }
}

// Function to show color picker
function showColorPicker() {
    var useColorPicker = confirm('Do you want to use the color picker?');
    if (useColorPicker) {
        // Show the background color picker input
        var colorPickerInput = document.getElementById('color-picker');
        colorPickerInput.style.display = 'block';
        
        colorPickerInput.addEventListener('input', function() {
            let color = colorPickerInput.value;
            textColorPickerInput.value = color;
            document.body.style.backgroundColor = colorPickerInput.value;
            localStorage.setItem('bgColor', colorPickerInput.value);
            colorPickerInput.style.display = 'none'; // Hide after selecting color
        });

        // Show the text color picker input
        var textColorPickerInput = document.getElementById('text-color-picker');
        textColorPickerInput.style.display = 'block';
        
        textColorPickerInput.addEventListener('input', function() {
            document.body.style.color = textColorPickerInput.value;
            localStorage.setItem('textColor', textColorPickerInput.value);
            updateTextColors(textColorPickerInput.value);
            textColorPickerInput.style.display = 'none'; // Hide after selecting color
        });

        var dropdownContent = document.getElementById('dropdown-content');
        dropdownContent.style.display = 'none';
    } else {
        var color = prompt('Enter a color (hexadecimal or named):');
        if (color !== null && color !== '') {
            document.body.style.backgroundColor = color;
            localStorage.setItem('bgColor', color);
        }
    }
}

// Function to update the color of the text elements
function updateTextColors(color) {
    const links = document.querySelectorAll('.div-main-content nav a, .div-main-content p');
    links.forEach(element => {
        element.style.color = color;
    });
}



const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const close = document.querySelector('#close');

close.addEventListener('click')

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});


loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click',()=>{
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click',()=>{
    wrapper.classList.remove('active-popup');
   
});

document.addEventListener("DOMContentLoaded", function() {
    const searchIcon = document.getElementById("search-icon");
    const clearIcon = document.getElementById("clear-icon");
    const searchInput = document.getElementById("search-input");

    searchIcon.addEventListener("click", function() {
        searchInput.focus();
    });

    clearIcon.addEventListener("click", function() {
        if (searchInput.value.length > 0) {
            searchInput.value = searchInput.value.slice(0, -1);
        }
        searchInput.focus();
    });
});

let closeIcon = document.querySelector('#close');
closeIcon.onclick = function () {
    sidebar.classList.toggle('collapsed');
};

document.querySelector('.wrapper .icon-close').addEventListener("click",function(){
    document.querySelector(".wrapper").classList.remove("active");
});




function initMap() {
    // Create a map object
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
    });

    // Try HTML5 geolocation to get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Set the map's center to the user's location
                map.setCenter(pos);

                // Create a marker for the user's location
                new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: 'You are here',
                });

                // Create a Places service object to use the Places API
                const service = new google.maps.places.PlacesService(map);

                // Search for nearby shops
                service.nearbySearch(
                    {
                        location: pos,
                        radius: 1000, // Search within 1000 meters
                        type: ['store'], // Search for stores (you can change this to other types like 'supermarket', 'restaurant', etc.)
                    },
                    (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            // Loop through the results and create markers for each place
                            for (let i = 0; i < results.length; i++) {
                                const place = results[i];
                                const marker = new google.maps.Marker({
                                    map: map,
                                    position: place.geometry.location,
                                    title: place.name,
                                });
                            }
                        }
                    }
                );
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow({
        map: map,
    });
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : "Error: Your browser doesn't support geolocation."
    );
    map.setCenter(pos);
}

// Initialize the map
google.maps.event.addDomListener(window, 'load', initMap);


document.getElementById('catalogueLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('supermarketSelection').style.display = 'block';
});

document.getElementById('showCatalogue').addEventListener('click', function() {
    const selectedSupermarket = document.getElementById('supermarkets').value;
    const catalogues = document.getElementsByClassName('catalogue');
    
    // Hide all catalogues
    for (let i = 0; i < catalogues.length; i++) {
        catalogues[i].style.display = 'none';
    }

    // Show the selected supermarket's catalogue
    document.getElementById(selectedSupermarket).style.display = 'block';
});



const mainContent = document.querySelector('div-main-content');
mainContent.document.body.style.width="calc(100%-80px-2px)";
mainContent.document.body.style.nav.width="100%";
mainContent.document.body.style.backgroundColor="blue";

if(mainContent===inactive){
    mainContent.document.body.style.width="100%";
    mainContent.document.body.style.nav.width="calc(100%-80px-2px)";

}else{
    mainContent.document.body.style.width="calc(100%-80px-2px)";
    mainContent.document.body.style.nav.width="100%";
}

const products = {
    "Supermarket 1": { "Apple": 1.2, "Banana": 0.5, "Carrot": 0.9 },
    "Supermarket 2": { "Apple": 1.3, "Banana": 0.6, "Carrot": 1.0 },
    "Supermarket 3": { "Apple": 1.1, "Banana": 0.4, "Carrot": 0.8 },
    "Supermarket 4": { "Apple": 1.4, "Banana": 0.7 },
    "Supermarket 5": { "Apple": 1.2, "Banana": 0.5, "Carrot": 0.9 },
    "Supermarket 6": { "Apple": 1.5, "Banana": 0.6, "Carrot": 1.1 }
};

const catalogUrls = {
    "Supermarket 1": "https://example.com/catalog1.json",
    "Supermarket 3": "https://example.com/catalog3.json",
    "Supermarket 5": "https://example.com/catalog5.json"
};

async function fetchCatalogData() {
    const catalogData = {};
    for (const [supermarket, url] of Object.entries(catalogUrls)) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            catalogData[supermarket] = data;
        } catch (error) {
            console.error(`Error fetching catalog for ${supermarket}:`, error);
        }
    }
    return catalogData;
}

document.getElementById('catalogue-link').addEventListener('click', async function (event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    let results = [];

    if (query) {
        const catalogData = await fetchCatalogData();

        for (const [supermarket, items] of Object.entries(products)) {
            if (query in items) {
                results.push({
                    supermarket: supermarket,
                    product: query,
                    price: items[query]
                });
            } else {
                results.push({
                    supermarket: supermarket,
                    product: query,
                    price: null
                });
            }
        }

        for (const [supermarket, catalog] of Object.entries(catalogData)) {
            if (query in catalog) {
                results = results.map(result => {
                    if (result.supermarket === supermarket && result.product === query) {
                        result.price = catalog[query];
                    }
                    return result;
                });
            }
        }
    }

    displayResults(results);
    document.getElementById('catalogue-section').style.display = 'block';
});

function displayResults(results) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.className = 'product-item';

            if (result.price !== null) {
                listItem.innerHTML = `<strong>${result.product.charAt(0).toUpperCase() + result.product.slice(1)}</strong> 
                                      in <strong>${result.supermarket}</strong>: 
                                      $${result.price.toFixed(2)}`;
            } else {
                listItem.innerHTML = `<strong>${result.product.charAt(0).toUpperCase() + result.product.slice(1)}</strong> 
                                      is not available in <strong>${result.supermarket}</strong>`;
            }

            productList.appendChild(listItem);
        });
    }
}


document.getElementById('#place').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lng },
        zoom: 15
    });

    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: "You are here!"
    });
}


// Sample product catalog
const productCatalog = {
    "Supermarket1": [
        { "name": "Apple", "price": 1.2 },
        { "name": "Banana", "price": 0.5 },
        { "name": "Orange", "price": 0.8 }
    ],
    "Supermarket2": [
        { "name": "Apple", "price": 1.3 },
        { "name": "Banana", "price": 0.4 },
        { "name": "Orange", "price": 0.9 }
    ],
    "Supermarket3": [
        { "name": "Apple", "price": 1.1 },
        { "name": "Banana", "price": 0.6 },
        { "name": "Orange", "price": 0.85 }
    ]
};

// Function to search products
function searchProducts(query) {
    const searchPanel = document.querySelector('.search-panel');
    searchPanel.innerHTML = ''; // Clear previous results

    if (query.trim() === '') {
        searchPanel.innerHTML = '<p>Please enter a product name to search.</p>';
        return;
    }

    let results = [];
    for (let supermarket in productCatalog) {
        let products = productCatalog[supermarket];
        products.forEach(product => {
            if (product.name.toLowerCase().includes(query.toLowerCase())) {
                results.push({ supermarket, ...product });
            }
        });
    }

    if (results.length === 0) {
        searchPanel.innerHTML = `<p>No results found for "${query}".</p>`;
        return;
    }

    let resultHTML = '<ul>';
    results.forEach(result => {
        resultHTML += `<li>${result.supermarket}: ${result.name} - $${result.price.toFixed(2)}</li>`;
    });
    resultHTML += '</ul>';

    searchPanel.innerHTML = resultHTML;
}

// Event listeners for search functionality
document.getElementById('search-icon').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    searchProducts(query);
});

document.getElementById('search-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = event.target.value;
        searchProducts(query);
    }
});

document.getElementById('clear-icon').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.querySelector('.search-panel').innerHTML = '';
});
