document.addEventListener('DOMContentLoaded', () => {

    /* ============ NAV ============ */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Transparent at top → white as soon as the page is scrolled
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    navToggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('active');
        navToggle.innerHTML = open ? '✕' : '☰';
        navToggle.setAttribute('aria-expanded', open);
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '☰';
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ============ GALLERY CAROUSEL ============ */
    const slides = [
        { src: 'images/gallery/display/4.jpg',  alt: 'Decorated buffet counter with florals' },
        { src: 'images/gallery/display/6.jpg',  alt: 'Illuminated buffet counter with flower vases' },
        { src: 'images/gallery/food/23.jpg',    alt: 'Decorated paan platter' },
        { src: 'images/gallery/display/11.jpg', alt: 'Outdoor evening buffet setup' },
        { src: 'images/gallery/food/8.jpg',     alt: 'Mushroom masala' },
        { src: 'images/gallery/display/2.jpg',  alt: 'Buffet line with chafing dishes' },
        { src: 'images/gallery/display/5.jpg',  alt: 'Colorful illuminated buffet counter' },
        { src: 'images/gallery/food/27.jpg',    alt: 'Festive biryani' },
        { src: 'images/gallery/food/13.jpg',    alt: 'Fresh jalebi being prepared' },
        { src: 'images/gallery/display/9.jpg',  alt: 'Warm-lit buffet counter' }
    ];

    const track = document.getElementById('carousel-track');
    const dotsEl = document.getElementById('carousel-dots');
    let slideIndex = 0;

    slides.forEach((s, i) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${s.src}" alt="${s.alt}" ${i ? 'loading="lazy"' : ''}>`;
        slide.addEventListener('click', () => openLightbox(i));
        track.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.innerHTML = '<span class="dot-fill"></span>';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
    });

    function goTo(i) {
        slideIndex = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
        dotsEl.querySelectorAll('.carousel-dot').forEach((d, k) =>
            d.classList.toggle('active', k === slideIndex));
    }

    // The active dot's progress bar drives the auto-advance:
    // when its fill animation completes, move to the next slide.
    dotsEl.addEventListener('animationend', e => {
        if (e.animationName === 'dot-progress') goTo(slideIndex + 1);
    });

    document.getElementById('carousel-prev').addEventListener('click', () => goTo(slideIndex - 1));
    document.getElementById('carousel-next').addEventListener('click', () => goTo(slideIndex + 1));

    // Swipe support
    const carousel = document.getElementById('carousel');
    let touchX = null;
    carousel.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) goTo(slideIndex + (dx < 0 ? 1 : -1));
        touchX = null;
    }, { passive: true });

    goTo(0);

    /* ============ LIGHTBOX ============ */
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    let currentPos = 0;

    function renderLightbox() {
        const item = slides[currentPos];
        lightboxContent.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
    }

    function openLightbox(pos) {
        currentPos = pos;
        renderLightbox();
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxContent.innerHTML = '';
        document.body.classList.remove('no-scroll');
    }

    function step(dir) {
        currentPos = (currentPos + dir + slides.length) % slides.length;
        renderLightbox();
    }

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', e => { e.stopPropagation(); step(-1); });
    document.getElementById('lightbox-next').addEventListener('click', e => { e.stopPropagation(); step(1); });
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
    });

    /* ============ CONTACT FORM (FormSubmit) ============ */
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('cf-submit');
    const statusEl = document.getElementById('form-status');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusEl.className = 'form-status';
        statusEl.textContent = '';

        const data = Object.fromEntries(new FormData(form));
        data._subject = 'New Catering Inquiry — ' + data.event_type;
        data._template = 'table';
        data._captcha = 'false';

        try {
            const res = await fetch('https://formsubmit.co/ajax/damodarcatering@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (!res.ok || json.success === 'false' || json.success === false) throw new Error(json.message);
            statusEl.classList.add('success');
            statusEl.textContent = 'Thank you! Your inquiry has been sent — we\'ll get back to you soon.';
            form.reset();
        } catch (err) {
            statusEl.classList.add('error');
            statusEl.textContent = 'Something went wrong. Please call or WhatsApp us directly.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Inquiry';
        }
    });

    /* ============ FOOTER YEAR ============ */
    document.getElementById('year').textContent = new Date().getFullYear();
});
