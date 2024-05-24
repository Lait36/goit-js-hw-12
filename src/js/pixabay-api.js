import iziToast from 'izitoast';
import axios from 'axios';
import 'izitoast/dist/css/iziToast.min.css';

export let totalPages = 0;
export const fetchImages = async (searchQuery, currentPage) => {
  const options = new URLSearchParams({
    key: '43292440-b0b2b94cbd69ec3f0dfdb5c21',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page : 20,
    page : currentPage,
  });
  const url = `https://pixabay.com/api/?${options}`;
  const loader = document.querySelector('.loader');
  loader.classList.remove('is-hidden');

  try {
    const response = await axios.get(url);
    const data = response.data;
    const images = data.hits;
    const totalImages = data.total;
    totalPages = Math.ceil(totalImages / 20);
    // const pages = Math.ceil(totalImages / 20);
    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
      });
    }
    loader.classList.add('is-hidden');
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
};