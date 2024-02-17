import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const Chart = props => {
	const {
		data,
		name,
		selectedId,
		subtitle,
		colors: {
			backgroundColor = 'black',
			lineColor = '#2962FF',
			textColor = 'white',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
    gridOptions = {
      vertLines: {
        color: '#333', // Color de las líneas verticales
        style: 1, // Estilo de las líneas verticales (0: Sólido, 1: Punteado, 2: Rayado)
        visible: true, // Visibilidad de las líneas verticales
      },
      horzLines: {
        color: '#333', // Color de las líneas horizontales
        style: 0, // Estilo de las líneas horizontales (0: Sólido, 1: Punteado, 2: Rayado)
        visible: true, // Visibilidad de las líneas horizontales
      },
    },
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: selectedId ? 1500 : chartContainerRef.current.clientWidth,
				height: selectedId ? 700 : 200,
        		grid: gridOptions,
				timeScale: {
					tickMarkFormatter: (time, tickMarkType, locale) => {
						const date = new Date(time * 1000);
						const hours = date.getHours().toString().padStart(2, '0');
						const minutes = date.getMinutes().toString().padStart(2, '0');
						return `${hours}`;
					},
				},
			});
			chart.timeScale().fitContent();
			
			
			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor,gridOptions]
	);

  return (
<div className='bg-black border-[5px] rounded-[15px] py-5 px-10 font-semibold min-w-[400px]' style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>
        <h2 className="text-[36px] text-white mb-5">
            {name}
        </h2>
		<p class="text-white/[.5] text-[20px]">{subtitle}</p>
        <div ref={chartContainerRef} />
    </div>
  );
};



