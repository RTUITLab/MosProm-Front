import styles from '../../../styles/LiftPage.module.scss';
import { useContext } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import Graph from '../../d3/graph';
import { Card } from 'antd';
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
     <h2>{lift.model}</h2>
     <p>{lift.address}</p>
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
      <Graph />
     </Card>
     <Card>
      <Graph />
     </Card>
     <Card>
      <Graph />
     </Card>
    </div>
   </div>
  </div>
 );
}
