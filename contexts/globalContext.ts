import React from 'react';
import { GlobalContextInterface } from '../types/GlobalContext';

const context = React.createContext<GlobalContextInterface>({
 setState(e: object): void {},
 state: {},
});

export default context;
