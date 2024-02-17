// Función para leer el archivo CSV y crear la gráfica
function readCSVAndCreateChart() {
    fetch('consumptions.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Dividir los datos por filas y eliminar la primera fila (encabezados)
            const horas = [];
            const consumos = [];

            // Iterar sobre cada fila del CSV
            rows.forEach(row => {
                const columns = row.split(';');
                const hora = columns[2]; // Obtener la hora (tercera columna)
                const consumo = parseFloat(columns[3].replace(',', '.')); // Obtener el consumo (cuarta columna)

                horas.push(hora);
                consumos.push(consumo);
            });

            // Encontrar el punto de mayor consumo
            const maxConsumoIndex = consumos.indexOf(Math.max(...consumos));
            const horaMaxConsumo = horas[maxConsumoIndex];
            const maxConsumo = consumos[maxConsumoIndex];

            // Crear la gráfica
            console.log("Creando gráfica...");
            createChart(horas, consumos, horaMaxConsumo, maxConsumo);
        });
}

// Función para crear la gráfica utilizando Chart.js
function createChart(horas, consumos, horaMaxConsumo, maxConsumo) {
    // Obtener el contenedor para la gráfica
    var contenedorGrafica = document.getElementById('graficaContainer');
    
    // Configurar el tamaño del contenedor
    contenedorGrafica.style.width = '100%';
    contenedorGrafica.style.height = '100%';
    
    // Crear el canvas dentro del contenedor
    var canvas = document.createElement('canvas');
    contenedorGrafica.appendChild(canvas);
    
    // Configurar el tamaño del canvas para que llene el contenedor
    canvas.width = contenedorGrafica.offsetWidth;
    canvas.height = contenedorGrafica.offsetHeight;
    
    // Obtener el contexto del canvas
    var ctx = canvas.getContext('2d');
    
    // Crear la gráfica
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: horas,
            datasets: [{
                label: 'Consumo (kW) x Hora (h)',
                data: consumos,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Consumo (kW)'
                    }
                }]
            },
            annotation: {
                annotations: [{
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: horaMaxConsumo,
                    borderColor: 'green',
                    borderWidth: 2,
                    label: {
                        content: `Hora de máximo consumo: ${horaMaxConsumo} (${maxConsumo} kW)`,
                        enabled: true,
                        position: 'top'
                    }
                }]
            }
        }
    });
}

// Llamar a la función para leer el archivo CSV y crear la gráfica
readCSVAndCreateChart();
