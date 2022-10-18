import { createContext, useReducer, ReactNode } from 'react';
import { GHReducer } from './GithubReducer';

interface AppContextInterface {
  users: any[];
  loading: boolean;
  searchUsers: (text: string) => Promise<void>;
  clearUsers: () => void;
}
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const GHContext = createContext({} as AppContextInterface);
const GH_URL = process.env.REACT_APP_GH_URL;
const GH_TOKEN = process.env.REACT_APP_GH_TOKEN;

export const GHProvider = ({ children }: Props) => {
  const initialState = { users: [], loading: false };
  const [state, dispatch] = useReducer(GHReducer, initialState);

  const searchUsers = async (text: string) => {
    setLoading();
    const params = new URLSearchParams({ q: text });

    const test = `${GH_URL}/search/users?${params}`;
    console.log(test);
    const res = await fetch(test, {
      headers: { Authorization: `token ${GH_TOKEN}` },
    });

    const { items } = await res.json();
    console.log(items);
    dispatch({ type: 'GET_USERS', payload: items });
  };

  //Clear Users from State
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  //Set Loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GHContext.Provider
      value={{ users: state.users, loading: state.loading, searchUsers, clearUsers }}
    >
      {children}
    </GHContext.Provider>
  );
};

export default GHContext;
