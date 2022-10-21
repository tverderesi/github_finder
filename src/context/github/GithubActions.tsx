import { searchUsersType, getUserAndReposType } from '../../types/types';
import axios from 'axios';
//env names

export const GH_URL = process.env.REACT_APP_GH_URL;
export const GH_TOKEN = process.env.REACT_APP_GH_TOKEN;

const github = axios.create({
  baseURL: GH_URL,
  headers: { Authorization: `token ${GH_TOKEN}` },
});

export const searchUsers: searchUsersType = async text => {
  const params = new URLSearchParams({ q: text });
  const res = await github.get(`/search/users?${params}`);
  return res.data.items;
};

export const getUserAndRepos: getUserAndReposType = async login => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
