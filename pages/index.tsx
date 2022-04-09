import type { GetStaticProps, NextPage } from 'next';
import styles from '../styles/index.module.scss';
import { Button, Input } from 'antd';
import { useRef } from 'react';
import { getToken } from '../services/login';

export default function Home(props: any) {
 const login: React.Ref<any> = useRef();
 const password: any = useRef();

 return (
  <div className={styles.parent}>
   <div className={styles.authView}>
    <div className={styles.authViewContent}>
     <h1>Авторизация сотрудников</h1>
     <Input ref={login} placeholder={'Логин'} />
     <Input ref={password} placeholder={'Пароль'} type={'password'} />
     <Button
      type="primary"
      block
      onClick={() => {
       getToken(login.current.value, password.current.value).then((e) => {
        alert(e);
       });
      }}>
      Войти
     </Button>
    </div>
   </div>
  </div>
 );
}

export function getStaticProps(context: GetStaticProps) {
 return {
  props: {},
 };
}
