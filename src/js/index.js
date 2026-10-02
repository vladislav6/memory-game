import '../css/style.css';
import './sections/render.js';
import flipCard from './game/flip-card.js';

function onPageLoad() {
  const cards = document.querySelector('.cards');

  cards?.addEventListener('click', flipCard);
}

window.addEventListener('DOMContentLoaded', onPageLoad);