import { Route, Routes } from 'react-router-dom';

import GlobalStyles from './components/GlobalStyles';
import Guides from './pages/Guides';
import Main from './pages/Main';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
