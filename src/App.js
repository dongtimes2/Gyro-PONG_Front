import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import GlobalStyles from './components/GlobalStyles';
import SocketEvent from './constants/socket';
import Controller from './pages/Controller';
import Guides from './pages/Guides';
import Main from './pages/Main';
import Settings from './pages/Settings';
import userState from './recoil/userState';
import { requestUserId, socket } from './utils/socketAPI';

function App() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    requestUserId();

    socket.on(SocketEvent.RECEIVE_USER_ID, (id) => {
      setUser((prev) => {
        return { ...prev, id };
      });
    });

    socket.on(SocketEvent.RECEIVE_CONTROLLER_ID, (controllerId) => {
      setUser((prev) => {
        return { ...prev, controllerId };
      });
    });

    socket.on(SocketEvent.REMOVE_CONTROLLER, () => {
      setUser((prev) => {
        return { ...prev, controllerId: '' };
      });
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/controller/:userId" element={<Controller />} />
      </Routes>
    </>
  );
}

export default App;
