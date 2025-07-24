function initializeSlideshow() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const slideshowContainer = homeSection.querySelector('.slideshow-container');
    if (!slideshowContainer) return;

    let currentSlideIdx = 0;
    const slides = slideshowContainer.querySelectorAll('.slide');
    const dots = slideshowContainer.querySelectorAll('.dots-navigation-container .dot');
    const slideInterval = 4000;
    let slideshowTimer;

    function displaySlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove('active-slide');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        if (slides[index]) {
            slides[index].classList.add('active-slide');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        currentSlideIdx = index;
    }

    function nextSlide() {
        currentSlideIdx = (currentSlideIdx + 1) % slides.length;
        displaySlide(currentSlideIdx);
    }

    function startSlideshow() {
        stopSlideshow();
        if (slides.length > 0) {
            displaySlide(currentSlideIdx);
            slideshowTimer = setInterval(nextSlide, slideInterval);
        }
    }

    function stopSlideshow() {
        clearInterval(slideshowTimer);
    }

    if (slides.length > 0 && dots.length > 0 && slides.length === dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                displaySlide(index);
                stopSlideshow();
            });
        });

        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);

        startSlideshow();
    } else {
        if (slides.length === 0) {
            console.warn("Slideshow: No slides found.");
        }
        if (dots.length === 0 && slides.length > 0) {
            console.warn("Slideshow: No dots found for navigation.");
        }
        if (slides.length > 0 && dots.length > 0 && slides.length !== dots.length) {
            console.warn("Slideshow error: Number of slides and dots do not match.");
        }
    }
}
