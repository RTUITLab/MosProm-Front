import styles from '../../../styles/LiftPage.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import Graph from '../../d3/graph';
import { Button, Card } from 'antd';
import { LiftObjectInterface } from '../../../types/liftObject';
import RoundChart from '../../d3/RoundChart';
import { io } from 'socket.io-client';

declare global {
 export interface Window {
  PieChart?: any;
 }
}

export default function LiftPage() {
 const { state, setState } = useContext(GlobalContext);
 const lift = state.lifts.find(
  (e: LiftObjectInterface) => e.id === state.liftId
 );
 const [chart1, setChart1] = useState({});

 useEffect(() => {
  const socket = io('http://192.168.137.55:8099', {
   path: '/case/2/ws/socket.io',
   transports: ['websocket'],
   auth: {},
  });

  socket.on('change_color', (...args: any) => {
   setChart1({ x: args[0].x, y: args[0].y });
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
       <p>{lift.address}</p>
      </div>
      <div style={{ display: 'flex', columnGap: '20px' }}>
       <div className={styles.roundCharts}>
        <RoundChart percentage={100} />
        <span>Влажность</span>
       </div>
       <div className={styles.roundCharts}>
        <RoundChart percentage={60} />
        <span>Влажность</span>
       </div>
       <div className={styles.roundCharts}>
        <RoundChart percentage={50} />
        <span>Влажность</span>
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
       <Graph />
      </div>
      <div className={styles.descChart}>
       <div className={styles.bigText}>$850.454.2</div>
       <span>Total income</span>
      </div>
     </div>
    </Card>
    <div className={styles.chartsParent}>
     <Card>
      <Graph data={chart1} />
     </Card>
     <Card>
      <Graph data={chart1} />
     </Card>
     <Card>
      <Graph data={chart1} />
     </Card>
    </div>
   </div>
  </div>
 );
}
