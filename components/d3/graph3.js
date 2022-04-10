import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Graph(props) {
 if (!props.data) return null;
 if (Object.keys(props.data).length === 0) return null;
 if (props.data.length === 0) return null;

 const options = {
  responsive: true,
  plugins: {
   title: {
    display: true,
    text: props.title,
   },
  },
  animation: { duration: 0 },
 };
 const labels = props.data.y;
 const labels2 = props.data.predY;
 let la3 = null;

 let s3 = {};
 if (props.data.maxX) {
  la3 = props.data.maxY;
  s3 = {
   label: 'Максимум',
   data: la3.map((e, i) => props.data.maxX[i]),
   backgroundColor: '#750000',
   borderColor: '#750000',
  };
 }

 const data = {
  labels: labels2,
  datasets: [
   {
    label: 'Значения',
    data: labels.map((e, i) => props.data.x[i]),
    backgroundColor: '#003875',
    borderColor: '#003875',
   },
   {
    label: 'Предсказание',
    data: labels2.map((e, i) => props.data.predX[i]),
    backgroundColor: '#17c22e',
    borderColor: '#17c22e',
   },
   s3,
  ],
 };

 return <Line options={options} data={data} />;
}
