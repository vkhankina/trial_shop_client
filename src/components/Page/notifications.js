import { useContext } from "react";
import Alert from "antd/lib/alert";
import NotificationsContext from "../../contexts/notifications";

function Notifications() {
  const { notifications, close } = useContext(NotificationsContext);

  const variants = {
    success: "success",
    info: "info",
    warn: "warning",
    error: "error",
  };

  return (
    <div>
      {notifications.map((n) => (
        <Alert
          message={n.text}
          key={n.id}
          type={variants[n.level]}
          closable
          onClose={() => close(n.id)}
        />
      ))}
    </div>
  );
}

export default Notifications;
