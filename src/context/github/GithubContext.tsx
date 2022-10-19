import { createContext, useReducer, ReactNode } from 'react';
import { GHReducer } from './GithubReducer';

interface AppContextInterface {
  users: any[];
  loading: boolean;
  searchUsers: (text: string) => Promise<void>;
  clearUsers: () => void;
  user: any;
  getUser: (login: string | undefined) => void;
}
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

type login = string | undefined;

const GHContext = createContext({} as AppContextInterface);
const GH_URL = process.env.REACT_APP_GH_URL;
const GH_TOKEN = process.env.REACT_APP_GH_TOKEN;

export const GHProvider = ({ children }: Props) => {
  const initialState = { users: [], loading: false, user: {} };
  const [state, dispatch] = useReducer(GHReducer, initialState);

  const searchUsers = async (text: string) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const res = await fetch(`${GH_URL}/search/users?${params}`, {
      headers: { Authorization: `token ${GH_TOKEN}` },
    });

    const { items } = await res.json();
    dispatch({ type: 'GET_USERS', payload: items });
  };

  const getUser = async (login: login) => {
    setLoading();
    console.log(login);

    const res = await fetch(`${GH_URL}/users/${login}`, {
      headers: { Authorization: `token ${GH_TOKEN}` },
    });

    if (res.status === 404) {
      window.location.href = '/notfound';
    } else {
      const data = await res.json();
      dispatch({ type: 'GET_USER', payload: data });
    }
  };

  //Clear Users from State
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  //Set Loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GHContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GHContext.Provider>
  );
};

export default GHContext;
