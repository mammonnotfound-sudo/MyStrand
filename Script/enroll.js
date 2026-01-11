document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enrollment-form');
    const strandSelect = document.getElementById('strand');
    const tvlSection = document.getElementById('tvl-specialization-section');
    const successOverlay = document.getElementById('success-overlay');

    // Show TVL specialization dropdown only when TVL is selected
    strandSelect.addEventListener('change', function() {
        tvlSection.style.display = this.value === 'TVL' ? 'block' : 'none';
    });

    // Handle the form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop the form from submitting the old way

        // 1. Get existing enrollments from localStorage or create an empty array
        const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];

        // 2. Create an object with the new submission data
        const formData = new FormData(form);
        const newSubmission = {};
        for (let [key, value] of formData.entries()) {
            // For file inputs, we just store the name for this simulation
            if (value instanceof File) {
                newSubmission[key] = value.name;
            } else {
                newSubmission[key] = value;
            }
        }
        
        // Add a unique ID and a timestamp
        newSubmission.id = Date.now();
        newSubmission.timestamp = new Date().toLocaleString();

        // 3. Add the new submission to the array
        enrollments.push(newSubmission);

        // 4. Save the updated array back to localStorage
        localStorage.setItem('enrollments', JSON.stringify(enrollments));

        // 5. Show the success message and redirect
        successOverlay.classList.add('visible');

        setTimeout(() => {
            window.location.href = 'thank-you.html'; // Redirect to a thank you page
        }, 2000); // Wait 2 seconds
    });
});