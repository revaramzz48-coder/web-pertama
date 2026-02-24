document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       1. SCROLL PROGRESS BAR
    ───────────────────────────────────────── */
    const progressBar = document.getElementById('scroll-progress');
    const scrollContainer = document.querySelector('.scroll-container');

    function updateProgress() {
        const scrolled = scrollContainer.scrollTop;
        const total = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const pct = total > 0 ? (scrolled / total) * 100 : 0;
        if (progressBar) progressBar.style.width = pct + '%';
    }

    scrollContainer.addEventListener('scroll', updateProgress, { passive: true });

    /* ─────────────────────────────────────────
       2. FLOATING NAV – ACTIVE SECTION
    ───────────────────────────────────────── */
    const navLinks = document.querySelectorAll('.floating-nav a');
    const sections = document.querySelectorAll('section[id]');

    function updateNav() {
        const scrollMid = scrollContainer.scrollTop + scrollContainer.clientHeight / 2;
        let current = '';
        sections.forEach(sec => {
            if (sec.offsetTop <= scrollMid) current = sec.id;
        });
        navLinks.forEach(a => {
            a.classList.toggle('nav-active', a.getAttribute('href') === '#' + current);
        });
    }

    scrollContainer.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    /* ─────────────────────────────────────────
       3. REVEAL ANIMATIONS ON SCROLL
    ───────────────────────────────────────── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px', root: scrollContainer });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

    /* ─────────────────────────────────────────
       4. SECTION ACTIVE CLASS (existing logic)
    ───────────────────────────────────────── */
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.id === 'about') animateSkills();
            }
        });
    }, { threshold: 0.2, root: scrollContainer });

    sections.forEach(s => sectionObserver.observe(s));

    /* ─────────────────────────────────────────
       5. SKILL BAR ANIMATION
    ───────────────────────────────────────── */
    const skills = {
        'bar-python': '40%',
        'bar-html5': '85%',
        'bar-css3-alt': '80%',
        'bar-js': '45%',
        'bar-figma': '60%',
        'bar-flutter': '35%',
        'bar-youtube': '90%',
        'bar-code': '95%'
    };

    let skillsAnimated = false;
    function animateSkills() {
        if (skillsAnimated) return;
        skillsAnimated = true;
        Object.entries(skills).forEach(([cls, w], i) => {
            const bar = document.querySelector(`.${cls}`);
            if (bar) setTimeout(() => { bar.style.width = w; }, 200 + i * 80);
        });
    }

    /* ─────────────────────────────────────────
       6. SMOOTH ANCHOR SCROLLING
    ───────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target && scrollContainer) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ─────────────────────────────────────────
       7. HOBBY CARDS – STAGGER ON SCROLL
    ───────────────────────────────────────── */
    const hobbyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.hobby-item').forEach((item, i) => {
                    setTimeout(() => item.classList.add('hobby-visible'), i * 100);
                });
                hobbyObserver.disconnect();
            }
        });
    }, { threshold: 0.1, root: scrollContainer });

    const hobbySection = document.querySelector('#hobby');
    if (hobbySection) hobbyObserver.observe(hobbySection);

    /* ─────────────────────────────────────────
       8. SERVICE CARDS – STAGGER ON SCROLL
    ───────────────────────────────────────── */
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.service-card').forEach((card, i) => {
                    setTimeout(() => card.classList.add('service-visible'), i * 120);
                });
                serviceObserver.disconnect();
            }
        });
    }, { threshold: 0.1, root: scrollContainer });

    const serviceSection = document.querySelector('#service');
    if (serviceSection) serviceObserver.observe(serviceSection);

    /* ─────────────────────────────────────────
       9. CONTACT ITEMS – STAGGER ON SCROLL
    ───────────────────────────────────────── */
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.contact-item').forEach((item, i) => {
                    setTimeout(() => item.classList.add('contact-visible'), i * 110);
                });
                contactObserver.disconnect();
            }
        });
    }, { threshold: 0.1, root: scrollContainer });

    const contactSection = document.querySelector('#contact');
    if (contactSection) contactObserver.observe(contactSection);

    /* ─────────────────────────────────────────
       10. HOME HERO – ENTRANCE ANIMATION
    ───────────────────────────────────────── */
    setTimeout(() => {
        document.querySelector('.profil-image-container')?.classList.add('hero-in');
        document.querySelector('.text-content')?.classList.add('hero-in');
    }, 100);

});