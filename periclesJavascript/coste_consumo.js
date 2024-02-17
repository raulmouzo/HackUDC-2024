// Función para obtener el precio de una hora específica a través de una API
function obtenerPrecioDesdeAPI(hora) {
    // URL de la API que proporciona los datos de los precios
    const apiUrl = 'https://api.example.com/precios';

    // Realizar la llamada a la API usando fetch
    return fetch(apiUrl)
        .then(response => {
            // Verificar si la respuesta es exitosa (código de estado 200)
            if (!response.ok) {
                throw new Error('No se pudo obtener la respuesta de la API.');
            }
            // Parsear la respuesta como JSON
            return response.json();
        })
        .then(data => {
            // Verificar si la hora está presente en los datos recibidos
            if (data.hasOwnProperty(hora)) {
                return data[hora].price;
            } else {
                throw new Error('No se encontró el precio para la hora especificada.');
            }
        })
        .catch(error => {
            // Manejar cualquier error que pueda ocurrir durante la llamada a la API
            console.error('Error al obtener el precio desde la API:', error);
            return null; // Retornar null en caso de error
        });
}

// Función para mostrar el precio en pantalla
function mostrarPrecio(precio) {
    const resultadoElemento = document.getElementById('result');
    if (precio !== null) {
        resultadoElemento.textContent = `El precio para la hora seleccionada es: ${precio} €/MWh`;
    } else {
        resultadoElemento.textContent = 'No se pudo obtener el precio desde la API.';
    }
}

// Ejemplo de uso
const horaElegida = "00-01"; // Puedes cambiar esta hora según tus necesidades
obtenerPrecioDesdeAPI(horaElegida)
    .then(precio => {
        mostrarPrecio(precio);
    });
