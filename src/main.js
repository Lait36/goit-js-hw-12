// Описаний у документації
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

  try {
    const data = await fetchImages(searchQuery, currentPage);
    if (currentPage > totalPages) {
      loadMoreBtn.classList.add('is-hidden');
    }
    if (data) {
      // renderImages(data);
      const container = document.querySelector('.gallery');
      container.innerHTML = renderImages(data);
      currentTModal.refresh();
    }
  } catch (error) {
    console.error('Error searching images:', error);
  }
});

loadMoreBtn.addEventListener('click', async event => {
  event.preventDefault();
  currentPage += 1;
  try {
    const data = await fetchImages(searchQuery, currentPage);
    if (currentPage > totalPages) {
      loadMoreBtn.classList.add('is-hidden');
    }
    if (data) {
      // renderImages(data);
      const container = document.querySelector('.gallery');
      container.innerHTML = renderImages(data);
      currentTModal.refresh();
    }
  } catch (error) {
    console.error('Error searching images:', error);
  }
});