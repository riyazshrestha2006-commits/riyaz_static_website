document.addEventListener('DOMContentLoaded', () => {

    /* ==================================
       Sticky Navigation
    ================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==================================
       Mobile Menu Toggle
    ================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('toggle');
            }
        });
    });

    /* ==================================
       Typewriter Effect
    ================================== */
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const words = ["BIT Student", "Frontend Developer", "UI/UX Designer", "Problem Solver"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 75; // delete faster
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; // type normal
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1500; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before starting next word
            }

            setTimeout(type, typeSpeed);
        }

        // Initialize typewriter animation
        typewriterEl.textContent = '';
        setTimeout(type, 1000);
    }

    /* ==================================
       Scroll Reveal Animation
    ================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // stop observing once revealed to avoid flashing
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==================================
       Form Submission Submission (FormSubmit.co API)
    ================================== */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            const nameVal = document.getElementById('name').value;
            const emailVal = document.getElementById('email').value;
            const messageVal = document.getElementById('message').value;

            // UX logic for sending state
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Detect if running on local file system (browsers block AJAX on file:// protocol)
            if (window.location.protocol === 'file:') {
                btn.textContent = 'Error: Use your live website to send!';
                btn.style.background = '#ef4444'; // Error red
                btn.style.opacity = '1';
                
                console.warn('FormSubmit AJAX submissions are blocked on the file:// protocol. Please test on your live website or a local server.');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
                return;
            }

            // Real AJAX submission via FormSubmit
            fetch("https://formsubmit.co/ajax/riyazshrestha2006@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: nameVal,
                    email: emailVal,
                    message: messageVal
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    btn.textContent = 'Message Sent Successfully!';
                    btn.style.background = '#10b981'; // Success green
                    btn.style.opacity = '1';
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                btn.textContent = 'Error sending message. Try again!';
                btn.style.background = '#ef4444'; // Error red
                btn.style.opacity = '1';
                console.error('FormSubmit Error:', error);
            })
            .finally(() => {
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

});
