  document.addEventListener("DOMContentLoaded", () => {
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

document.getElementById('clear-icon').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.querySelector('.search-panel').innerHTML = '';
});
