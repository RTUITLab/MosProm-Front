import styles from '../../../styles/editLift.module.scss';
import { AutoComplete, Button, Card, Cascader, Input, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useContext, useRef } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import { LiftObjectInterface } from '../../../types/liftObject';
import getLiftsList from '../../../services/getLiftsList';
import addLift from '../../../services/addLift'

export default function EditLift() {
 const { state, setState } = useContext(GlobalContext);
 let lift = state.lifts.find((e: LiftObjectInterface) => e.id === state.liftId);
 const input: any = useRef<React.Ref<any>>();

 lift = lift || {};
 return (
  <div className={styles.parent}>
   <h1>Поиск лифта</h1>

   <div className={styles.content}>
    <Card>
     <div className={styles.contentChildren}>
      <div>
       <h2>MAC-адрес</h2>
       <div style={{ maxWidth: '600px' }}>
        <Input.Group compact>
         <Input
          placeholder={'Введите MAC-адрес'}
          defaultValue={lift.title || ''}
          ref={input}
         />
        </Input.Group>
       </div>
       <br />
       <Button
        type={'primary'}
        onClick={() => {
         let mac = input.current.input.value;
         addLift(mac);
         setState({ activeView: '1' });
        }}>
        Добавить
       </Button>
      </div>
      <div className={styles.imgParent}>
       <img src="/images/elevator.png" alt="" />
      </div>
     </div>
    </Card>
   </div>
  </div>
 );
}
