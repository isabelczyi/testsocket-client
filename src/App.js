import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
const socket = io.connect(
  'https://testsocket-hopethisworks-server.onrender.com'
);

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, []);
  const sendMessage = () => {
    socket.emit('message_sent', { message: message });
  };

  return (
    <div className="App">
      <input
        placeholder="Type message here"
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
