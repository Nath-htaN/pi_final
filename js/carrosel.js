const carrossel = document.querySelector('.carrossel-inner');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

// Atualiza o carrossel ao mudar de slide
function updateCarrossel() {
  const offset = -currentIndex * 100; // Desloca o carrossel
  carrossel.style.transform = `translateX(${offset}%)`;
}

// Função para mover automaticamente o carrossel
function moveCarrossel() {
  currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
  updateCarrossel();
}

// Configuração de intervalo para movimentação automática
let autoSlide = setInterval(moveCarrossel, 3000); // A cada 3 segundos

// Event listeners para os botões
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
  updateCarrossel();
  resetAutoSlide(); // Reinicia o intervalo
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
  updateCarrossel();
  resetAutoSlide(); // Reinicia o intervalo
});

// Reinicia o auto-slide ao usar os botões
function resetAutoSlide() {
  clearInterval(autoSlide); // Cancela o intervalo atual
  autoSlide = setInterval(moveCarrossel, 3000); // Reinicia o intervalo
}
