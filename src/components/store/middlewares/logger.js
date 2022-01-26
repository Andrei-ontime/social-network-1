export const logger = ({dispatch}) => (next) => (action) => {
    if(typeof action === 'function'){
        action(dispatch)
    }
  if (action.type === "GET_USERS") {
    return next({ ...action, unuqieId: 1000 });
  }

  return next(action);
};
