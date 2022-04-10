import styles from '../../../styles/editLift.module.scss';
import { AutoComplete, Button, Card, Cascader, Input, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useContext, useEffect, useRef, useState } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import { LiftObjectInterface } from '../../../types/liftObject';
import getLiftsList from '../../../services/getLiftsList';
import addLift from '../../../services/addLift';

export default function EditLift() {
 const { state, setState } = useContext(GlobalContext);
 let lift = state.lifts.find((e: LiftObjectInterface) => e.id === state.liftId);
 const [all, setAll] = useState([]);
 const [mac, setMac] = useState();

 useEffect(() => {
  getLiftsList(true).then((e: any) => {
   setAll(e.map((j: any) => j.MAC));
  });
 }, []);

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
         <Select
          onSelect={(e: any) => {
           setMac(e);
          }}
          style={{ width: '100%' }}
          defaultValue={''}>
          {all.map((e: any, i: number) => {
           return (
            <Option key={i} value={e}>
             {e}
            </Option>
           );
          })}
         </Select>
        </Input.Group>
       </div>
       <br />
       <Button
        type={'primary'}
        onClick={() => {
         setState({ activeView: '1', loading: true, lifts: [] });
         addLift(mac).then(() => {
          getLiftsList(false).then((e) => {
           setState({ lifts: e, loading: false, activeView: '1' });
          });
         });
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
