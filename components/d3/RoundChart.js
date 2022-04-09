import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function RoundChart(props) {
 let color = '#47c73e';
 if (props.percentage < 90) {
  color = '#dad124';
 }
 if (props.percentage < 55) {
  color = '#c73e3e';
 }

 return (
  <CircularProgressbar
   strokeWidth={10}
   value={props.percentage}
   text={`${props.percentage}`}
   styles={buildStyles({
    pathColor: color,
    textColor: color,
    textSize: '20px',
   })}
  />
 );
}
