import { GetStaticProps } from 'next';
import styles from '../../styles/account.module.scss';
import Image from 'next/image';
import { Menu } from 'antd';
import GlobalContext from '../../contexts/globalContext';
import { QrcodeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Switch from '../../components/accountChapters/switch';
import { LiftObjectInterface } from '../../types/liftObject';
import getLiftsList from '../../services/getLiftsList';

const { SubMenu } = Menu;

export default function Index(props: any) {
 const [state, editState] = useState({
  activeView: '1',
  lifts: [],
  loading: false,
 });
 const setState = (e: object) => {
  editState({ ...state, ...e });
 };

 useEffect(() => {
  setState({ loading: true });
  getLiftsList().then((r) => {
   setState({ lifts: r, loading: false });
  });
 }, []);

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
