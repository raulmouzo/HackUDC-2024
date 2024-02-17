import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

export const Chart = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current) {
      // Crea el gráfico dentro del elemento referenciado.
      const chart = createChart(chartContainerRef.current, {
        width: 550,
        height: 200,
        layout: { textColor: 'white', background: { type: 'solid', color: 'black' }},
        grid: {
        vertLines: {
            visible: false,
        },
        horzLines: {
            visible: false,
        },
        },
        rightPriceScale: {
        borderColor: '#485c7b',
        },
        timeScale: {
        borderColor: '#485c7b',
        },

        rightPriceScale: {
            scaleMargins: {
              top: 0.2,
              bottom: 0.2,
            },
            borderVisible: false,
          },
          timeScale: {
            borderVisible: false,
          },
          crosshair: {
            vertLine: {
              labelVisible: false,
            },
          },
          
      });

      // Crea la serie de líneas.
      const lineSeries = chart.addAreaSeries({
        topColor: 'rgba(0, 150, 136, 0.56)',
        bottomColor: 'rgba(0, 150, 136, 0.04)',
        lineColor: 'rgba(0, 150, 136, 1)',
        lineWidth: 2,
      });

      // Establece los datos de la serie.
      lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
        { time: '2019-04-21', value: 80.01 },
        { time: '2019-04-22', value: 96.63 },
        { time: '2019-04-23', value: 76.64 },
        { time: '2019-04-24', value: 81.89 },
        { time: '2019-04-25', value: 74.43 },
        { time: '2019-04-26', value: 80.01 },
        { time: '2019-04-27', value: 96.63 },
        { time: '2019-04-28', value: 76.64 },
        { time: '2019-04-29', value: 81.89 },
        { time: '2019-04-30', value: 74.43 },
        
      ]);

      chart.timeScale().fitContent();

      return () => {
        chart.remove();
      };
    }
  }, []);

  return (
    <div className=' bg-black border-[1px] rounded-[15px] py-5 px-10 font-semibold w-[600px]'>
        <h2 className="text-[36px] text-white mb-5">
            Light Price
        </h2>
        <div ref={chartContainerRef} />
    </div>
  );
};
