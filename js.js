document.addEventListener('DOMContentLoaded', function() {
    const toggleMenu = document.querySelector(".toggleMenu");
    toggleMenu.addEventListener('click', function() {
        toggleMenu();
    });
});

function toggleMenu() {
    const toggleMenu = document.querySelector(".toggleMenu");
    const navigation = document.querySelector(".navigation");
    toggleMenu.classList.toggle("active");
    navigation.classList.toggle("active");
}

function toggleAccordion(header) {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

function bookNow() {
    alert('Booking your pet service!');
}

window.addEventListener('scroll', function() {
    document.querySelectorAll('.card').forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight - 100) {
            card.classList.add('show');
        }
    });
});

const toggleSwitch = document.getElementById('input');

// Al cargar la página, aplica modo oscuro si estaba activado
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
});