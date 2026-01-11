// --- DATA ---
// Images are now organized by album
const albums = {
  'Intramurals 2025': [
    { src: 'gallery/Intramurals/IMG_0266.jpg', caption: '' },
    { src: 'gallery/Intramurals/IMG_0273.jpg', caption: '' },
    { src: 'gallery/Intramurals/IMG_0270.jpg', caption: '' },
    { src: 'gallery/Intramurals/IMG_0268.jpg', caption: '' },
    { src: 'gallery/Intramurals/IMG_0269.jpg', caption: '' }
  ],
  'Strands': [
    { src: 'gallery/Strands/photo_2025-09-08_22-14-31.jpg', caption: '' },
    { src: 'gallery/Strands/stem.jpg', caption: '' },
    { src: 'gallery/Strands/humss.jpg', caption: '' },
    { src: 'gallery/Strands/pbm.jpg', caption: '' },
    { src: 'gallery/Strands/abm.jpg', caption: '' },
    { src: 'gallery/Strands/tvl.jpg', caption: '' }
  ],
  'Entrepreneur Day 2025': [
    { src: 'gallery/Entre-day/abm.jpg', caption: '' },
    { src: 'gallery/Entre-day/charmora.jpg', caption: '' },
    { src: 'gallery/Entre-day/cook1.jpg', caption: '' },
    { src: 'gallery/Entre-day/cook2.jpg', caption: '' },
    { src: 'gallery/Entre-day/cook3.jpg', caption: '' },
    { src: 'gallery/Entre-day/humss.jpg', caption: '' },
    { src: 'gallery/Entre-day/garments.jpg', caption: '' },
    { src: 'gallery/Entre-day/musubi.jpg', caption: '' },
    { src: 'gallery/Entre-day/random.jpg', caption: '' },
    { src: 'gallery/Entre-day/stem.jpg', caption: '' },
    { src: 'gallery/Entre-day/teacher.jpg', caption: '' },
    { src: 'gallery/Entre-day/tvl.jpg', caption: '' },
    { src: 'gallery/Entre-day/teacher1.jpg', caption: '' },
    { src: 'gallery/Entre-day/teacher2.jpg', caption: '' },
    { src: 'gallery/Entre-day/tiramizzu.jpg', caption: '' },
  ],
};

// --- STATE ---
let currentAlbumName = Object.keys(albums)[0];
let currentImageIndex = 0;

// --- DOM ELEMENTS ---
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const albumNav = document.getElementById('album-nav');

// --- FUNCTIONS ---
function renderGallery(albumName) {
  gallery.innerHTML = '';
  const images = albums[albumName];
  if (!images) return;
  images.forEach((img, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${img.src}" alt="${img.caption}" data-index="${i}">
      <div class="caption">${img.caption}</div>
    `;
    gallery.appendChild(div);
  });
}

function renderAlbumNav() {
  albumNav.innerHTML = '';
  Object.keys(albums).forEach(albumName => {
    const button = document.createElement('button');
    button.className = 'album-btn';
    button.textContent = albumName;
    button.dataset.album = albumName;
    if (albumName === currentAlbumName) {
      button.classList.add('active');
    }
    albumNav.appendChild(button);
  });
}

function updateActiveButton() {
    document.querySelectorAll('.album-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.album === currentAlbumName);
    });
}

function showImageInModal(index) {
  currentImageIndex = index;
  const image = albums[currentAlbumName][currentImageIndex];
  modal.style.display = 'block';
  modalImg.src = image.src;
  modalCaption.textContent = image.caption;
}

// --- EVENT LISTENERS ---
albumNav.addEventListener('click', (e) => {
  if (e.target.classList.contains('album-btn')) {
    currentAlbumName = e.target.dataset.album;
    renderGallery(currentAlbumName);
    updateActiveButton();
  }
});

gallery.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const index = parseInt(e.target.dataset.index, 10);
    showImageInModal(index);
  }
});

document.querySelector('.close').onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

document.querySelector('.next').onclick = () => {
    let nextIndex = (currentImageIndex + 1) % albums[currentAlbumName].length;
    showImageInModal(nextIndex);
};

document.querySelector('.prev').onclick = () => {
    let prevIndex = (currentImageIndex - 1 + albums[currentAlbumName].length) % albums[currentAlbumName].length;
    showImageInModal(prevIndex);
};

document.getElementById('shuffleBtn').onclick = () => {
  let currentImages = albums[currentAlbumName];
  for (let i = currentImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentImages[i], currentImages[j]] = [currentImages[j], currentImages[i]];
  }
  renderGallery(currentAlbumName);
};

document.getElementById('darkBtn').onclick = () => {
  document.body.classList.toggle('dark');
};

window.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block') {
    if (e.key === "Escape") {
      modal.style.display = 'none';
    } else if (e.key === "ArrowRight") {
      document.querySelector('.next').click();
    } else if (e.key === "ArrowLeft") {
      document.querySelector('.prev').click();
    }
  }
});

// --- INITIAL LOAD ---
renderAlbumNav();
renderGallery(currentAlbumName);