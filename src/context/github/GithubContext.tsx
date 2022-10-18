import { createContext, useReducer, ReactNode } from 'react';
import { GHReducer } from './GithubReducer';

interface AppContextInterface {
  users: any[];
  loading: boolean;
  fetchUsers: Function;
}

const GHContext = createContext({} as AppContextInterface);

const GH_URL = process.env.REACT_APP_GH_URL;
const GH_TOKEN = process.env.REACT_APP_GH_TOKEN;

interface Props {
  children?: ReactNode;
  // any props that come into the component
}
export const GHProvider = ({ children }: Props) => {
  const initialState = { users: [], loading: true };
  const [state, dispatch] = useReducer(GHReducer, initialState);

  const fetchUsers = async () => {
    const res = await fetch(`${GH_URL}/users`, {
      headers: { Authorization: `token ${GH_TOKEN}` },
    });
    const data = await res.json();
    dispatch({ type: 'GET_USERS', payload: data });
  };
  return (
    <GHContext.Provider value={{ users: state.users, loading: state.loading, fetchUsers }}>
      {children}
    </GHContext.Provider>
  );
};

export default GHContext;
