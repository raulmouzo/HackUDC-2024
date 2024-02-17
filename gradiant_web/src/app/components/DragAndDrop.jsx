import {useState} from 'react';
import { Dropzone } from '@files-ui/react';
import  { useRouter } from 'next/navigation';
import { useFile } from '../context/csvContex';


export const DragAndDrop = () => {
    const router = useRouter();
	const [files, setFiles] = useState([]);
    const { setFile } = useFile();

    const procesarCSV = (file) => {
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

            sum /= 9;

            kgCO2 = sum * kgCO2MediaDia;

            sum = sum * 100;

            // Aquí necesitas actualizar tu manejo del DOM o mejor aún, usar el estado de React para renderizar esta información
            console.log(`Consumes el ${sum.toFixed(2)}% de lo que consume una persona de media al día, esto supone el ${kgCO2.toFixed(2)}kg de CO2 diariamente`);
            console.log(`Este CO2 supone blablabla para el planeta.`);
        };

        reader.readAsText(file);
    }

    const handleFileChange = (files) => {
		console.log(files)
		const file = files[0].file
		console.log(file)
        if (files.length > 0) {
            //procesarCSV(file);
            setFile(file);
            router.push('/dashboard');
        }
    }

    return (
		<Dropzone
			header={false}
			value={files}
			footer={false}
			maxFiles={1}
			label="Drop here your csv file"
			onChange={handleFileChange}
		/>
    );
}