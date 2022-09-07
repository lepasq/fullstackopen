const Notification = ({ message, success }) => {
  const successStyle = {
    color: "green",
    borderStyle: "solid",
    backgroundColor: "lightGrey",
    padding: 10,
    marginBottom: 10,
  };

  const errStyle = {
    ...successStyle,
    color: "red",
  };

  if (message === null) {
    return null;
  }

  return <div style={success ? successStyle : errStyle}>{message}</div>;
};

export default Notification;
