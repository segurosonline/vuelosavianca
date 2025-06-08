function guardarPalabras() {
    const origenTexto = document.querySelector("#svgo strong").textContent;
    const destinoTexto = document.querySelector("#svgd strong").textContent;

    // Guardar las palabras en localStorage
    localStorage.setItem("origenBuscar", origenTexto);
    localStorage.setItem("destinoBuscar", destinoTexto);

    
}
  


document.getElementById("origen").addEventListener("click", function() {
    document.getElementById("origen-section").style.display = "block";
    document.body.style.overflow = "hidden";  // Deshabilitar el scroll de la página
});

document.getElementById("destino").addEventListener("click", function() {
    document.getElementById("destino-section").style.display = "block";
    document.body.style.overflow = "hidden";  // Deshabilitar el scroll de la página
});

document.getElementById("close-origen").addEventListener("click", function() {
    document.getElementById("origen-section").style.display = "none";
    document.body.style.overflow = "auto";  // Habilitar el scroll de la página
});

document.getElementById("close-destino").addEventListener("click", function() {
    document.getElementById("destino-section").style.display = "none";
    document.body.style.overflow = "auto";  // Habilitar el scroll de la página
});

document.getElementById("back-origen").addEventListener("click", function() {
    document.getElementById("origen-section").style.display = "none";
    document.body.style.overflow = "auto";  // Habilitar el scroll de la página
});

document.getElementById("back-destino").addEventListener("click", function() {
    document.getElementById("destino-section").style.display = "none";
    document.body.style.overflow = "auto";  // Habilitar el scroll de la página
});

// Función para actualizar el nombre de la ciudad en el "strong" de la sección Origen
document.querySelectorAll("#origen-list li").forEach(function(item) {
    item.addEventListener("click", function() {
        var cityName = this.getAttribute("data-city");
        document.querySelector("#origen div strong").textContent = cityName;
        // Cierra la sección de origen
        document.getElementById("origen-section").style.display = "none";
        document.body.style.overflow = "auto";  // Habilitar el scroll de la página
    });
});

// Función para actualizar el nombre de la ciudad en el "strong" de la sección Destino
document.querySelectorAll("#destino-list li").forEach(function(item) {
    item.addEventListener("click", function() {
        var cityName = this.getAttribute("data-city");
        document.querySelector("#destino div strong").textContent = cityName;
        // Cierra la sección de destino
        document.getElementById("destino-section").style.display = "none";
        document.body.style.overflow = "auto";  // Habilitar el scroll de la página
    });
});

// Función para filtrar la lista de ciudades según la búsqueda
function filterList(section) {
    const input = document.getElementById(`search-${section}`);
    const filter = input.value.toLowerCase();
    const list = document.getElementById(`${section}-list`);
    const listItems = list.getElementsByTagName('li');

    // Mostrar la lista solo si el usuario comienza a escribir
    if (filter.length > 0) {
        list.style.display = "block";  // Muestra la lista
    } else {
        list.style.display = "none";  // Oculta la lista si el campo está vacío
    }

    // Filtrar los elementos de la lista
    Array.from(listItems).forEach(function(item) {
        const city = item.textContent || item.innerText;
        if (city.toLowerCase().includes(filter)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

  // Variables para los "strong" de Origen y Destino
  let origenCity = "";
  let destinoCity = "";

  // Función para actualizar el nombre de la ciudad en el "strong" de la sección Origen
  document.querySelectorAll("#origen-list li").forEach(function(item) {
      item.addEventListener("click", function() {
          origenCity = this.getAttribute("data-city");
          document.querySelector("#origen div strong").textContent = origenCity;
          checkButtonState();  // Verificar si el botón de búsqueda debe habilitarse
      });
  });

  // Función para actualizar el nombre de la ciudad en el "strong" de la sección Destino
  document.querySelectorAll("#destino-list li").forEach(function(item) {
      item.addEventListener("click", function() {
          destinoCity = this.getAttribute("data-city");
          document.querySelector("#destino div strong").textContent = destinoCity;
          checkButtonState();  // Verificar si el botón de búsqueda debe habilitarse
      });
  });

  // Función para verificar si ambos campos están completos y habilitar el botón de búsqueda
  function checkButtonState() {
      const button = document.querySelector(".search-button");
      if (origenCity !== "" && destinoCity !== "") {
          button.disabled = false;  // Habilitar el botón de búsqueda
      } else {
          button.disabled = true;  // Deshabilitar el botón de búsqueda
      }
  }


// Evento de clic en el botón de búsqueda
document.querySelector(".search-button").addEventListener("click", function () {
    if (origenCity !== "" && destinoCity !== "") {
        // Verificar qué opción de radio está seleccionada
        const selectedTipoViaje = document.querySelector('input[name="tipo_viaje"]:checked').value;

        if (selectedTipoViaje === "ida_vuelta") {
            window.location.href = "dateto.html"; // Página para "Ida y vuelta"
        } else if (selectedTipoViaje === "solo_ida") {
            window.location.href = "date.html"; // Página para "Solo ida"
        }
    } else {
        alert("Por favor, selecciona un origen y un destino.");
    }
});

// Habilitar el botón de búsqueda cuando ambos campos (origen y destino) tengan datos
function checkFields() {
    const searchButton = document.querySelector(".search-button");
    if (origenCity !== "" && destinoCity !== "") {
        searchButton.disabled = false;
    } else {
        searchButton.disabled = true;
    }
}

// Simula los valores de origen y destino (debes conectarlos a tu lógica)
document.getElementById("search-origen").addEventListener("input", function (e) {
    origenCity = e.target.value;
    checkFields();
});
document.getElementById("search-destino").addEventListener("input", function (e) {
    destinoCity = e.target.value;
    checkFields();
});


  // Inicializar el estado del botón al cargar la página
  checkButtonState();