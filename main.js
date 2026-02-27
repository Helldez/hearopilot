document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.mode-card, .insight-text, .insight-visual, .gallery-card, .feature-badge, .section-title, .section-subtitle').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Dynamic Navbar Background
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 5, 16, 0.95)';
            nav.style.padding = '0.8rem 0';
        } else {
            nav.style.background = 'rgba(5, 5, 16, 0.8)';
            nav.style.padding = '1rem 0';
        }
    });

    // Carousel logic
    function setupCarousel(trackId, prevId, nextId) {
        const track = document.getElementById(trackId);
        const prev = document.getElementById(prevId);
        const next = document.getElementById(nextId);

        if (!track || !prev || !next) return;

        function updateButtons() {
            const scrollLeft = track.scrollLeft;
            const scrollWidth = track.scrollWidth;
            const clientWidth = track.clientWidth;

            // Show arrows only if content overflows
            if (scrollWidth > clientWidth) {
                // Show/hide prev
                if (scrollLeft > 10) {
                    prev.classList.add('visible');
                } else {
                    prev.classList.remove('visible');
                }

                // Show/hide next
                if (scrollLeft + clientWidth < scrollWidth - 10) {
                    next.classList.add('visible');
                } else {
                    next.classList.remove('visible');
                }
            } else {
                prev.classList.remove('visible');
                next.classList.remove('visible');
            }
        }

        const scrollAmount = 350;

        next.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prev.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        // Listen for scroll and resize
        track.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);

        // Initial check
        setTimeout(updateButtons, 500); // Wait for animations/rendering
    }

    setupCarousel('modes-track', 'modes-prev', 'modes-next');
    setupCarousel('why-track', 'why-prev', 'why-next');
    setupCarousel('gallery-track', 'gallery-prev', 'gallery-next');

    console.log('HearoPilot Landing Page Loaded');
});
