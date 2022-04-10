import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Graph(props) {
 console.log(props.data.length === 0, Object.keys(props.data));
 if (!props.data) return null;
 if (Object.keys(props.data).length === 0) return null;
 if (props.data.length === 0) return null;

 const options = {
  responsive: true,
  plugins: {},
 };
 const labels = props.data.x;

 const data = {
  labels: props.data.x,
  datasets: [
   {
    label: 'Dataset 1',
    data: labels.map((e, i) => props.data.y[i]),
    backgroundColor: '#003875',
    borderColor: '#003875',
   },
  ],
 };

 return <Line options={options} data={data} />;
}
