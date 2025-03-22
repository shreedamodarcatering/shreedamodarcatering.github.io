document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '☰';
        });
    });

    // Function to load images for a gallery section
    function loadGalleryImages(gridElement) {
        const category = gridElement.dataset.category;
        const count = parseInt(gridElement.dataset.count);
        
        for(let i = 1; i <= count; i++) {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = `images/gallery/${category}/${i}.jpg`; // Assumes images are named category1.jpg, category2.jpg, etc.
            img.alt = `${category} image ${i}`;
            img.loading = 'lazy';
            
            galleryItem.appendChild(img);
            gridElement.appendChild(galleryItem);
        }
    }

    // Load images for all gallery sections
    document.querySelectorAll('.gallery-grid').forEach(grid => {
        if(grid.dataset.category) { // Only process grids with category data attribute
            loadGalleryImages(grid);
        }
    });
}); 