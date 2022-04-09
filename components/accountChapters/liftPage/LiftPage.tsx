import styles from '../../../styles/LiftPage.module.scss';
import { lazy, useContext } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import dynamic from 'next/dynamic';
import Graph from '../../d3/graph';
import { Button, Card } from 'antd';
import Image from 'next/image';
import { LiftObjectInterface } from '../../../types/liftObject';

export default function LiftPage() {
 const { state, setState } = useContext(GlobalContext);
 const lift = state.lifts.find(
  (e: LiftObjectInterface) => e.id === state.liftId
 );

 return (
  <div className={styles.parent}>
   <h1>Информация о лифте</h1>
   <div className={styles.content}>
    <Card className={styles.liftInfoContainer}>
     <div className={styles.liftInfoCard}>
      <img className={styles.logo} src={'/images/liftExample.png'} />
      <div className={styles.liftInfo}>
       <h2>{lift.title}</h2>
       <div>
        <b>Адрес:</b> {lift.address}
       </div>
       <div>
        <b>Модель: </b>
        {lift.model}
       </div>
      </div>
      <div>
       <Button>Редактировать</Button>
      </div>
     </div>
    </Card>
    <Card>
     <h2>Состояние</h2>
     <div className={styles.graphParent}>
      <div>
       <Graph />
      </div>
      <div>
       <Graph />
      </div>
      <div>
       <Graph />
      </div>
      <div>
       <Graph />
      </div>
      <div>
       <Graph />
      </div>
     </div>
    </Card>
   </div>
  </div>
 );
}
