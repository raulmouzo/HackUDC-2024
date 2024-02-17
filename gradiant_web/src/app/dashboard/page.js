'use client';

import { useEffect, useState } from 'react';
import { Chart } from "@/app/components/Chart";
import { useFile } from '../context/csvContex';
import  { useRouter } from 'next/navigation';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const data = [
	{ time: '2018-12-22', value: 32.51 },
	{ time: '2018-12-23', value: 31.11 },
	{ time: '2018-12-24', value: 27.02 },
	{ time: '2018-12-25', value: 27.32 },
	{ time: '2018-12-26', value: 25.17 },
	{ time: '2018-12-27', value: 28.89 },
	{ time: '2018-12-28', value: 25.46 },
	{ time: '2018-12-29', value: 23.92 },
	{ time: '2018-12-30', value: 22.68 },
	{ time: '2018-12-31', value: 22.67 },
];

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
    <main className="flex flex-col justify-between overflow-hidden">

      <div className='flex bg-[#B1E0FC] pb-10 '>
        <div className='items-center'>
            <Carousel
              className='max-w-[50vw] items-center mx-auto'
              showArrows={false} // Oculta las flechas
              showStatus={false} // Oculta el estado de la página (ej., "1 of 3")
              showIndicators={false} // Oculta los indicadores de página
              showThumbs={false} // Oculta las miniaturas (thumbnails) de las imágenes
              infiniteLoop={true} // Permite que el carrusel se repita infinitamente
              autoPlay={true} // Opcional: para que el carrusel reproduzca automáticamente
              interval={3800}

              >
              <div>
                  <img src="/Carr.gif" className='mb-[-100px]'/>
                  
                  <p className='text-[20px] text-white mb-5 text-center font-sans font-bold max-w-[800px] mx-auto '>Coche</p>
              </div>
              <div>
                  <img src="/ice.gif" className='mb-[-100px]'/>

                  <p className='text-[20px] text-white mb-5 text-center font-sans font-bold max-w-[800px] mx-auto '>Hielo</p>

              </div>
              <div>
                  <img src="/tree.gif" className='mb-[-100px]'/>
                  <p className='text-[20px] text-white mb-5 text-center font-sans font-bold max-w-[800px] mx-auto '>arbol</p>
              </div>
              <div>
                  <img src="/plane.gif" className='mb-[-100px]'/>
                  <p className='text-[20px] text-white mb-5 text-center font-sans font-bold max-w-[800px] mx-auto '>abion</p>
              </div>
          </Carousel>
        </div>
        <div className='flex items-center mx-auto'>
          <div className='flex flex-col justify-center items-center h-full'>
            <h2 className="text-[90px] text-white mb-5 text-center justify-center font-sans font-bold">
              {porcentajeConsumo}%
            </h2>
            <p className='text-[20px] text-white mb-5 text-center font-sans font-semibold'>Consumes el {porcentajeConsumo}% de lo que consume una persona de media al día, esto supone {kilogramosC02} kg de CO2 diariamente</p>
          </div>
        </div>

      </div>
 
      <div className='bg-[#B1E0FC] mb-10 '>
      <div className='flex justify-between cap-10 bg-black rounded-t-[50px] drop-shadow '>
        <div className='ml-10 mt-10 ' >
        <Chart data={data} />
        </div>
        <div className='mt-10' >

      <Chart data={data} />
      </div>
      <div className='mr-10 mt-10' >

      <Chart data={data} />
      </div>
         </div>
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
