function procesarCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      const content = event.target.result;
      const lines = content.split('\n');
      let sum = 0;
      let kgCO2 = 0;
      let kgCO2MediaDia = 14;

      lines.forEach((line, index) => {
        // Ignorar la primera línea si contiene encabezados
        if (index === 0) return;

        const cells = line.split(';');
        const value = parseFloat(cells[3].replace(',', '.')); // Tomar el valor de la columna 4
        if (!isNaN(value)) {
          sum += value;
        }
      });

      sum /= 3;
      kgCO2 = sum * kgCO2MediaDia;

      sum = sum * 100;

      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = `Consumes el ${sum.toFixed(2)}% de lo que consume una persona de media al día, esto supone el ${kgCO2.toFixed(2)}kg de CO2 diariamente`;
      
      const additionalInfoDiv = document.getElementById('additionalInfo');
      additionalInfoDiv.textContent = `Este CO2 supone blablabla para el planeta.`;    
    };

    reader.readAsText(file);
  }