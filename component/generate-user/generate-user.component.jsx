import React, { useState } from "react";
import io from "socket.io-client";
import CustomButton from "../custom-button/custom-button.component";
import { makeStyles } from "@material-ui/core/styles";
import mockData from '../../../defiance-prototipes/drivers-with-orders/d-orders.json'

// const ENDPOINT = "https://defiance-prod.herokuapp.com/"
const ENDPOINT = "http://localhost:3002"

export const useStyles = makeStyles({
  root: {
    margin: "10px",
    height: "30px",

    color: (props) =>
      props.role === "manager"
        ? "cyan"
        : props.is_connect_or_disconnect
        ? "red"
        : "white",
  },
  label: {},
});

const GenerateUser = ({ id, storeId, role, name }) => {
  const [sockets, setSockets] = useState({});
  const [is_connect_or_disconnect, setConnectionStyling] = useState(false);
  const newuser = (number) => {
    setConnectionStyling(!is_connect_or_disconnect);
    if (Object.keys(sockets).length === 0) {
      const socket = io(ENDPOINT);
      const conv = sockets;
      conv[number] = socket;
      setSockets(conv);
      socket.on("connect", () => {
        socket.emit("new-user", {
          store: storeId,
          id: number,
          role: role,
        });
        console.log("this happend")
        socket.on("order-display", data =>{
          console.log("new-order: ",data)
        });
      });
    } else {
      if (sockets[number]) {
        sockets[number].disconnect();
        delete sockets[number];
      } else {
        const socket = io(ENDPOINT);
        const conv = sockets;
        conv[number] = socket;
        setSockets(conv);
        socket.on("connect", () => {
          socket.emit("new-user", {
            store: storeId,
            id: number,
            role: role,
          });
        });
        
      }
    }
  };
  const sendPosition = (socket) => {
    socket.emit("position", {lat: 1, lng: 2})
  };
  const sendOrderBundle = (socket) => {
    socket.emit("order-bundles", mockData);
  };
  const sendOrderStatus = (socket) => {
    console.log("update order")
    socket.emit("order-status", {status: "complete", location: {lat: 50, lng: 50}, orderNumber: 82});
  };
  const classes = useStyles({
    role: role,
    is_connect_or_disconnect: is_connect_or_disconnect,
  });

  return (
    <div style={{ display: "flex" }}>
      <CustomButton
        variant="outlined"
        color="inherit"
        onClick={() => newuser(id)}
        className={classes.root}
      >
        {is_connect_or_disconnect ? `Disconnect ${name} ` : ` Connect ${name}`}
      </CustomButton>

      {is_connect_or_disconnect ? (
        <CustomButton
          variant="outlined"
          color="inherit"
          className={classes.root}
          style={{ color: "lightgreen" }}
          onClick={() => sendPosition(sockets[id])}
        >
          {" "}
          position{" "}
        </CustomButton>
      ) : (
        ""
      )}

      {is_connect_or_disconnect ? (
        <CustomButton
          variant="outlined"
          color="inherit"
          className={classes.root}
          style={{ color: "lightgreen" }}
          onClick={() => sendOrderBundle(sockets[id])}
        >
          {" "}
          send bundle{" "}
        </CustomButton>
      ) : (
        ""
      )}

      {is_connect_or_disconnect ? (
        <CustomButton
          variant="outlined"
          color="inherit"
          className={classes.root}
          style={{ color: "lightgreen" }}
          onClick={() => sendOrderStatus(sockets[id])}
        >
          {" "}
          order status{" "}
        </CustomButton>
      ) : (
        ""
      )}
    </div>
  );
};

export default GenerateUser;
