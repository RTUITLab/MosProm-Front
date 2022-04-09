import type { GetStaticProps, NextPage } from 'next';
import styles from '../styles/index.module.scss';
import { Button, Input } from 'antd';
import { useRef, useState } from 'react';
import { getToken } from '../services/login';
import { LoadingOutlined } from '@ant-design/icons';

export default function Home(props: any) {
 const login: React.Ref<any> = useRef();
 const password: any = useRef();
 const [load, setLoad] = useState(false);

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
      icon={load ? <LoadingOutlined /> : null}
      onClick={() => {
       setLoad(true);
       getToken(login.current.input.value, password.current.input.value)
        .then((e: any) => {
         localStorage.setItem('access_token', e);
         window.location.href = '/account';
         setLoad(false);
        })
        .catch((e) => {
         alert('Ошибка авторизации');
         setLoad(false);
        });
      }}>
      {load ? null : 'Войти'}
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
