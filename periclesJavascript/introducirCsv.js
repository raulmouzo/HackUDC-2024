// Función para procesar el archivo CSV cargado
function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const contents = event.target.result;
        processData(contents);
    };

    reader.readAsText(file);
}

// Función para procesar los datos del archivo CSV
function processData(data) {
    // Dividir los datos por filas
    const rows = data.split('\n');

    // Iterar sobre cada fila y extraer información de las primeras 4 columnas
    rows.forEach(row => {
        const columns = row.split(';');
        const column1 = columns[0];
        const column2 = columns[1];
        const column3 = columns[2];
        const column4 = columns[3];

        // Aquí puedes hacer lo que quieras con los datos de las columnas
        console.log(`Columna 1: ${column1}, Columna 2: ${column2}, Columna 3: ${column3}, Columna 4: ${column4}`);
    });
}

// Agregar un listener para el cambio de archivo
document.getElementById('csvFile').addEventListener('change', handleFileSelect);
