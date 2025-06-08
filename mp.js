const mp = new MercadoPago('APP_USR-d337212b-5ba8-40d0-8089-f77ea1b3faa7', {
    locale: "es-CO"
});

// Función para convertir formato colombiano a número
function convertirPrecio(precioTexto) {
    // Eliminar puntos de miles y convertir coma decimal a punto
    const precioLimpio = precioTexto
        .replace(/\./g, '')    // Quitar puntos (ej: 100.000 → 100000)
        .replace(/,/g, '.');   // Si hay decimales, usar punto (ej: 100.000,50 → 100000.50)

    const precio = parseFloat(precioLimpio);
    
    if (isNaN(precio)) {
        throw new Error("Formato de precio inválido");
    }
    
    return precio;
}

function convertirPrecio(precioTexto) {
 
    const precioLimpio = precioTexto
        .replace(/\$/g, '')   
        .replace(/\./g, '')   
        .replace(/,/g, '.');   

    const precio = parseFloat(precioLimpio);
    
    if (isNaN(precio)) {
        throw new Error("Formato de precio inválido");
    }
    
    return precio;
}

// Evento del botón
document.addEventListener('DOMContentLoaded', function() {
    const totalAPagarDiv = document.querySelector('.total-a-pagar');
    const priceElement = document.getElementById('totalPagar'); // Elemento con la clase
    
    // Función para obtener el precio actual
    const obtenerPrecioActual = () => {
        return convertirPrecio(priceElement.textContent);
    };

    // Manejar clic en MercadoPago
    totalAPagarDiv.addEventListener('click', async (event) => {
        // Evitar que se active en clics dentro del botón de MP
        if (event.target.closest('#wallet_container')) {
            return;
        }
    

        const precioOriginal = convertirPrecio(priceElement.textContent);
        
        if (precioOriginal <= 0) {
            alert("El precio no es válido");
            return;
        }
    
        const mensaje = `El total aumentará $219.990 por la forma de pago seleccionada.\n\nTotal a pagar: $${(precioOriginal + 219990).toLocaleString('es-CO')}`;
        
        if (!confirm(mensaje)) {
            return;
        }

        // Actualizar precio en pantalla
        const nuevoPrecio = precioOriginal + 219990;
        priceElement.textContent = `$${nuevoPrecio.toLocaleString('es-CO')}`;

        try {
            const response = await fetch("https://apijet.vercel.app/create_preference", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "Total a pagar:",
                    quantity: 1,
                    price: nuevoPrecio // Usamos el valor calculado, no del DOM
                }),
            });
            
            const preference = await response.json();
            
            // Regenerar botón
            const walletContainer = document.getElementById('wallet_container');
            walletContainer.innerHTML = '';
            
            mp.bricks().create("wallet", "wallet_container", {
                initialization: { 
                    preferenceId: preference.id 
                },
                customization: {
                    texts: { 
                        valueProp: 'smart_option' 
                    }
                }
            });
            
        } catch(error) {
            alert(`Error: ${error.message}`);
            priceElement.textContent = `$${precioOriginal.toLocaleString('es-CO')}`;
        }
    });
});

// Función de conversión mejorada
function convertirPrecio(precioTexto) {
    // Eliminar símbolos y caracteres no numéricos excepto números
    return Number(precioTexto.replace(/[^0-9]/g, ''));
}

// Función para crear el botón de MP
const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();

        window.checkoutButton = await bricksBuilder.create("wallet", "wallet_container", {
            initialization: { preferenceId: preferenceId },
            customization: { texts: { valueProp: 'smart_option' } }
        });
    };

    renderComponent();
};