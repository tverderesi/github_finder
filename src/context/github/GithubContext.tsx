import { useReducer, ReactNode, createContext } from 'react';
import { AppContextInterface } from '../../types/types';
import { GHReducer } from './GithubReducer';

const GHContext = createContext({} as AppContextInterface);
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const GHProvider = ({ children }: Props) => {
  const initialState = { users: [], loading: false, user: {}, repos: [] };
  const [state, dispatch] = useReducer(GHReducer, initialState);

  return (
    <GHContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GHContext.Provider>
  );
};

export default GHContext;
