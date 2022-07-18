import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Main from '../../pages/Main';

describe('Main page test', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </RecoilRoot>,
    );
  });

  it('"Gyro PONG" 문구가 떠야 합니다', () => {
    expect(screen.getByText('| Gyro PONG |')).toBeInTheDocument();
  });

  it('화면에 세 개의 버튼이 모두 떠야 합니다', () => {
    expect(screen.getByText('설정')).toBeInTheDocument();
    expect(screen.getByText('게임 시작')).toBeInTheDocument();
    expect(screen.getByText('도움말')).toBeInTheDocument();
  });
});
