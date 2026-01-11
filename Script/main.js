/**
 * ==========================================================================
 * MyStrand - Public Homepage Script
 * ==========================================================================
 * This script handles the fade-in-on-scroll animations.
 */

document.addEventListener('DOMContentLoaded', function() {

    const fadeInSections = document.querySelectorAll('.fade-in-section');
    
    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    // The observer callback function
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element once it's visible to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each section
    fadeInSections.forEach(section => {
        if (section) {
            observer.observe(section);
        }
    });

});