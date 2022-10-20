import { useReducer, ReactNode } from 'react';
import { GH_URL, GH_TOKEN, GHContext } from './GithubActions';
import { GHReducer } from './GithubReducer';

interface action {
  type: string;
  payload?: any;
}
export interface AppContextInterface {
  users: any[];
  loading: boolean;
  user: any;
  repos: any;

  clearUsers: () => void;
  getUser: (login: string | undefined) => void;
  getUserRepos: (login: string | undefined) => void;
  dispatch: React.Dispatch<action>;
}
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

type login = string | undefined;

export const GHProvider = ({ children }: Props) => {
  const initialState = { users: [], loading: false, user: {}, repos: {} };
  const [state, dispatch] = useReducer(GHReducer, initialState);

  const getUser = async (login: login) => {
    setLoading();
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

  const getUserRepos = async (login: login) => {
    setLoading();
    const params = new URLSearchParams({ sort: 'created', per_page: '10' });
    const res = await fetch(`${GH_URL}/users/${login}/repos`, {
      headers: { Authorization: `token ${GH_TOKEN}` },
    });

    const data = await res.json();

    dispatch({ type: 'GET_REPOS', payload: data });
  };

  //Clear Users from State
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  //Set Loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GHContext.Provider
      value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GHContext.Provider>
  );
};

export default GHContext;
