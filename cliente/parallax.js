const heroContainer = document.getElementById("heroContainer");

// Escuchar el movimiento del ratón en toda la ventana
window.addEventListener("mousemove", (event) => {
    // Obtener las dimensiones de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calcular la posición del fondo en la dirección opuesta al movimiento del ratón
    const moveX = (event.clientX / windowWidth - 0.5) * 10;
    const moveY = (event.clientY / windowHeight - 0.5) * 10;

    // Aplicar nueva posición de fondo
    heroContainer.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});