'use client';

import { useEffect, useState } from 'react';
import { Chart } from "@/app/components/Chart";
import { useFile } from '../context/csvContex';
import  { useRouter } from 'next/navigation';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { motion, AnimatePresence } from 'framer-motion';
import PriceCard from '../components/PriceCard';



export default function Dashboard() {
  const router = useRouter();
  const { file, setFile } = useFile();
  const [lowestPrice, setlowestPrice] = useState(null);
  const [highestPrice, sethighestPrice] = useState(null);
  const [cheapestPrice, setCheapestPrice] = useState(null);

  const [porcentajeConsumo, setporcentajeConsumo] = useState(null);
  const [kilogramosC02, setkilogramosC02] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [parsedData2, setParsedData2] = useState([]);
  const [selectedId, setSelectedId] = useState(null);


  const prices = [{time: Date.parse('2023-02-15 00:00')/1000, value: 0.11604},
                  {time: Date.parse('2023-02-15 01:00')/1000, value: 0.09151}, 
                  {time: Date.parse('2023-02-15 02:00')/1000, value: 0.09402}, 
                  {time: Date.parse('2023-02-15 03:00')/1000, value: 0.09571}, 
                  {time: Date.parse('2023-02-15 04:00')/1000, value: 0.09494}, 
                  {time: Date.parse('2023-02-15 05:00')/1000, value: 0.09517}, 
                  {time: Date.parse('2023-02-15 06:00')/1000, value: 0.09438}, 
                  {time: Date.parse('2023-02-15 07:00')/1000, value: 0.09343}, 
                  {time: Date.parse('2023-02-15 08:00')/1000, value: 0.09265}, 
                  {time: Date.parse('2023-02-15 09:00')/1000, value: 0.08963}, 
                  {time: Date.parse('2023-02-15 10:00')/1000, value: 0.08415}, 
                  {time: Date.parse('2023-02-15 11:00')/1000, value: 0.07765}, 
                  {time: Date.parse('2023-02-15 12:00')/1000, value: 0.07165}, 
                  {time: Date.parse('2023-02-15 13:00')/1000, value: 0.0693}, 
                  {time: Date.parse('2023-02-15 14:00')/1000, value: 0.06982}, 
                  {time: Date.parse('2023-02-15 15:00')/1000, value: 0.06897}, 
                  {time: Date.parse('2023-02-15 16:00')/1000, value: 0.06762}, 
                  {time: Date.parse('2023-02-15 17:00')/1000, value: 0.07298}, 
                  {time: Date.parse('2023-02-15 18:00')/1000, value: 0.08434}, 
                  {time: Date.parse('2023-02-15 19:00')/1000, value: 0.10751}, 
                  {time: Date.parse('2023-02-15 20:00')/1000, value: 0.12783}, 
                  {time: Date.parse('2023-02-15 21:00')/1000, value: 0.11863}, 
                  {time: Date.parse('2023-02-15 22:00')/1000, value: 0.11465}, 
                  {time: Date.parse('2023-02-15 23:00')/1000, value: 0.1134}];


// Colores
const colors1 = {
  backgroundColor: 'black',
  lineColor: '#651fff',
  textColor: 'white',
  areaTopColor: '#300f79',
  areaBottomColor: '#160738',
};

const colors2 = {
  backgroundColor: '#black',
  lineColor: 'rgba(38, 198, 218, 1)',
  textColor: '#d1d4dc',
  areaTopColor: 'rgba(20, 170, 190, 0.56)',
  areaBottomColor: 'rgba(38, 198, 218, 0.04)',
};

  useEffect(() => {
    if (file === null){
      router.push('/');
      return;
    }

    const fetchLowestPrice = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/prices/min');
        const data = await response.json();
        setlowestPrice(data);
      } catch (error) {
        console.error("Error al recuperar los datos:", error);
      }
    };

    const fetchHighestPrice = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/prices/max');
        const data = await response.json();
        sethighestPrice(data);
      } catch (error) {
        console.error("Error al recuperar los datos:", error);
      }
    };

    const fetchCheapesttPrice = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/prices/cheapests?n=2');
        const data = await response.json();
        setCheapestPrice(data);
      } catch (error) {
        console.error("Error al recuperar los datos:", error);
      }
    };
  
    fetchLowestPrice();
    fetchHighestPrice();
    fetchCheapesttPrice();
    

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
    const precios = [0.09151, 0.09402, 0.09571, 0.09494, 0.09517, 0.09438, 0.09343, 0.09265, 0.08963, 0.08415, 0.07765, 0.07165, 0.0693, 0.06982, 0.06897, 0.06762, 0.07298, 0.08434, 0.10751, 0.12783, 0.11863, 0.11465, 0.1134, 0.11604]
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
              </div>
              <div>
                  <img src="/ice.gif" className='mb-[-100px]'/>
              </div>
              <div>
                  <img src="/tree.gif" className='mb-[-100px]'/>
              </div>
              <div>
                  <img src="/plane.gif" className='mb-[-100px]'/>
              </div>
          </Carousel>
        </div>
        <div className='flex items-center mx-auto'>
          <div className='flex flex-col justify-center items-center h-full'>
            <h2 className="text-[90px] text-white mb-5 text-center justify-center font-sans font-bold">
              {porcentajeConsumo}%
            </h2>
            <p className='text-[20px] text-white mb-5 text-center font-sans font-semibold'>You consume {porcentajeConsumo}% of what a person consumes on average per day, that is {kilogramosC02} kg of CO2 per day.</p>
          </div>
        </div>

      </div>
 
      <div className='bg-[#B1E0FC] rounded-tr-[50px] mb-[50px] '> 
        <div className='flex justify-left bg-black rounded-t-[50px] drop-shadow'>
          {[
            { id: 'lightConsumption', data: parsedData, name: "Light Consumption" },
            { id: 'lightPrice', data: prices, name: "Light Price", colors: colors1  },
            { id: 'yourLightPrice', data: parsedData2, name: "Your Light Price", colors: colors2}
          ].map(chart => (
            <motion.div key={chart.id} layoutId={chart.id} onClick={() => setSelectedId(chart.id)} className='ml-10 mt-10'>
              <Chart data={chart.data} name={chart.name} colors={chart.colors}/>
            </motion.div>
          ))}
          <div className="flex items-center py-auto mx-auto justify-center"> 
            <p class="text-9xl text-center  move-up">👇</p>
          </div>      
        </div>
      </div>

      <div>
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            layoutId={selectedId} 
            className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }} // Fondo semitransparente
            onClick={() => setSelectedId(null)} // Cierra al hacer clic fuera
          >
            {/* Contenedor de la gráfica con estilo ampliado */}
            <motion.div 
              className="p-5 rounded-lg"
              style={{
                minWidth: '80vw', // Ajusta al tamaño que prefieras
                minHeight: '80vh', // Ajusta al tamaño que prefieras
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative', // Para posicionamiento absoluto del botón de cierre
              }}
              onClick={(e) => e.stopPropagation()} // Previene el cierre al hacer clic dentro
            >
              {/* Renderiza la gráfica seleccionada a gran escala */}
              {selectedId === 'lightConsumption' && <Chart data={parsedData} name="Light Consumption" selectedId={selectedId}/>}
              {selectedId === 'lightPrice' && <Chart data={prices} name="Light Price" selectedId={selectedId} colors={colors1}/>}
              {selectedId === 'yourLightPrice' && <Chart data={parsedData2} name="Your Light Price" selectedId={selectedId} colors={colors2}/>}
              
              {/* Opcional: Botón de cierre */}
              <motion.button 
                onClick={() => setSelectedId(null)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  border: 'none',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                X
              </motion.button>
            </motion.div>
          </motion.div>
        )}
        
        </AnimatePresence>     


      </div>

      <div className='flex gap-[20px] mx-10 flex-col'>
        <h3 className='text-[30px] text-white font-sans font-semibold'>
         Featured Daily Prices
        </h3>   
        <div className='flex justify-between'>
          <PriceCard price={lowestPrice} title="Lowest Price"/>
          <PriceCard price={highestPrice} title="Highest Price"/>
          <PriceCard price={cheapestPrice} title="Chepest Price 1"/>
          <PriceCard price={cheapestPrice} title="Cheapest Price 2"/>
        </div>
      </div>

      <div className='flex justify-center items-center bg-black rounded-b-[50px] py-10'>
        <p className='text-white font-bold'>Thanks for your time &lt;3</p>
      </div>

    </main>
  );
}
