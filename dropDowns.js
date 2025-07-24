function showPage(pageId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        setTimeout(() => {
            activeSection.classList.add('active');
        }, 10);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn("Section with ID '" + pageId + "' not found.");
        if (pageId !== 'home' && document.getElementById('home')) {
            showPage('home');
        }
    }
}

function initializeDropdowns() {
    const dropdownContainers = document.querySelectorAll('.dropdown-container');
    dropdownContainers.forEach(container => {
        const link = container.querySelector('.nav-link');
        const menu = container.querySelector('.dropdown-menu');
        if (link && menu) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                document.querySelectorAll('.dropdown-menu.active-dropdown').forEach(openMenu => {
                    if (openMenu !== menu) {
                        openMenu.classList.remove('active-dropdown');
                    }
                });
                menu.classList.toggle('active-dropdown');
            });
        }
    });
    document.addEventListener('click', function(event) {
        dropdownContainers.forEach(container => {
            if (!container.contains(event.target)) {
                const menu = container.querySelector('.dropdown-menu');
                if (menu) {
                    menu.classList.remove('active-dropdown');
                }
            }
        });
    });
}