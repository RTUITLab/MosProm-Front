import styles from '../../../styles/list.module.scss';
import React, { useContext } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import { Button, Card, Input, Spin } from 'antd';
import { LiftObjectInterface } from '../../../types/liftObject';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import deleteElevator from '../../../services/deleteElevator';
import getLiftsList from '../../../services/getLiftsList';

export default function List(props: any) {
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
      setState({ activeView: 'addLift', liftId: undefined });
     }}
    />
   </div>
   <div className={styles.list}>
    <Card>
     <table>
      {state.lifts.map((e: LiftObjectInterface) => {
       return (
        <React.Fragment key={e.id}>
         <tr>
          <td>{e.model}</td>
          <td>{e.address}</td>
          <td>{e.title}</td>
          <td>
           <span className={styles.statusSpan}>Исправен</span>
          </td>
          <td>
           <Button
            icon={<EditOutlined />}
            onClick={() => {
             setState({ activeView: 'editLift', liftId: e.id });
            }}
           />
           <Button
            icon={<DeleteOutlined />}
            onClick={() => {
             deleteElevator(e.id).then(() => {
              getLiftsList(false).then((e) => {
               setState({ lifts: e, loading: false });
              });
             });
             setState({ loading: true, lifts: [] });
            }}
           />
          </td>
          <td>{e.service ? e.service.name : '-'}</td>
          <td>
           <Button
            type={'primary'}
            onClick={() => {
             setState({ activeView: 'lift', liftId: e.id });
            }}>
            Перейти
           </Button>
          </td>
         </tr>
        </React.Fragment>
       );
      })}
      <thead>
       <tr>
        <th>Модель</th>
        <th>Адрес</th>
        <th>Название</th>
        <th>Статус</th>
        <th>Операции</th>
        <th>Управляющая</th>
        <th>Действие</th>
       </tr>
      </thead>
     </table>
     {state.loading ? (
      <div
       style={{
        width: '100%',
        display: 'flex',
        paddingTop: '20px',
        justifyContent: 'center',
       }}>
       <Spin size="large" />{' '}
      </div>
     ) : null}
    </Card>
   </div>
  </div>
 );
}
