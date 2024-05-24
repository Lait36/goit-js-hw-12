// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// render-functions.js

// Function to render images in the gallery
export const renderImages = images => {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
        />
      </a>
      <ul class="list-jopa">
        <li class="jopa">
          <h3>Likes</h3>
          <p>${likes}</p>
        </li>
        <li class="jopa">
          <h3>Views</h3>
          <p>${views}</p>
        </li>
        <li class="jopa">
          <h3>Comments</h3>
          <p>${comments}</p>
        </li>
        <li class="jopa">
          <h3>Downloads</h3>
          <p>${downloads}</p>
        </li>
      </ul>
    `
    )
    .join('');
};
