import { HashRouter } from 'react-router-dom';

import GlobalStyles from 'src/styles/GlobalStyles';

interface Props {
  children: React.ReactNode;
}

const AppContainer = ({ children }: Props) => {
  return (
    <HashRouter>
      <GlobalStyles />
      {children}
    </HashRouter>
  );
};

export default AppContainer;
