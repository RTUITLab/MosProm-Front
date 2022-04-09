import { GetStaticProps } from 'next';
import styles from '../../styles/account.module.scss';
import Image from 'next/image';
import { Menu } from 'antd';
import GlobalContext from '../../contexts/globalContext';
import { QrcodeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Switch from '../../components/accountChapters/switch';
import { LiftObjectInterface } from '../../types/liftObject';

const { SubMenu } = Menu;

export default function index(props: any) {
 const lifts: LiftObjectInterface[] = [
  {
   title: 'Какой-то лифт',
   address: 'Moscow',
   id: '12',
   model: 'Standart',
  },
 ];

 const [state, editState] = useState({
  activeView: '1',
  lifts,
 });
 const setState = (e: object) => {
  editState({ ...state, ...e });
 };

 // @ts-ignore
 // @ts-ignore
 return (
  <GlobalContext.Provider
   value={{
    state,
    setState,
   }}>
   <div className={styles.parent}>
    {/* Left menu */}
    <div className={styles.leftMenu}>
     <div className={styles.menuHeader}>
      <Image
       width={70}
       height={70}
       className={styles.logo}
       src={'/images/logo.png'}
      />
      <h2>Company name</h2>
     </div>
     <Menu
      onClick={(e) => {
       setState({ activeView: e.key });
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      inlineCollapsed={false}
      mode="inline">
      <Menu.Item key="1" icon={<UnorderedListOutlined />}>
       Список лифтов
      </Menu.Item>
      <Menu.Item key="2" icon={<QrcodeOutlined />}>
       Отсканировать QR
      </Menu.Item>
     </Menu>
    </div>

    {/* Content of the page */}
    <div className={styles.content}>{Switch(state)}</div>
   </div>
  </GlobalContext.Provider>
 );
}

export function getStaticProps(context: GetStaticProps) {
 return {
  props: {},
 };
}
