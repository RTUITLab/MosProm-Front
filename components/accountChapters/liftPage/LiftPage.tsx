import styles from '../../../styles/LiftPage.module.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import Graph3 from '../../d3/graph3';
import { Button, Card } from 'antd';
import { LiftObjectInterface } from '../../../types/liftObject';
import RoundChart from '../../d3/RoundChart';
import { io } from 'socket.io-client';

declare global {
 export interface Window {
  PieChart?: any;
  socket?: any;
 }
}

export default function LiftPage() {
 const { state, setState } = useContext(GlobalContext);
 const lift = state.lifts.find(
  (e: LiftObjectInterface) => e.id === state.liftId
 );

 let init: any = {};
 const [chart1, setChart1] = useState(init);
 const [chart2, setChart2] = useState(init);
 const [chart3, setChart3] = useState(init);
 const [chart4, setChart4] = useState(init);
 const [chart5, setChart5] = useState(init);
 const [chart6, setChart6] = useState(init);
 const [chart7, setChart7] = useState(init);
 const [chart8, setChart8] = useState(init);

 useEffect(() => {
  if (window.socket) {
   window.socket.disconnect();
  }
  window.socket = io('http://192.168.137.55:8099', {
   path: '/case/2/ws/socket.io',
   transports: ['websocket'],
   auth: {},
  });
  let k = Math.random() * 10;
  window.socket.emit('button', 'fd');
  window.socket.on('change_color', (...args: any) => {
   console.log(args, k);
   new Promise<void>((resolve) => {
    setChart1({
     x: args[0].vibration.x,
     y: args[0].vibration.y,
     predX: args[0].vibration.pred_x,
     predY: args[0].vibration.pred_y,
     maxX: args[0].vibration.max_x,
     maxY: args[0].vibration.max_y,
    });
    setChart2({
     x: args[0].humidity.x,
     y: args[0].humidity.y,
     predX: args[0].humidity.pred_x,
     predY: args[0].humidity.pred_y,
    });
    setChart3({
     x: args[0].revolutions.x,
     y: args[0].revolutions.y,
     predX: args[0].revolutions.pred_x,
     predY: args[0].revolutions.pred_y,
    });
    setChart4({
     x: args[0].x1.x,
     y: args[0].x1.y,
     predX: args[0].x1.pred_x,
     predY: args[0].x1.pred_y,
    });
    setChart5({
     x: args[0].x2.x,
     y: args[0].x2.y,
     predX: args[0].x2.pred_x,
     predY: args[0].x2.pred_y,
    });
    setChart6({
     x: args[0].x3.x,
     y: args[0].x3.y,
     predX: args[0].x3.pred_x,
     predY: args[0].x3.pred_y,
    });
    setChart7({
     x: args[0].x4.x,
     y: args[0].x4.y,
     predX: args[0].x4.pred_x,
     predY: args[0].x4.pred_y,
    });
    setChart8({
     x: args[0].x5.x,
     y: args[0].x5.y,
     predX: args[0].x5.pred_x,
     predY: args[0].x5.pred_y,
    });
   });
  });
 }, []);

 return (
  <div className={styles.parent}>
   <h1>Информация о лифте</h1>
   <div className={styles.content}>
    <Card>
     <div className={styles.liftInfoContainer}>
      <div>
       <div
        style={{ display: 'flex', columnGap: '15px', alignItems: 'center' }}>
        <h2>{lift.model}</h2>
        <span className={styles.statusSpan}>Исправен</span>
       </div>
       <span>
        <b>Адрес: </b>
        {lift.address}
       </span>
       <br />
       <span>
        <b>Mac-адрес: </b>
        {lift.id}
       </span>
      </div>
      <div
       style={{
        display: 'flex',
        columnGap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
       }}>
       <div className={styles.roundCharts}>
        <RoundChart percentage={100} />
        <span>Влажность</span>
       </div>
       <div className={styles.roundCharts}>
        <RoundChart percentage={60} />
        <span>Обороты</span>
       </div>
       <div className={styles.roundCharts}>
        <RoundChart percentage={50} />
        <span>Вибрация</span>
       </div>
      </div>
      <Button
       onClick={() => {
        setState({ activeView: 'editLift', liftId: lift.id });
       }}>
       Редактировать
      </Button>
     </div>
    </Card>

    <Card style={{ padding: '0px' }}>
     <div className={styles.mainChart}>
      <div>
       <Graph3 title={'Вибрация'} data={chart1} />
      </div>
      <div className={styles.descChart}>
       <div className={styles.bigText}>
        {chart1.x ? chart1.x[chart1.x.length - 1] : ''}
       </div>
       <span>Вибрация</span>
       <hr />
       <div className={styles.bigText}>
        {chart2.x ? chart2.x[chart2.x.length - 1] : ''}
       </div>
       <span>Влажность</span>
       <hr />
       <div className={styles.bigText}>
        {chart3.x ? chart3.x[chart3.x.length - 1] : ''}
       </div>
       <span>Обороты</span>
      </div>
     </div>
    </Card>
    <div className={styles.chartsParent}>
     <Card>
      <Graph3 title={'Влажность'} data={chart2} />
     </Card>
     <Card>
      <Graph3 title={'Обороты'} data={chart3} />
     </Card>

     <Card>
      <Graph3 title={'Датчик дверного шарикоподшипника 1'} data={chart4} />
     </Card>
     <Card>
      <Graph3 title={'Датчик дверного шарикоподшипника 2'} data={chart5} />
     </Card>
    </div>
   </div>
  </div>
 );
}
