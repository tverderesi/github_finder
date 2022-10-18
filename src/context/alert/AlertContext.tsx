import { createContext, useReducer, ReactNode } from 'react';
import alertReducer from './AlertReducer';

interface AlertContextInterface {
  alert: string | unknown;
  setAlert: (msg: string, type: string) => void;
}
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const AlertContext = createContext({} as AlertContextInterface);

export const AlertProvider = ({ children }: Props) => {
  const initialState = null;
  const [state, dispatch] = useReducer(alertReducer, initialState);
  const setAlert = (msg: string, type: string) => {
    dispatch({ type: 'SET_ALERT', payload: { msg, type } });
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
  };
  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>{children}</AlertContext.Provider>
  );
};

export default AlertContext;
