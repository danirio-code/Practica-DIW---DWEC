// Import all of Bootstrap's JS
import bootstrap from '../bootstrap-5.3.2/js/index.umd';

// Import all of Bootstrap's SCSS
import '../bootstrap-5.3.2/scss/bootstrap.scss';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import '../sass/styles.scss';

// Probando tooltips con bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
