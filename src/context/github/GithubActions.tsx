import { createContext } from 'react';
import { AppContextInterface } from './GithubContext';

//env names
export const GHContext = createContext({} as AppContextInterface);
export const GH_URL = process.env.REACT_APP_GH_URL;
export const GH_TOKEN = process.env.REACT_APP_GH_TOKEN;

//typing
type searchUsersType = (text: string) => Promise<void>;

export const searchUsers: searchUsersType = async text => {
  const params = new URLSearchParams({ q: text });
  const res = await fetch(`${GH_URL}/search/users?${params}`, {
    headers: { Authorization: `token ${GH_TOKEN}` },
  });

  const { items } = await res.json();
  return items;
};
