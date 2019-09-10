import React from 'react';
import { useCanvasContext2d } from '../utils';
import Chart from 'chart.js';


const LineChart = props => {
  const { socket } = props;

  const canvasRef = useCanvasContext2d(({ context }) => {
    const chart = new Chart(context, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Value',
          data: [],
          backgroundColor: '#087878'
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (item, data) => {
              // console.log(item, data);
              const target = data.datasets[item.datasetIndex].data[item.index];
              return target.tuples.map(t => `${t.value} at ${new Date(t.timestamp)}`);
            }
          }
        }
      }
    })

    function onData({ value, timestamp }) {
      const data = chart.data.datasets[0].data;
      const id = (value / 10) | 0;

      const segment = data.find(d => d.id === id);
      if (segment) {
        segment.y++;
        segment.tuples.push({ value, timestamp });
      } else {
        data.push({
          id,
          y: 1,
          tuples: [{ value, timestamp }]
        });
        const labels = chart.data.labels;

        labels.push(`${id * 10} ― ${id * 10 + 10}`);

        // sort the value groups
        for (let i = 0; i < labels.length; i++) {
          let test = parseInt(labels[i]);
          for (let j = i; j < labels.length; j++) {
            if (test > parseInt(labels[j])) {
              [labels[i], labels[j]] = [labels[j], labels[i]];
              [data[i], data[j]] = [data[j], data[i]];
            }
          }
        }

      }
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
