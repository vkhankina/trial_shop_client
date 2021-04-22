import { useReducer, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const noOp = () => {};

const initialState = [];

const NotificationsContext = createContext({
  notifications: initialState,
  error: noOp(),
  warn: noOp(),
  info: noOp(),
  success: noOp(),
  close: noOp(),
});

function reducer(state, { type, payload }) {
  switch (type) {
    case "notifications.add":
      return [...state, payload];
    case "notifications.remove":
      const { id } = payload;
      return state.filter((n) => n.id !== id);
    default:
      throw new Error(`Unknown action in notifications reducer: ${type}`);
  }
}

function NotificationsProvider({ children }) {
  const [notifications, dispatch] = useReducer(reducer, initialState);

  const notify = (text, level) => {
    const id = uuidv4();
    dispatch({ type: "notifications.add", payload: { text, level, id } });
    return id;
  };

  const close = (id) =>
    dispatch({ type: "notifications.remove", payload: { id } });

  const error = (text) => notify(text, "error");
  const warn = (text) => notify(text, "warn");
  const info = (text) => notify(text, "info");
  const success = (text) => {
    const id = notify(text, "success");
    setTimeout(() => close(id), 15000);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        error,
        warn,
        info,
        success,
        close,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

NotificationsProvider.propTypes = {
  children: PropTypes.node,
};

NotificationsProvider.defaultProps = {
  children: null,
};

export { NotificationsProvider };
export default NotificationsContext;
