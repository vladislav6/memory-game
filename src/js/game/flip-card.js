function flipCard(e) {
  if (e.target.closest('.flip-card')) {
    const card = e.target.closest('.flip-card');
    card.classList.toggle('active');
  }
}

export default flipCard;