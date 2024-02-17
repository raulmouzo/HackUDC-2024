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
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: horas,
            datasets: [{
                label: 'Consumo (kW)',
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

    // Agregar otra anotación con texto personalizado
    console.log("Agregando anotación...");
    myChart.options.plugins.annotation.annotations.push({
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y',
        value: maxConsumo,
        borderColor: 'red',
        borderWidth: 2,
        label: {
            content: `Punto de máximo consumo: ${maxConsumo} kW`,
            enabled: true,
            position: 'right'
        }
    });

    // Actualizar la gráfica para mostrar la nueva anotación
    console.log("Actualizando gráfica...");
    myChart.update();
}

// Llamar a la función para leer el archivo CSV y crear la gráfica
readCSVAndCreateChart();
