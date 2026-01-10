import { createChart, ColorType, AreaSeries } from 'lightweight-charts';
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
					width: selectedId
            ? chartContainerRef.current.clientWidth
            : chartContainerRef.current.clientWidth,
					height: selectedId ? 520 : 220,
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
			
			
			const newSeries = chart.addSeries(AreaSeries, {
				lineColor,
				topColor: areaTopColor,
				bottomColor: areaBottomColor,
			});
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
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">{name}</h2>
        <p className="text-sm text-white/60">{subtitle}</p>
      </div>
      <div
        ref={chartContainerRef}
        className={`w-full rounded-2xl border border-white/10 bg-black/60 ${
          selectedId ? "h-[520px]" : "h-[220px]"
        }`}
      />
    </div>
  );
};
