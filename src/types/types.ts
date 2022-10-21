export type searchUsersType = (text: string) => Promise<void>;

export type user = {
    name: string;
    type: string;
    avatar_url: string;
    location: string;
    bio: string;
    blog: string;
    twitter_username: string;
    html_url: string;
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
    hireable: boolean;
    websiteUrl: string;
}
export type Action = {
    type: string;
    payload?: any;
  }
export type AppContextInterface = {
    users: user[];
    loading: boolean;
    user: user;
    repos: repoType[];
    dispatch: React.Dispatch<Action>;
}


export type getUserAndReposType = (login: string | undefined) => void;



export type repoType = {
    name: string
    description: string
    html_url: string
    forks: number
    open_issues : number
    watchers_count: number
    stargazers_count: number
    id: number
}