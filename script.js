/**
 * NAHMA FATHIMA - PORTFOLIO JAVASCRIPT ENGINE (PURPLE & BLUE EDITION)
 * High-performance interactive modules:
 * 1. Cyber Mesh Interactive Dynamic Canvas
 * 2. Custom Glowing Dual-Layer Pointer & Cursor
 * 3. Typewriter Role Switcher (Computer Science & AI, Fine Art)
 * 4. Sci-Fi Web Audio Synthesizer (Micro-Interactions & Mute Toggle)
 * 5. Navigation Scroll Spy & Mobile Drawer
 * 6. Skills Category Interactive Filtering
 * 7. 3D Card Tilt & Perspective Physics
 * 8. Art Gallery Lightbox Modal (Click-to-Enlarge Preview)
 * 9. Back to Top Smooth Scroll
 * 10. Dynamic Year Utility
 */

document.addEventListener('DOMContentLoaded', () => {
    initCyberCanvas();
    initCustomCursor();
    initTypewriter();
    initSciFiAudio();
    initNavbarScroll();
    initScrollSpy();
    initMobileNav();
    initSkillsFilter();
    init3DCardTilt();
    initGalleryLightbox();
    initBackToTop();
    updateYear();
});

/* --------------------------------------------------------------------------
   1. Cyber Mesh Interactive Canvas
   -------------------------------------------------------------------------- */
function initCyberCanvas() {
    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 16000), 80);
    const connectionDistance = 140;

    const mouse = {
        x: null,
        y: null,
        radius: 170
    };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.8;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.isCyan = Math.random() > 0.4;
            this.color = this.isCyan ? 'rgba(0, 240, 255, ' : 'rgba(168, 85, 247, ';
            this.alpha = Math.random() * 0.6 + 0.25;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse gentle repulsion
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 3;
                    this.y -= Math.sin(angle) * force * 3;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.isCyan ? '#00f0ff' : '#a855f7';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const opacity = (1 - dist / connectionDistance) * 0.22;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
                    ctx.lineWidth = 0.75;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   2. Custom Glowing Pointer & Cursor
   -------------------------------------------------------------------------- */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const glow = document.getElementById('cursor-glow');
    if (!dot || !glow) return;

    let mouseX = -100;
    let mouseY = -100;
    let glowX = -100;
    let glowY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    function renderGlow() {
        glowX += (mouseX - glowX) * 0.16;
        glowY += (mouseY - glowY) * 0.16;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        requestAnimationFrame(renderGlow);
    }
    renderGlow();

    // Hover effect over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .glass-card');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            glow.style.width = '60px';
            glow.style.height = '60px';
            glow.style.borderColor = 'rgba(168, 85, 247, 0.7)';
            glow.style.boxShadow = '0 0 22px rgba(168, 85, 247, 0.45)';
        });
        el.addEventListener('mouseleave', () => {
            glow.style.width = '42px';
            glow.style.height = '42px';
            glow.style.borderColor = 'rgba(0, 240, 255, 0.4)';
            glow.style.boxShadow = 'none';
        });
    });
}

/* --------------------------------------------------------------------------
   3. Typewriter Role Switcher
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const dynamicRole = document.getElementById('dynamic-role');
    if (!dynamicRole) return;

    const roles = [
        'Computer Science & AI',
        'B.Tech Student at NIAT',
        'Python & Systems Programming',
        'Drawing, Painting & Fine Art',
        'Robotics & Technology Innovation'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 85;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            dynamicRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            dynamicRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2300; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   4. Sci-Fi Web Audio Synthesizer (Micro-Interactions)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function playUiTone(freq = 880, type = 'sine', duration = 0.08, vol = 0.05) {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // AudioContext not allowed before user gesture
    }
}

function initSciFiAudio() {
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');

    if (audioToggle && audioIcon) {
        audioToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                audioToggle.classList.remove('muted');
                audioIcon.className = 'fa-solid fa-volume-high';
                playUiTone(980, 'triangle', 0.12, 0.08);
            } else {
                audioToggle.classList.add('muted');
                audioIcon.className = 'fa-solid fa-volume-xmark';
            }
        });
    }

    // Attach subtle tone to buttons & links
    const clickables = document.querySelectorAll('.btn, .nav-link, .skill-tab-btn, .social-btn');
    clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => playUiTone(620, 'sine', 0.04, 0.02));
        el.addEventListener('click', () => playUiTone(1050, 'triangle', 0.09, 0.04));
    });
}

/* --------------------------------------------------------------------------
   5. Navbar Scroll & Active Scroll Spy
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.style.top = '0.5rem';
        } else {
            navbar.style.top = '1.25rem';
        }
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 140;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   6. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('mobile-open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
        });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
        }
    });
}

/* --------------------------------------------------------------------------
   7. Skills Category Filter
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
    const tabBtns = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            skillCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   8. Interactive 3D Card Tilt Effect
   -------------------------------------------------------------------------- */
function init3DCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.project-card, .artwork-card, .bento-card, .avatar-card, .contact-cta-card, .education-card, .cert-card');

    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* --------------------------------------------------------------------------
   9. Art Gallery Lightbox Modal (Click-to-Enlarge)
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const backdrop = document.getElementById('lightbox-backdrop');
    const closeBtn = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxSubtitle = document.getElementById('lightbox-subtitle');

    if (!modal || !lightboxImg) return;

    const artworkItems = document.querySelectorAll('.artwork-card');

    artworkItems.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.getAttribute('data-title') || 'Original Artwork';
            const caption = item.getAttribute('data-caption') || 'Physical Drawing / Painting';

            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = title;
            }
            if (lightboxTitle) lightboxTitle.textContent = title;
            if (lightboxSubtitle) lightboxSubtitle.textContent = caption;

            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            playUiTone(880, 'triangle', 0.08, 0.05);
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        playUiTone(440, 'sine', 0.06, 0.04);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* --------------------------------------------------------------------------
   10. Back-to-Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 450) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* --------------------------------------------------------------------------
   11. Dynamic Year Utility
   -------------------------------------------------------------------------- */
function updateYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
