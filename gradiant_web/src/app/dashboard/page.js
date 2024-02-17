'use client';

import { useEffect, useState } from 'react';
import { Chart } from "@/app/components/Chart";
import { useFile } from '../context/csvContex';
import  { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const { file, setFile } = useFile();
  const [priceData, setPriceData] = useState(null);
  const [porcentajeConsumo, setporcentajeConsumo] = useState(null);
  const [kilogramosC02, setkilogramosC02] = useState(null);

  useEffect(() => {
    if (file === null){
      router.push('/');
      return;
    }

    const fetchPriceData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/prices/min');
        const data = await response.json();
        setPriceData(data);
      } catch (error) {
        console.error("Error al recuperar los datos:", error);
      }
    };
  

    fetchPriceData();
    procesarCSV(file);
  }, []); 

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

        setporcentajeConsumo(sum.toFixed(2));
        setkilogramosC02(kgCO2.toFixed(2));
    };

    reader.readAsText(file);
  }

  return (
    <main className="flex flex-col justify-between">

      <div className='flex bg-[#8DE1FD] mb-3'>
        <div className='items-center'>
          <img src="/image.jpg" alt="Descripción de la imagen" className=" h-[500px]" />
          <h2 className="text-[24px] text-white mb-5 text-center font-sans font-semibold max-w-[800px] mx-auto">
            Consumes el {porcentajeConsumo}% de lo que consume una persona de media al día, esto supone {kilogramosC02} kg de CO2 diariamente
          </h2>
        </div>
        <div className='flex items-center mx-auto'>
          <div className='flex flex-col justify-center items-center h-full'>
            <h2 className="text-[90px] text-white mb-5 text-center justify-center font-sans font-bold">
              {porcentajeConsumo}%
            </h2>
          </div>
        </div>

      </div>
      

      <div className='flex justify-between mx-5'>
        <Chart />
        <Chart />
        <Chart />
      </div>

      {priceData && (
        <div>
          <p>Precio mínimo: {priceData.price} {priceData.currency}</p>
          <p>Fecha y hora: {priceData.date}</p>
        </div>
      )}
    </main>
  );
}
