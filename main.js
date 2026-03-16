document.addEventListener('DOMContentLoaded', () => {
    // Sound toggle for promo video
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
        const video = soundBtn.closest('.phone-mockup').querySelector('.phone-video');
        const iconOff = document.getElementById('sound-icon-off');
        const iconOn = document.getElementById('sound-icon-on');
        soundBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            iconOff.style.display = video.muted ? '' : 'none';
            iconOn.style.display = video.muted ? 'none' : '';
        });
    }

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

    // Exclude .mode-card and .gallery-card: on mobile they're in scroll containers
    // where IntersectionObserver is unreliable, causing cards to stay invisible.
    document.querySelectorAll('.insight-text, .insight-visual, .feature-item, .section-title, .section-subtitle, .roadmap-item, .notify-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
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
    setupCarousel('roadmap-track', 'roadmap-prev', 'roadmap-next');

    // Gallery dots
    const galleryTrack = document.getElementById('gallery-track');
    const dots = document.querySelectorAll('.gallery-dot');

    if (galleryTrack && dots.length) {
        galleryTrack.addEventListener('scroll', () => {
            const cards = galleryTrack.querySelectorAll('.gallery-card');
            const scrollLeft = galleryTrack.scrollLeft;
            const cardWidth = cards[0]?.offsetWidth + 16; // width + gap
            const activeIndex = Math.round(scrollLeft / cardWidth);
            dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const cards = galleryTrack.querySelectorAll('.gallery-card');
                const index = parseInt(dot.dataset.index);
                const cardWidth = cards[0]?.offsetWidth + 16;
                galleryTrack.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
            });
        });
    }

    console.log('HearoPilot Landing Page Loaded');

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

function handleNotify(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('.notify-input');
    const btn = form.querySelector('button[type="submit"]');
    // In production, replace this with a real API call (e.g. Mailchimp, ConvertKit, etc.)
    btn.textContent = '✓ You\'re on the list!';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    input.disabled = true;
    input.value = '';
    input.placeholder = 'Thanks! We\'ll be in touch.';
}
