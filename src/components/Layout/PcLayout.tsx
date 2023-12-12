import styled from 'styled-components';

import MotionReceiver from '@components/MotionReceiver/MotionReceiver';

const LayoutBase = styled.div`
  height: 100%;

  header {
    width: 100%;
    min-height: 5rem;
    padding: 0 5rem;
  }

  main {
    height: calc(100% - 10rem);
    &:not(:has(div.game)) {
      padding: 0 5rem;
    }
  }

  footer {
    width: 100%;
    height: 5rem;
    min-height: 5rem;
  }
`;

interface Props {
  children: React.ReactNode;
}

const PcLayout = ({ children }: Props) => {
  return (
    <LayoutBase className="pc">
      <header></header>
      <main>{children}</main>
      <footer>
        <MotionReceiver />
      </footer>
    </LayoutBase>
  );
};

export default PcLayout;
