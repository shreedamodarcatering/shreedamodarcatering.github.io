document.addEventListener('DOMContentLoaded', () => {

    /* ============ NAV ============ */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

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

    /* ============ MENU TABS ============ */
    const tabs = document.querySelectorAll('#menu-tabs .filter-pill');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            panels.forEach(p => p.classList.toggle('active', p.id === tab.dataset.tab));
        });
    });

    /* ============ FOOTER YEAR ============ */
    document.getElementById('year').textContent = new Date().getFullYear();
});
