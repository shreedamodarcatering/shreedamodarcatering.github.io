document.addEventListener('DOMContentLoaded', () => {

    /* ============ GALLERY DATA ============ */
    // type: 'image' | 'video' — cat: buffet | veg | nonveg | videos | starters | others
    const d = n => `images/gallery/display/${n}.jpg`;
    const f = n => `images/gallery/food/${n}.jpg`;

    const galleryItems = [
        // Buffet setups
        { type: 'image', src: d(1),  cat: 'buffet',   alt: 'Elegant buffet counter setup' },
        { type: 'image', src: d(2),  cat: 'buffet',   alt: 'Buffet line with chafing dishes' },
        { type: 'image', src: d(3),  cat: 'buffet',   alt: 'Buffet counter with deity decor' },
        { type: 'image', src: d(4),  cat: 'buffet',   alt: 'Decorated buffet counter with florals' },
        { type: 'image', src: d(5),  cat: 'buffet',   alt: 'Colorful illuminated buffet counter' },
        { type: 'image', src: d(6),  cat: 'buffet',   alt: 'Illuminated buffet counter with flower vases' },
        { type: 'image', src: d(7),  cat: 'buffet',   alt: 'Buffet counter with greenery decor' },
        { type: 'image', src: d(8),  cat: 'buffet',   alt: 'Long buffet counter with cutlery' },
        { type: 'image', src: d(9),  cat: 'buffet',   alt: 'Warm-lit buffet counter' },
        { type: 'image', src: d(10), cat: 'buffet',   alt: 'Banquet hall buffet setup' },
        { type: 'image', src: d(11), cat: 'buffet',   alt: 'Outdoor evening buffet setup' },
        { type: 'image', src: d(12), cat: 'buffet',   alt: 'Hall with buffet counters' },
        { type: 'image', src: f(20), cat: 'buffet',   alt: 'Buffet spread with salads' },
        // Veg food
        { type: 'image', src: f(1),  cat: 'veg',      alt: 'Fried rice in copper handi' },
        { type: 'image', src: f(7),  cat: 'veg',      alt: 'Pulao in chafing dish' },
        { type: 'image', src: f(8),  cat: 'veg',      alt: 'Mushroom masala' },
        { type: 'image', src: f(10), cat: 'veg',      alt: 'Masala rice in large pot' },
        { type: 'image', src: f(17), cat: 'veg',      alt: 'Rice preparation' },
        { type: 'image', src: f(24), cat: 'veg',      alt: 'Traditional dal' },
        { type: 'image', src: f(31), cat: 'veg',      alt: 'Idli with chutney' },
        // Non-veg food
        { type: 'image', src: f(2),  cat: 'nonveg',   alt: 'Chicken cafreal in copper handi' },
        { type: 'image', src: f(3),  cat: 'nonveg',   alt: 'Khube in copper handi' },
        { type: 'image', src: f(9),  cat: 'nonveg',   alt: 'Fried prawns' },
        { type: 'image', src: f(11), cat: 'nonveg',   alt: 'Curry on traditional burner' },
        { type: 'image', src: f(19), cat: 'nonveg',   alt: 'Kebab skewers plated' },
        { type: 'image', src: f(21), cat: 'nonveg',   alt: 'Dry masala specialty' },
        { type: 'image', src: f(27), cat: 'nonveg',   alt: 'Festive biryani' },
        // Videos
        { type: 'video', src: 'videos/buffet-display1.webm', cat: 'videos', alt: 'Buffet display video' },
        // Starters
        { type: 'image', src: f(4),  cat: 'starters', alt: 'Canape platter' },
        { type: 'image', src: f(12), cat: 'starters', alt: 'Crumb-fried drumsticks platter' },
        { type: 'image', src: f(14), cat: 'starters', alt: 'Spicy fried snack' },
        { type: 'image', src: f(15), cat: 'starters', alt: 'Fried specialties platter' },
        { type: 'image', src: f(22), cat: 'starters', alt: 'Fried specialty in chafing dish' },
        { type: 'image', src: f(29), cat: 'starters', alt: 'Chinese bhel' },
        { type: 'image', src: f(30), cat: 'starters', alt: 'Cutlet platter' },
        { type: 'image', src: f(32), cat: 'starters', alt: 'Rava fried platter' },
        // Desserts
        { type: 'image', src: f(6),  cat: 'desserts', alt: 'Dessert cups tray' },
        { type: 'image', src: f(13), cat: 'desserts', alt: 'Fresh jalebi being prepared' },
        { type: 'image', src: f(25), cat: 'desserts', alt: 'Caramel pudding' },
        { type: 'image', src: f(26), cat: 'desserts', alt: 'Kids party dessert plate' },
        // Others
        { type: 'image', src: f(5),  cat: 'others',   alt: 'Mini naan platter' },
        { type: 'image', src: f(16), cat: 'others',   alt: 'Papad basket' },
        { type: 'image', src: f(18), cat: 'others',   alt: 'Plated meal' },
        { type: 'image', src: f(23), cat: 'others',   alt: 'Decorated paan platter' },
        { type: 'image', src: f(28), cat: 'others',   alt: 'Papad platter' }
    ];

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

    /* ============ GALLERY ============ */
    const grid = document.getElementById('gallery-grid');
    const paginationEl = document.getElementById('gallery-pagination');
    const CATS = ['buffet', 'veg', 'nonveg', 'videos', 'starters', 'desserts', 'others'];

    // Responsive: 2 cols / 10 per page on small, 3 cols / 15 on medium, 4 cols / 20 on large
    const bpSmall = window.matchMedia('(max-width: 720px)');
    const bpMedium = window.matchMedia('(max-width: 1024px)');
    const gridCols = () => bpSmall.matches ? 2 : (bpMedium.matches ? 3 : 4);
    const perPage = () => bpSmall.matches ? 10 : (bpMedium.matches ? 15 : 20);

    // "All" = one row from each section in rotation, repeated until exhausted
    const allListCache = {};
    function buildAllList(row) {
        if (allListCache[row]) return allListCache[row];
        const buckets = CATS.map(c => galleryItems.filter(i => i.cat === c));
        const out = [];
        while (buckets.some(b => b.length)) {
            buckets.forEach(b => out.push(...b.splice(0, row)));
        }
        return (allListCache[row] = out);
    }

    let currentFilter = 'all';
    let currentPage = 1;
    let currentList = [];

    function makeTile(item, pos) {
        const el = document.createElement('div');
        el.className = 'gallery-item';
        if (item.type === 'video') {
            el.innerHTML = `
                <video muted loop autoplay playsinline preload="metadata" poster="images/gallery/video-thumbnail1.jpg">
                    <source src="${item.src}" type="video/webm">
                </video>`;
        } else {
            el.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy">`;
        }
        el.addEventListener('click', () => openLightbox(pos));
        return el;
    }

    function renderGallery() {
        currentList = currentFilter === 'all'
            ? buildAllList(gridCols())
            : galleryItems.filter(i => i.cat === currentFilter);

        const pageSize = perPage();
        const totalPages = Math.max(1, Math.ceil(currentList.length / pageSize));
        currentPage = Math.min(Math.max(1, currentPage), totalPages);

        grid.innerHTML = '';
        const start = (currentPage - 1) * pageSize;
        currentList.slice(start, start + pageSize)
            .forEach((item, i) => grid.appendChild(makeTile(item, start + i)));

        renderPagination(totalPages);
    }

    bpSmall.addEventListener('change', renderGallery);
    bpMedium.addEventListener('change', renderGallery);

    function renderPagination(totalPages) {
        paginationEl.innerHTML = '';
        if (totalPages < 2) return;

        const btn = (label, page, opts = {}) => {
            const b = document.createElement('button');
            b.className = 'page-btn' + (opts.active ? ' active' : '');
            b.innerHTML = label;
            b.disabled = !!opts.disabled;
            b.setAttribute('aria-label', opts.aria || `Page ${page}`);
            b.addEventListener('click', () => {
                currentPage = page;
                renderGallery();
                document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
            });
            return b;
        };

        paginationEl.appendChild(btn('‹', currentPage - 1, { disabled: currentPage === 1, aria: 'Previous page' }));
        for (let p = 1; p <= totalPages; p++) {
            paginationEl.appendChild(btn(p, p, { active: p === currentPage }));
        }
        paginationEl.appendChild(btn('›', currentPage + 1, { disabled: currentPage === totalPages, aria: 'Next page' }));
    }

    /* ============ GALLERY FILTERS ============ */
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.dataset.filter;
            currentPage = 1;
            renderGallery();
        });
    });

    renderGallery();

    /* ============ LIGHTBOX ============ */
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    let currentPos = 0; // position within currentList

    function renderLightbox() {
        const item = currentList[currentPos];
        lightboxContent.innerHTML = item.type === 'video'
            ? `<video src="${item.src}" controls autoplay loop playsinline></video>`
            : `<img src="${item.src}" alt="${item.alt}">`;
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
        currentPos = (currentPos + dir + currentList.length) % currentList.length;
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

    /* ============ CONTACT FORM ============ */
    document.getElementById('contact-form').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('cf-name').value;
        const phone = document.getElementById('cf-phone').value;
        const type = document.getElementById('cf-type').value;
        const guests = document.getElementById('cf-guests').value;
        const message = document.getElementById('cf-message').value;

        const body = `Name: ${name}%0D%0APhone: ${phone}%0D%0AEvent Type: ${type}%0D%0AGuest Count: ${guests}%0D%0A%0D%0A${encodeURIComponent(message)}`;
        window.location.href = `mailto:info@shreedamodarcatering.com?subject=${encodeURIComponent('Catering Inquiry — ' + type)}&body=${body}`;
    });

    /* ============ FOOTER YEAR ============ */
    document.getElementById('year').textContent = new Date().getFullYear();
});
