import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Lobby from '../../pages/Lobby';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

describe('Lobby page test', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Lobby />
        </BrowserRouter>
      </RecoilRoot>,
    );
  });

  it('"Game List" 문구가 떠야 합니다', () => {
    expect(screen.getByText('| GAME LIST |')).toBeInTheDocument();
  });

  it('화면에 모든 버튼이 떠야 합니다', () => {
    expect(screen.getByText('게임 생성하기')).toBeInTheDocument();
    expect(screen.getByText('뒤로가기')).toBeInTheDocument();
  });

  it('게임 생성하기 버튼을 누를 경우 모달창이 떠야합니다', async () => {
    const button = screen.getByText('게임 생성하기');
    fireEvent.click(button);

    expect(await screen.findByText('| CREATE GAME |')).toBeInTheDocument();
  });

  it('게임 생성 모달창의 버튼 중 보통을 클릭할 경우 어려움으로 표시가 바뀌어야 합니다', async () => {
    const button = screen.getByText('게임 생성하기');
    fireEvent.click(button);

    const levelButton = await screen.findByText('보통');
    fireEvent.click(levelButton);

    expect(await screen.findByText('어려움')).toBeInTheDocument();
  });

  it('게임 생성 모달창의 버튼 중 11점을 클릭할 경우 21점으로 표시가 바뀌어야 합니다', async () => {
    const button = screen.getByText('게임 생성하기');
    fireEvent.click(button);

    const scoreButton = await screen.findByText('11점');
    fireEvent.click(scoreButton);

    expect(await screen.findByText('21점')).toBeInTheDocument();
  });
});
