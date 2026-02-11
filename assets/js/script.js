// ============================================
// Set Dark Mode by Default
// ============================================
const body = document.body;
body.classList.add('dark-mode');

// ============================================
// Navigation Toggle
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
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

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Add fade-in class to sections
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    if (index > 0) { // Skip hero section
        section.classList.add('fade-in');
        observer.observe(section);
    }
});

// ============================================
// Animated Counter for Stats
// ============================================
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            animateCounter(statNumber, target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ============================================
// Back to Top Button
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Form Handling
// ============================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    console.log('Form submitted:', data);

    // Show success message (you can customize this)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ============================================
// Parallax Effect for Hero Background
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// Project Card Hover Effects
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// Skill Tag Animation on Scroll
// ============================================
const skillTags = document.querySelectorAll('.skill-tag');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

skillTags.forEach(tag => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    tag.style.transition = 'all 0.3s ease';
    skillObserver.observe(tag);
});

// ============================================
// Typing Effect for Hero Title (Optional)
// ============================================
const typingEffect = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
};

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-title .line-2');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typingEffect(heroTitle, originalText, 100);
// }

// ============================================
// Cursor Trail Effect (Optional Enhancement)
// ============================================
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
});

// ============================================
// Active Section Highlighting
// ============================================
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// ============================================
// Add active class styling in CSS
// ============================================
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ============================================
// Binary Name Animation
// ============================================
function getRandomBinary(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 2)).join('');
}

function createBinaryName() {
    const binaryNameEl = document.getElementById('binary-name');
    if (!binaryNameEl) return;

    // Ensure text is visible immediately
    const actualName = binaryNameEl.getAttribute('data-name');
    binaryNameEl.textContent = actualName;
    binaryNameEl.style.opacity = '1';

    const possibleChars = "01";

    // Simple function to run the decode effect
    const runDecodeEffect = () => {
        let iterations = 0;
        const interval = setInterval(() => {
            binaryNameEl.textContent = actualName
                .split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return actualName[index];
                    }
                    return possibleChars[Math.floor(Math.random() * possibleChars.length)];
                })
                .join("");

            if (iterations >= actualName.length) {
                clearInterval(interval);
                binaryNameEl.textContent = actualName;
            }

            iterations += 1; // Faster decoding (1 char per tick)
        }, 50);
    };

    // Run immediately after a short delay
    setTimeout(runDecodeEffect, 500);

    // Rerun on hover
    binaryNameEl.addEventListener('mouseenter', runDecodeEffect);
}

// ============================================
// Binary Background Animation
// ============================================
function generateBinaryBackground() {
    const binaryBg = document.getElementById('binary-background');
    if (!binaryBg) return;

    const columns = 20;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'binary-column';
        column.style.left = `${(i * (100 / columns))}%`;
        column.style.animationDelay = `${i * 0.3}s`;
        column.style.animationDuration = `${8 + Math.random() * 4}s`;

        const digitsCount = 40;
        for (let j = 0; j < digitsCount; j++) {
            const digit = document.createElement('div');
            digit.className = 'binary-digit';
            digit.textContent = '';
            digit.style.animationDelay = `${j * 0.1}s`;
            digit.style.opacity = '0';
            column.appendChild(digit);
        }

        fragment.appendChild(column);
    }

    binaryBg.appendChild(fragment);

    // Animate binary digits appearing with typing effect
    const digits = binaryBg.querySelectorAll('.binary-digit');
    let digitIndex = 0;

    function animateDigits() {
        if (digitIndex < digits.length) {
            const digit = digits[digitIndex];
            digit.textContent = Math.floor(Math.random() * 2);
            digit.style.opacity = '0.8';
            digit.style.transition = 'opacity 0.3s ease';
            digitIndex++;
            setTimeout(animateDigits, 2);
        } else {
            // After all digits appear, start random flickering
            setInterval(() => {
                digits.forEach(digit => {
                    if (Math.random() > 0.85) {
                        digit.textContent = Math.floor(Math.random() * 2);
                    }
                });
            }, 200);
        }
    }

    // Start animation after a short delay
    setTimeout(() => {
        animateDigits();
    }, 300);
}

// ============================================
// Initialize on Load
// ============================================
window.addEventListener('load', () => {
    createBinaryName();
    generateBinaryBackground();
    console.log('Portfolio website loaded successfully!');
});

