const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.problem-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

emailjs.init('3TuN_athIqQt3IZXE');

function capitalizeWords(input) {
    return input.value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const nameInput = document.querySelector('input[name="from_name"]');
if (nameInput) {
    nameInput.addEventListener('blur', function() {
        this.value = capitalizeWords(this);
    });
}

const emailInput = document.querySelector('input[name="reply_to"]');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.setCustomValidity('Molimo unesite ispravnu email adresu');
            this.reportValidity();
        } else {
            this.setCustomValidity('');
        }
    });
}

emailjs.init('3TuN_athIqQt3IZXE');

const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('.btn-submit');
        const status = document.getElementById('formStatus');
        const originalText = btn.textContent;
        const email = this.querySelector('input[name="reply_to"]').value;
        
        // Provjeri email prije slanja
        if (!validateEmail(email)) {
            status.textContent = 'Molimo unesite ispravnu email adresu.';
            status.className = 'form-status error';
            return;
        }
        
        btn.textContent = 'Šalje se...';
        btn.disabled = true;
        status.textContent = '';
        
        emailjs.sendForm('service_f0eln3q', 'template_pjdr7bs', this)
            .then(() => {
                return emailjs.sendForm('service_f0eln3q', 'template_9tu0edl', this);
            })
            .then(() => {
                status.textContent = 'Poruka uspješno poslana!';
                status.className = 'form-status success';
                this.reset();
                
                setTimeout(() => {
                    status.textContent = '';
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 3000);
            })
            .catch((error) => {
                console.log('EmailJS Error:', error);
                status.textContent = 'Greška prilikom slanja. Pokušajte ponovo.';
                status.className = 'form-status error';
                btn.textContent = originalText;
                btn.disabled = false;
            });
    });
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
