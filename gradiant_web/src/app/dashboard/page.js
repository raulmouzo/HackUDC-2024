'use client';

import { useEffect, useState } from 'react';
import { Chart } from "@/app/components/Chart";
import { useFile } from '../context/csvContex';
import  { useRouter } from 'next/navigation';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export default function Dashboard() {
  const router = useRouter();
  const { file, setFile } = useFile();
  const [priceData, setPriceData] = useState(null);

  const [porcentajeConsumo, setporcentajeConsumo] = useState(null);
  const [kilogramosC02, setkilogramosC02] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [parsedData2, setParsedData2] = useState([]);
  const precios = [0.09151, 0.09402, 0.09571, 0.09494, 0.09517, 0.09438, 0.09343, 0.09265, 0.08963, 0.08415, 0.07765, 0.07165, 0.0693, 0.06982, 0.06897, 0.06762, 0.07298, 0.08434, 0.10751, 0.12783, 0.11863, 0.11465, 0.1134, 0.11604];

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
    ParsearCSVGráficas(file, setParsedData);
    ParsearCSVGráficasPrecio(file, setParsedData2);
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
            const value = parseFloat(cells[3].replace(',', '.')); 
            if (!isNaN(value)) {
                sum += value;
            }
        });

        sum /= 9;

        kgCO2 = sum * kgCO2MediaDia;

        sum = sum * 100;

        setporcentajeConsumo(sum.toFixed(2));
        setkilogramosC02(kgCO2.toFixed(2));
    };

    reader.readAsText(file);
  }

  const ParsearCSVGráficas = (file, setParsedData) => {
    const reader = new FileReader();

    reader.onload = function(event) {
        const content = event.target.result;
        const lines = content.split('\n');
        const data = [];

        lines.forEach((line, index) => {
            if (index === 0) return;

            const cells = line.split(';');
            const fecha = cells[1]; // "dd/mm/yyyy"
            let hora = parseInt(cells[2], 10); // Hora como número
            const consumo = parseFloat(cells[3].replace(',', '.')); // Convertir el consumo

            const horaFormateada = hora < 10 ? `0${hora}:00` : `${hora}:00`;

            const fechaISO = fecha.split('/').reverse().join('-') + ' ' + horaFormateada;

            // Convertir a tiempo UNIX en segundos
            const time = Date.parse(fechaISO) / 1000;

            if (!isNaN(consumo) && !isNaN(time)) {
                data.push({ time, value: consumo });
            }
        });
        setParsedData(data);
    };
    reader.readAsText(file);
  }

  const ParsearCSVGráficasPrecio = (file, setParsedData) => {
    const reader = new FileReader();

    reader.onload = function(event) {
        const content = event.target.result;
        const lines = content.split('\n');
        const data = [];

        lines.forEach((line, index) => {
            if (index === 0) return;

            const cells = line.split(';');
            const fecha = cells[1]; // "dd/mm/yyyy"
            let hora = parseInt(cells[2], 10); // Hora como número
            const consumo = parseFloat(cells[3].replace(',', '.')) * precios[index]; // Convertir el consumo

            const horaFormateada = hora < 10 ? `0${hora}:00` : `${hora}:00`;

            const fechaISO = fecha.split('/').reverse().join('-') + ' ' + horaFormateada;

            // Convertir a tiempo UNIX en segundos
            const time = Date.parse(fechaISO) / 1000;

            if (!isNaN(consumo) && !isNaN(time)) {
                data.push({ time, value: consumo });
            }
        });
        setParsedData2(data);
    };
    reader.readAsText(file);
  }


  return (
    <main className="flex flex-col justify-between overflow-hidden">

      <div className='flex bg-[#B1E0FC] pb-10 rounded-br-[50px] '>
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
 
      <div className='bg-[#B1E0FC] rounded-tr-[50px] mb-[-50px] '> 
        <div className='flex justify-left bg-black rounded-t-[50px] drop-shadow  '> 
          <div className='ml-10 mt-10 ' >
            <Chart data={parsedData} name="Light Consumption"/>
          </div>
          <div className='mt-10 ml-10'  >
            <Chart data={parsedData} name="Light Price"/>
          </div>
          <div className='mr-10 mt-10 ml-10' >
            <Chart data={parsedData} name="Your Light Price"/>
          </div>
          <div className="flex items-center py-auto mx-auto justify-center"> 
            <p class="text-9xl text-center  move-up">👇</p>    
          </div>
        </div>
      </div>
      <div>



      </div>
    </main>
  );
}
