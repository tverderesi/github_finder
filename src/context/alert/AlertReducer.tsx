interface action {
  type: string;
  payload?: any;
}

const AlertReducer = (state: string, action: action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return action.payload;
    case 'REMOVE_ALERT':
      return null;
    default:
      return state;
  }
};

export default AlertReducer;
