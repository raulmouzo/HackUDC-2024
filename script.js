document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const csv = event.target.result;
        const table = csvToTable(csv);
        document.getElementById('tableContainer').innerHTML = table;
    };
    
    reader.readAsText(file);
}

function csvToTable(csv) {
    const rows = csv.split('\n');
    let tableHtml = '<table>';

    rows.forEach(row => {
        const columns = row.split(',');
        tableHtml += '<tr>';
        columns.forEach(column => {
            tableHtml += `<td>${column}</td>`;
        });
        tableHtml += '</tr>';
    });

    tableHtml += '</table>';
    return tableHtml;
}
