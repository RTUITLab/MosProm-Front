import styles from '../../../styles/list.module.scss';
import { useContext } from 'react';
import GlobalContext from '../../../contexts/globalContext';
import { Button, Card, Input, Layout, Spin } from 'antd';
import { LiftObjectInterface } from '../../../types/liftObject';
import RoundChart from '../../d3/RoundChart';
import {
 DeleteOutlined,
 EditOutlined,
 LoadingOutlined,
 PlusOutlined,
} from '@ant-design/icons';
import React from 'react';
import { io } from 'socket.io-client';

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
      <tr>
       <th>Модель</th>
       <th>Адрес</th>
       <th>Название</th>
       <th>Статус</th>
       <th>Операции</th>
       <th>Управляющая</th>
       <th>Действие</th>
      </tr>
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
           <Button icon={<DeleteOutlined />} />
          </td>
          <td>{e.service.name}</td>
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
