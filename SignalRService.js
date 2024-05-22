import { HubConnectionBuilder } from '@microsoft/signalr';
import { BASE_URL } from '../../config'; // Correct import path for BASE_URL

class SignalRService {
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}chatHub`)
      .build();

    this.startConnection();
    this.addReconnectionListener();
  }

  startConnection = () => {
    if (this.connection.state !== "Connected") {
      this.connection.start()
        .then(() => console.log("SignalR Connected"))
        .catch(err => console.error("SignalR Connection Error: ", err));
    }
  }

  stopConnection = () => {
    this.connection.stop()
      .then(() => console.log("SignalR Disconnected"))
      .catch(err => console.error("SignalR Disconnection Error: ", err));
  }

  sendMessage = (user, message) => {
    if (this.connection.state === "Connected") {
      this.connection.invoke("SendMessage", user, message)
        .catch(err => console.error("SignalR SendMessage Error: ", err));
    } else {
      console.error("SignalR connection is not in the 'Connected' state.");
    }
  }

  addReceiveMessageListener = (callback) => {
    this.connection.on("ReceiveMessage", callback);
  }

  addReconnectionListener = () => {
    this.connection.onclose((err) => {
      console.log("SignalR Connection Closed. Attempting to reconnect...");
      this.startConnection();
    });
  }
}

export default new SignalRService();
