import styles from './editLift.module.scss';
import { AutoComplete, Button, Card, Cascader, Input, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { useContext } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import { LiftObjectInterface } from '../../../types/liftObject';

export default function EditLift() {
 const { state, setState } = useContext(GlobalContext);
 let lift = state.lifts.find((e: LiftObjectInterface) => e.id === state.liftId);

 lift = lift || {};
 return (
  <div className={styles.parent}>
   <h1>Редактирование лифта</h1>

   <div className={styles.content}>
    <Card>
     <div className={styles.contentChildren}>
      <div>
       <h2>Информация</h2>
       <div style={{ maxWidth: '600px' }}>
        <Input.Group compact>
         <Input placeholder={'Название'} defaultValue={lift.title || ''} />
         <br />
         <br />
         <Select
          style={{ width: '100%' }}
          defaultValue={lift.model || 'Standart'}>
          <Option value={'Home'}>Standart</Option>
          <Option value={'Company'}>Premium</Option>
         </Select>
         <br />
         <br />
         <AutoComplete
          style={{ width: '100%' }}
          placeholder="Адрес"
          defaultValue={lift.address || ''}
         />
        </Input.Group>
        <br />
        <AutoComplete
         style={{ width: '100%' }}
         defaultValue={lift?.service?.name || ''}
         placeholder="Управляющая компания"
         options={[{ value: 'text 1' }, { value: 'text 2' }]}
        />
        <br />
        <br />
        <Input placeholder={'MAC-адрес'} defaultValue={lift.MAC || ''} />
       </div>
       <br />
       <Button
        type={'primary'}
        onClick={() => {
         setState({ activeView: '1' });
        }}>
        Сохранить
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
