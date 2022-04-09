import styles from '../../../styles/list.module.scss';
import { useContext } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import { Button, Card, Input, Layout } from 'antd';
import Image from 'next/image';
import { LiftObjectInterface } from '../../../types/liftObject';
import { PlusOutlined } from '@ant-design/icons';

export default function list(props: any) {
 const { state, setState } = useContext(GlobalContext);

 return (
  <div className={styles.parent}>
   <h1>Список лифтов</h1>
   <div className={styles.searchContainer}>
    <Input size={'large'} placeholder={'Поиск'} />
    <Button
     size={'large'}
     type="primary"
     icon={<PlusOutlined />}
     onClick={() => {
      setState({ activeView: 'editLift', liftId: undefined });
     }}
    />
   </div>
   <div className={styles.list}>
    {state.lifts.map((e: LiftObjectInterface) => {
     return (
      <Card className={styles.cardContainer}>
       <div className={styles.cardParent}>
        <img className={styles.logo} src={'/images/liftExample.png'} />
        <div className={styles.liftInfo}>
         <h2>{e.title}</h2>
         <div>
          <b>Адрес:</b> {e.address}
         </div>
         <div>
          <b>Модель: </b>
          {e.model}
         </div>
         <div className={styles.buttonContainer}>
          <Button
           onClick={() => {
            setState({ activeView: 'lift', liftId: e.id });
           }}>
           Перейти
          </Button>
         </div>
        </div>
       </div>
      </Card>
     );
    })}
   </div>
  </div>
 );
}
