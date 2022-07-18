import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Guides from '../../pages/Guides';

describe('Guides page test', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Guides />
        </BrowserRouter>
      </RecoilRoot>,
    );
  });

  it('"Guides" 문구가 떠야 합니다', () => {
    expect(screen.getByText('| Guides |')).toBeInTheDocument();
  });

  it('화면에 메인 화면으로 돌아가기 버튼이 떠야 합니다', () => {
    expect(screen.getByText('메인 화면으로 돌아가기')).toBeInTheDocument();
  });
});
