/**
 * ==========================================================================
 * MyStrand - E-Library JavaScript (Definitive Final Version)
 * ==========================================================================
 * Updated to fix:
 * 1. Video Category Filtering (changed 'Video' to 'Videos')
 * 2. Aspect Ratio / Styling issues (robust check for video items)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- DATA SOURCE ---
    const entertainmentItems = [
        // FIXED: Changed category from 'Video' to 'Videos' to match your filter button
        { id: 'm1', title: 'COC 3: Set-up Computer Servers', category: 'Videos', description: 'Video By: Sir Paul', coverImg: '/cover/yourname.jpg', video: 'https://youtu.be/qTyMqqB8grU?si=Kyu29t7J9IyF_WPF4', captions: '' },
        { id: 'm2', title: 'Introduction to Media and Information Literacy Lesson 1', category: 'Videos', description: 'Video By: TeacherKat', coverImg: '/cover/kat.jpg', video: 'https://youtu.be/h5Eb5rtfa0w?si=hkMKfQi9Yi3TbW5a', captions: '' },
        { id: 'm3', title: 'G-11 Gen Math 1st Quarter: Functions', category: 'Videos', description: 'Video By: WOW MATH', coverImg: '/cover/hq720.jpg', video: 'https://youtu.be/-Pr3NoB9S9k?si=zVHS9bw7a515lq4C', captions: '' },
        { id: 'm4', title: 'SHS EARTH SCIENCE Q1: Characteristics', category: 'Videos', description: 'Video By: DepEd TV Official', coverImg: '/cover/shs.jpg', video: 'https://youtu.be/9DNCJtXNX_Y?si=XffFW-2nJpgDmPRT', captions: '' },

        { id: 'mu1', title: 'Blinding Lights', category: 'Music', description: 'By The Weeknd', coverImg: '/cover/blind.jpg', audio: '/music/blinding.mp3' },
        { id: 'mu2', title: 'Opalite', category: 'Music', description: 'By Taylor Swift', coverImg: 'cover/taylor.jpg', audio: '/music/opalite.mp3' },
        { id: 'mu3', title: 'Usseewa', category: 'Music', description: 'By Ado', coverImg: 'cover/ado.png', audio: '/music/usseewa.mp3' },
        { id: 'mu4', title: 'Popular', category: 'Music', description: 'By Ariana Grande', coverImg: 'cover/popular.png', audio: '/music/popular.mp3' },

        { id: 'b1', title: 'Web Development Guide', category: 'Books', description: ' How to build websites, starting with core technologies like HTML (structure), CSS (styling), and JavaScript (interactivity) for the front-end, often extending to back-end concepts (servers, databases, frameworks like Django/Spring) and essential tools (version control, text editors).', coverImg: '/cover/web.jpg', link: '/ebook/web.pdf' },
        { id: 'b2', title: 'The Complete Guide to Drawing Manga & Anime', category: 'Books', description: 'a comprehensive, 13-week art course designed to teach beginners how to draw manga and anime characters through 65 structured, daily lessons covering bodies, faces, clothes, and movement, suitable for both traditional and digital artists.', coverImg: '/cover/complete-guide-to-drawing-manga-anime.jpg', link: '/ebook/drawing.pdf' },
        { id: 'b3', title: 'Webster\'s Dictionary of English Usage 1989', category: 'Books', description: 'A scholarly guide to tricky English words and phrases, offering objective, evidence-based advice by analyzing millions of historical examples from literature and other sources.', coverImg: '/cover/webster.jpg', link: '/ebook/webster.pdf' },
        { id: 'b4', title: 'Genki I - Textbook (2nd Edition)', category: 'Books', description: 'A widely used, highly regarded beginner-level Japanese textbook designed to build a solid foundation in all four language skills: speaking, listening, reading, and writing.', coverImg: '/cover/genki.jpg', link: '/ebook/genki.pdf' },

        { id: 'manga1', title: 'Jujutsu Kaisen Vol. 1', category: 'Manga', description: 'A popular manga about sorcerers and curses.', coverImg: '/cover/juju.jpg', link: '/ebook/JujuVol1.pdf' },
        { id: 'manga2', title: 'Jujutsu Kaisen Vol. 2', category: 'Manga', description: 'The saga continues in the second volume.', coverImg: '/cover/juju2.jpg', link: '/ebook/JujuVol2.pdf' },
    ];

   // --- SELECTORS ---
            const searchInput = document.getElementById('searchInput');
            const favoritesList = document.getElementById('favoritesList');
            const favoritesSection = document.getElementById('favorites-section');
            const categoriesSection = document.getElementById('categories-section');
            const filterBar = document.getElementById('filter-bar');
            
            const bookViewerModal = document.getElementById('book-viewer-modal');
            const viewerTitle = document.getElementById('viewer-title');
            const viewerDesc = document.getElementById('viewer-desc');
            const viewerCoverImg = document.getElementById('viewer-cover-img');
            const pdfIframe = document.getElementById('pdf-iframe');
            const prevBookBtn = document.getElementById('prev-book-btn');
            const nextBookBtn = document.getElementById('next-book-btn');
            const viewerCloseBtn = document.getElementById('viewer-close-btn');
            const openBookLink = document.getElementById('open-book-link');
            
            const videoViewerModal = document.getElementById('video-viewer-modal');
            const videoViewerTitle = document.getElementById('video-viewer-title');
            const videoContainer = document.getElementById('video-container');
            const videoCloseBtn = document.getElementById('video-viewer-close-btn');

            // --- STATE ---
            let activePlayer = null;
            let activeCategory = 'All';
            let currentBookList = [];
            let currentBookIndex = 0;

            // --- HELPERS ---
            function getFavorites() { return JSON.parse(localStorage.getItem('elibraryFavorites') || '[]'); }
            function setFavorites(favs) { localStorage.setItem('elibraryFavorites', JSON.stringify(favs)); }
            
            function stopActivePlayer() {
                if (activePlayer) {
                    activePlayer.innerHTML = ''; 
                    activePlayer = null;
                }
            }

            // --- RENDER FUNCTION (FIXED) ---
            function renderItemCard(item) {
                const isFav = getFavorites().includes(item.id);
                const card = document.createElement('div');
                card.className = 'item-card';
                card.dataset.id = item.id;

                let coverClass = 'cover-container';
                
                // FIXED: Robust aspect ratio logic
                // Instead of relying on category names (which caused the issue),
                // we check the actual properties of the item.
                if (item.video) {
                    coverClass += ' video'; // Forces 16:9 for YouTube/Movies
                } else if (item.audio) {
                    coverClass += ' music'; // Forces 1:1 for Music
                }
                // Else it remains default (Books/Manga style)

                let actionButtonHTML = '';
                if (item.video) {
                    actionButtonHTML = `<button class="action-btn play-btn" data-type="video"><i class="fas fa-play"></i> Watch Movie</button>`;
                } else if (item.audio) {
                    actionButtonHTML = `<button class="action-btn play-btn" data-type="audio"><i class="fas fa-headphones"></i> Listen</button>`;
                } else if (item.link) {
                    actionButtonHTML = `<button class="action-btn read-book-btn"><i class="fas fa-book-open"></i> Read Book</button>`;
                }

                card.innerHTML = `
                    <div class="${coverClass}">
                        <img src="${item.coverImg}" alt="${item.title}" loading="lazy">
                        <button class="fav-btn" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                            <i class="${isFav ? 'fas' : 'far'} fa-star"></i>
                        </button>
                    </div>
                    <div class="item-info">
                        <h3 class="item-title">${item.title}</h3>
                        <p class="item-desc">${item.description}</p>
                        ${actionButtonHTML}
                    </div>
                    <div class="media-player-container"></div>`;
                return card;
            }

            function renderContent(query = '') {
                const lowerQuery = query.toLowerCase();
                let sourceItems = activeCategory === 'All' ? entertainmentItems : entertainmentItems.filter(item => item.category === activeCategory);
                
                const filteredItems = sourceItems.filter(item =>
                    item.title.toLowerCase().includes(lowerQuery) ||
                    item.description.toLowerCase().includes(lowerQuery)
                );

                // Render Favorites
                const favIds = getFavorites();
                if(favIds.length > 0) {
                    favoritesSection.style.display = 'block';
                    favoritesList.innerHTML = '';
                    const favItems = favIds.map(id => entertainmentItems.find(item => item.id === id)).filter(Boolean);
                    
                    if(favItems.length > 0) {
                        favItems.forEach(item => favoritesList.appendChild(renderItemCard(item)));
                    } else {
                        favoritesSection.style.display = 'none';
                    }
                } else {
                    favoritesSection.style.display = 'none';
                }

                // Render Categories
                categoriesSection.innerHTML = '';
                if (filteredItems.length === 0) {
                    categoriesSection.innerHTML = `<div class="placeholder-text"><i class="fas fa-ghost fa-2x"></i><p>No results found.</p></div>`;
                    return;
                }

                const categories = [...new Set(filteredItems.map(item => item.category))];
                categories.forEach(category => {
                    const itemsInCategory = filteredItems.filter(item => item.category === category);
                    if (itemsInCategory.length > 0) {
                        const categoryBlock = document.createElement('div');
                        categoryBlock.className = 'content-block';
                        categoryBlock.innerHTML = `
                            <h2>
                                <i class="fas fa-folder"></i> ${category}
                                <span class="collapse-arrow"><i class="fas fa-chevron-down"></i></span>
                            </h2>
                            <div class="item-grid"></div>
                        `;
                        const grid = categoryBlock.querySelector('.item-grid');
                        itemsInCategory.forEach(item => grid.appendChild(renderItemCard(item)));
                        categoriesSection.appendChild(categoryBlock);
                    }
                });
            }

            // --- VIEWERS ---

            function openBookViewer(clickedItemId) {
                const bookCategories = ['Books', 'Manga'];
                currentBookList = entertainmentItems.filter(item => bookCategories.includes(item.category));
                currentBookIndex = currentBookList.findIndex(item => item.id === clickedItemId);

                if(currentBookIndex !== -1) {
                    loadBookIntoViewer();
                    bookViewerModal.classList.add('active');
                }
            }

            function closeBookViewer() {
                bookViewerModal.classList.remove('active');
                pdfIframe.src = ''; 
            }

            function loadBookIntoViewer() {
                if (currentBookIndex < 0 || currentBookIndex >= currentBookList.length) return;
                const bookData = currentBookList[currentBookIndex];
                
                viewerTitle.textContent = bookData.title;
                viewerDesc.textContent = bookData.description;
                viewerCoverImg.src = bookData.coverImg;
                
                // --- PDF.JS INTEGRATION ---
                // Pointing to local PDF.js viewer
                const viewerPath = 'pdfjs/web/viewer.html';
                pdfIframe.src = `${viewerPath}?file=${encodeURIComponent(bookData.link)}`;
                
                openBookLink.href = bookData.link;
                
                prevBookBtn.disabled = currentBookIndex === 0;
                nextBookBtn.disabled = currentBookIndex === currentBookList.length - 1;
            }

            function showNextBook() { if (currentBookIndex < currentBookList.length - 1) { currentBookIndex++; loadBookIntoViewer(); } }
            function showPrevBook() { if (currentBookIndex > 0) { currentBookIndex--; loadBookIntoViewer(); } }

            function openVideoViewer(id) {
                const item = entertainmentItems.find(i => i.id === id);
                if (!item || !item.video) return;

                videoViewerTitle.textContent = item.title;
                
                // Check for YouTube Link
                const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
                const match = item.video.match(youtubeRegex);

                if (match && match[1]) {
                    const videoId = match[1];
                    // Updated embed URL to ensure autoplay works on modern browsers where allowed, and improved compatibility
                    videoContainer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                } else {
                    // Fallback to Standard HTML5 Video
                    videoContainer.innerHTML = `<video controls autoplay><source src="${item.video}" type="video/mp4"></video>`;
                }
                
                videoViewerModal.classList.add('active');
            }

            function closeVideoViewer() {
                videoViewerModal.classList.remove('active');
                videoContainer.innerHTML = ''; 
            }

            // --- LISTENERS ---
            document.body.addEventListener('click', (e) => {
                const target = e.target;
                
                // 1. NEW: Logic for Stop/Close Button
                if (target.closest('.stop-audio-btn')) {
                    stopActivePlayer();
                    return; // Stop here
                }

                // 2. Favorite
                const favBtn = target.closest('.fav-btn');
                if (favBtn) {
                    e.preventDefault();
                    const id = target.closest('.item-card').dataset.id;
                    let favs = getFavorites();
                    favs = favs.includes(id) ? favs.filter(favId => favId !== id) : [...favs, id];
                    setFavorites(favs);
                    renderContent(searchInput.value); 
                }

                // 3. Play/Read Buttons (UPDATED)
                const playBtn = target.closest('.play-btn');
                if (playBtn) {
                    stopActivePlayer(); // Stop any currently playing media first
                    const card = target.closest('.item-card');
                    const id = card.dataset.id;
                    const type = playBtn.dataset.type;

                    if (type === 'video') {
                        openVideoViewer(id);
                    } 
                    else if (type === 'audio') {
                        const item = entertainmentItems.find(i => i.id === id);
                        const container = card.querySelector('.media-player-container');
                        
                        // INJECT PLAYER WITH STOP BUTTON
                        container.innerHTML = `
                            <div class="media-player audio-active">
                                <audio controls autoplay src="${item.audio}"></audio>
                                <button class="stop-audio-btn" title="Stop Music">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>`;
                        
                        activePlayer = container;
                    }
                }

                if (target.closest('.read-book-btn')) {
                    openBookViewer(target.closest('.item-card').dataset.id);
                }

                // Collapse Categories
                if (target.closest('.content-block h2')) {
                    const block = target.closest('.content-block');
                    block.classList.toggle('collapsed');
                    const grid = block.querySelector('.item-grid');
                    grid.style.display = block.classList.contains('collapsed') ? 'none' : 'grid';
                }
            });

            // Filter Bar
            filterBar.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    activeCategory = e.target.dataset.category;
                    renderContent(searchInput.value);
                }
            });

            searchInput.addEventListener('input', () => renderContent(searchInput.value));
            
            // Modal Controls
            viewerCloseBtn.addEventListener('click', closeBookViewer);
            nextBookBtn.addEventListener('click', showNextBook);
            prevBookBtn.addEventListener('click', showPrevBook);
            videoCloseBtn.addEventListener('click', closeVideoViewer);
            
            // Close Modals on background click or Escape
            window.addEventListener('click', (e) => {
                if (e.target === bookViewerModal) closeBookViewer();
                if (e.target === videoViewerModal) closeVideoViewer();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') { closeBookViewer(); closeVideoViewer(); }
            });

            // Init
            renderContent();

});
