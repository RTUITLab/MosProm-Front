import { GetStaticProps } from 'next';
import styles from '../../styles/account.module.scss';
import Image from 'next/image';
import { Button, Menu } from 'antd';
import GlobalContext from '../../contexts/globalContext';
import {
 ContactsOutlined,
 MenuFoldOutlined,
 MenuUnfoldOutlined,
 NotificationOutlined,
 OrderedListOutlined,
 QrcodeOutlined,
 UnorderedListOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Switch from '../../components/accountChapters/switch';
import { LiftObjectInterface } from '../../types/liftObject';
import getLiftsList from '../../services/getLiftsList';

const { SubMenu } = Menu;

declare module 'react' {
 interface HTMLAttributes<T> {
  menuHidden?: any;
 }
}

export default function Index(props: any) {
 const [state, editState] = useState({
  activeView: '1',
  lifts: [],
  loading: false,
 });
 const setState = (e: object) => {
  editState({ ...state, ...e });
 };
 const [menuHidden, setHiddenMenu] = useState(true);

 useEffect(() => {
  setState({ loading: true });
  getLiftsList(false).then((r) => {
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
    <div className={styles.leftMenu} menuHidden={menuHidden + ''}>
     <div className={styles.buttonContainer}>
      <Button
       type="primary"
       onClick={() => {
        setHiddenMenu(!menuHidden);
       }}
       style={{ marginBottom: 16 }}>
       {React.createElement(menuHidden ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
     </div>
     <div className={styles.menuHeader}>
      <Image
       width={80}
       height={80}
       className={styles.logo}
       src={'/images/logo.png'}
      />
      <h2>
       Щербинский лифтостроительный <br />
       завод
      </h2>
     </div>
     <Menu
      onClick={(e) => {
       setState({ activeView: e.key });
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      inlineCollapsed={menuHidden}
      mode="inline">
      <Menu.Item key="1" icon={<UnorderedListOutlined />}>
       Список лифтов
      </Menu.Item>
      <Menu.Item key="2" icon={<QrcodeOutlined />}>
       Отсканировать QR
      </Menu.Item>
      <Menu.Item key="3" icon={<NotificationOutlined />}>
       Репорты
      </Menu.Item>
      <Menu.Item key="4" icon={<OrderedListOutlined />}>
       Задачи
      </Menu.Item>
      <Menu.Item key="5" icon={<ContactsOutlined />}>
       Контакты
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
