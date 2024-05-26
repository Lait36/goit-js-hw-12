import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const currentTModal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  disableRightClick: true,
});

import { fetchImages } from './js/pixabay-api.js';
import { totalPages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.js-load-more');
const loader = document.querySelector('.loader');

// Search params
let searchQuery = null;
let currentPage = 1;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  currentPage = 1;
  const searchInput = document.querySelector('input');
  searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    iziToast.warning({
      title: '',
      message: 'Please enter a search query',
      position: 'topCenter',
    });
    return;
  }

  loader.classList.remove('is-hidden');

  try {
    const data = await fetchImages(searchQuery, currentPage);
    if (currentPage >= totalPages) {
      loadMoreBtn.classList.add('is-hidden');
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }
    if (data) {
      const container = document.querySelector('.gallery');
      container.innerHTML = renderImages(data);
      currentTModal.refresh();
    }
  } catch (error) {
    console.error('Error searching images:', error);
  } finally {
    loader.classList.add('is-hidden');
  }
});

loadMoreBtn.addEventListener('click', async event => {
  event.preventDefault();
  currentPage += 1;
  loader.classList.remove('is-hidden');

  try {
    const data = await fetchImages(searchQuery, currentPage);
    if (currentPage >= totalPages) {
      loadMoreBtn.classList.add('is-hidden');
    }
    if (data) {
      const container = document.querySelector('.gallery');
      const firstCard = container.querySelector('.gallery-item');
      const cardHeight = firstCard ? firstCard.getBoundingClientRect().height : 0;

      container.insertAdjacentHTML('beforeend', renderImages(data));
      currentTModal.refresh();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error('Error searching images:', error);
  } finally {
    loader.classList.add('is-hidden');
  }
});