document.addEventListener("DOMContentLoaded", function () {
    // EmailJS Configuration
    const EMAILJS_PUBLIC_KEY = "tI__A7VvS7zrpvdwv";  
    const EMAILJS_SERVICE_ID = "service_x9evrv7";  
    const EMAILJS_TEMPLATE_ID = "template_utauop2"; 

    // Initialize EmailJS
    if (window.emailjs) {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY,
        });
    } else {
        console.error("EmailJS SDK not loaded. Make sure the CDN script tag is included.");
    }

    // Select active form
    const enquiryForm = document.getElementById('enquiry-form');
    const contactForm = document.getElementById('contact-form');
    const activeForm = enquiryForm || contactForm;

    if (!activeForm) return;

    // Display error message
    function showError(inputElement, message) {
        let errorDiv = inputElement.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#d9534f';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '0.3rem';
            inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        }
        inputElement.style.borderColor = '#d9534f';
        errorDiv.textContent = message;
    }

    // Clear error message
    function clearError(inputElement) {
        let errorDiv = inputElement.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
        inputElement.style.borderColor = 'var(--border)';
    }

    // Email format regex check
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    activeForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Stop standard form refresh
        let isValid = true;

        // 1. Validate Name
        const nameInput = document.getElementById('name');
        if (nameInput) {
            const nameValue = nameInput.value.trim();
            if (nameValue === "") {
                showError(nameInput, "Please enter your full name.");
                isValid = false;
            } else if (nameValue.length < 2) {
                showError(nameInput, "Name must be at least 2 characters long.");
                isValid = false;
            } else {
                clearError(nameInput);
            }
        }

        // 2. Validate Email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            const emailValue = emailInput.value.trim();
            if (emailValue === "") {
                showError(emailInput, "Please enter your email address.");
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError(emailInput, "Please enter a valid email address.");
                isValid = false;
            } else {
                clearError(emailInput);
            }
        }

        // 3. Validate Phone (if present on page)
        const phoneInput = document.getElementById('phone');
        if (phoneInput && phoneInput.value.trim() !== "") {
            const phoneValue = phoneInput.value.trim();
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phoneValue)) {
                showError(phoneInput, "Please enter a valid phone number.");
                isValid = false;
            } else {
                clearError(phoneInput);
            }
        }

        // 4. Validate Service Selection (if present on page)
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            if (serviceSelect.value === "") {
                showError(serviceSelect, "Please select a photography service.");
                isValid = false;
            } else {
                clearError(serviceSelect);
            }
        }

        // 5. Validate Date (if present on page)
        const dateInput = document.getElementById('date');
        if (dateInput) {
            if (dateInput.value === "") {
                showError(dateInput, "Please select a preferred date.");
                isValid = false;
            } else {
                clearError(dateInput);
            }
        }

        // 6. Validate Message
        const messageInput = document.getElementById('message');
        if (messageInput) {
            const messageValue = messageInput.value.trim();
            if (messageValue === "") {
                showError(messageInput, "Please enter a message or booking details.");
                isValid = false;
            } else if (messageValue.length < 5) {
                showError(messageInput, "Message must be at least 5 characters long.");
                isValid = false;
            } else {
                clearError(messageInput);
            }
        }

        // Send with EmailJS if all validation passes
        if (isValid) {
            const submitButton = activeForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;

            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, activeForm)
                .then(function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                    alert("Thank you! Your message has been sent successfully to Tkayys Photography.");
                    activeForm.reset();
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, function (error) {
                    console.error("FAILED...", error);
                    alert("Oops! Failed to send message. Please check your internet or try again later.");
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        }
    });
});