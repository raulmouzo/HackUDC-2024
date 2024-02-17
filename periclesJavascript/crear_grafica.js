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

            createChart(horas, consumos);
        });
}

// Función para crear la gráfica utilizando Chart.js
function createChart(horas, consumos) {
    var contenedorGrafica = document.getElementById('graficaContainer');

    // Crear un nuevo canvas
    var canvas = document.createElement('canvas');
    contenedorGrafica.appendChild(canvas);

    // Obtener el contexto del canvas
    var ctx = canvas.getContext('2d');

    // Configurar el tamaño del canvas para que coincida con el contenedor
    canvas.width = contenedorGrafica.offsetWidth;
    canvas.height = contenedorGrafica.offsetHeight;

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
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Horas'
                    }
                }]
            }
        }
    });
}

readCSVAndCreateChart();
