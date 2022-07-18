import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Settings from '../../pages/Settings';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

describe('Settings page test', () => {
  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  beforeEach(() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Settings />
        </BrowserRouter>
      </RecoilRoot>,
    );
  });

  it('"Settings" 문구가 떠야 합니다', () => {
    expect(screen.getByText('| Settings |')).toBeInTheDocument();
  });

  it('화면에 모든 버튼이 떠야 합니다', () => {
    expect(screen.getByText('진동')).toBeInTheDocument();
    expect(screen.getByText('배경음악')).toBeInTheDocument();
    expect(screen.getByText('효과음')).toBeInTheDocument();
    expect(
      screen.getByText('컨트롤러 움직임으로 메뉴 이동하기'),
    ).toBeInTheDocument();
    expect(screen.getByText('컨트롤러 연결 설정')).toBeInTheDocument();
    expect(screen.getByText('메인 화면으로 돌아가기')).toBeInTheDocument();
  });

  it('진동 버튼을 누를 경우 화면에서는 X에서 O로 바뀌어야 합니다', async () => {
    const button = screen.getByText('진동');
    fireEvent.click(button);

    expect(await screen.findByTestId('vibration')).toHaveTextContent('O');
  });

  it('배경음악 버튼을 누를 경우 화면에서는 X에서 O로 바뀌어야 합니다', async () => {
    const button = screen.getByText('배경음악');
    fireEvent.click(button);

    expect(await screen.findByTestId('music')).toHaveTextContent('O');
  });

  it('효과음 버튼을 누를 경우 화면에서는 X에서 O로 바뀌어야 합니다', async () => {
    const button = screen.getByText('효과음');
    fireEvent.click(button);

    expect(await screen.findByTestId('sfx')).toHaveTextContent('O');
  });

  it('컨트롤러 움직임... 버튼을 누를 경우 화면에서는 X에서 O로 바뀌어야 합니다', async () => {
    const button = screen.getByText('컨트롤러 움직임으로 메뉴 이동하기');
    fireEvent.click(button);

    expect(await screen.findByTestId('motion')).toHaveTextContent('O');
  });

  it('컨트롤러 연결 설정 버튼을 누를 경우 모달창이 떠야합니다', async () => {
    const button = screen.getByText('컨트롤러 연결 설정');
    fireEvent.click(button);
    expect(
      await screen.findByText('모바일 기기를 연결해주세요'),
    ).toBeInTheDocument();
  });
});
