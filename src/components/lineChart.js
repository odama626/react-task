import React from 'react';
import { useCanvasContext2d } from '../utils';
import Chart from 'chart.js';


const LineChart = props => {
  const { socket } = props;

  const canvasRef = useCanvasContext2d(({ context }) => {
    const chart = new Chart(context, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Value',
          xAxisID: 'time',
          fill: false,
          data: [],
          backgroundColor: '#087878',
          borderColor: '#087878',
        }],
      },
      options: {
        scales: {
          xAxes: [{
            id: 'time',
            type: 'time',
            position: 'left',
          }],
        },
      }
    })

    function onData({ value, timestamp}) {
      const [x, y] = [timestamp, value];
      chart.data.datasets[0].data.push({ x, y });
      chart.data.labels.push(timestamp);
      chart.update()
    }

    socket.on('data', onData);

    return () => {
      chart.destroy();
      socket.off('data', onData);
    }
  }, []);

  return (
    <canvas ref={canvasRef} />
  )
}

export default LineChart;
