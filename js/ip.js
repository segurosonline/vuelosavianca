// Función para obtener la ubicación del usuario usando ipinfo.io
async function checkLocation() {
    try {
        // Llamada a la API para obtener la información de ubicación
        const response = await fetch("https://ipinfo.io/json?token=51072411cb9c51");
        const data = await response.json();

        // Lista de países permitidos
        const allowedCountries = ["CO", "EC"]; // CO para Colombia, EC para Ecuador

        if (allowedCountries.includes(data.country)) {
            document.getElementById("content-col-ec").style.display = "block";
            document.getElementById("content-other").style.display = "none";
            document.querySelector("header img").style.display = "block"; // Mostrar imagen
        } else {
            document.getElementById("content-col-ec").style.display = "none";
            document.getElementById("content-other").style.display = "block";
            document.querySelector("header img").style.display = "none"; // Ocultar imagen
        }
    } catch (error) {
        console.error("Error al obtener la ubicación:", error);
        // Mostrar contenido alternativo en caso de error
        document.getElementById("content-col-ec").style.display = "none";
        document.getElementById("content-other").style.display = "block";
        document.querySelector("header img").style.display = "none"; // Ocultar imagen en caso de error
    }
}




// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", checkLocation);

