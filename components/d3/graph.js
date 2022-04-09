import dynamic from 'next/dynamic';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Graph() {
 const options = {
  responsive: true,
  plugins: {
   title: {
    display: true,
    text: 'Состояние лифта',
   },
  },
 };
 const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
 ];

 const data = {
  labels,
  datasets: [
   {
    label: 'Dataset 1',
    data: labels.map(() => Math.random(99)),
    backgroundColor: '#003875',
    borderColor: '#003875',
   },
  ],
 };

 return <Line options={options} data={data} />;
}
