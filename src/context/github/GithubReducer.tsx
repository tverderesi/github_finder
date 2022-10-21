interface action {
  type: string;
  payload?: any;
}
interface state {
  users: any;
  loading: boolean;
  user: object;
  repos: any[];
}
export const GHReducer = (state: state, action: action) => {
  switch (action.type) {
    default:
      return state;
    case 'GET_USERS':
      return { ...state, users: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'CLEAR_USERS':
      return { ...state, users: [] };
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
  }
};
