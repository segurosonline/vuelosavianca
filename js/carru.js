document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.querySelector(".carousel-prep-items");
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;

    let currentIndex = 0;

    const moveCarousel = () => {
        currentIndex = (currentIndex + 1) % totalItems; // Avanza al siguiente elemento
        itemsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Configura el carrusel automático
    const interval = setInterval(moveCarousel, 3000);

    // Pausar el carrusel al pasar el mouse
    itemsContainer.addEventListener("mouseover", () => clearInterval(interval));
    itemsContainer.addEventListener("mouseout", () => setInterval(moveCarousel, 3000));
});
