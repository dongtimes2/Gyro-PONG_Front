import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import controllerUrlGenerator from '../../utils/controllerUrlGenerator';
import ConnectionInfo from '../ConnectionInfo';

describe('ConnectionInfo conponent test', () => {
  it('연결되지 않은 경우 "모바일 기기를 연결해주세요" 문구가 떠야 합니다', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ConnectionInfo
            isConnected={false}
            userId={'sampleId'}
            isCheckingCompatibility={false}
            isCompatible={false}
          />
        </BrowserRouter>
      </RecoilRoot>,
    );

    expect(screen.getByText('모바일 기기를 연결해주세요')).toBeInTheDocument();
  });

  it('연결되지 않은 경우 페이지에 올바른 링크가 나와야 합니다', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ConnectionInfo
            isConnected={false}
            userId={'sampleId'}
            isCheckingCompatibility={false}
            isCompatible={false}
          />
        </BrowserRouter>
      </RecoilRoot>,
    );

    const url = controllerUrlGenerator('sampleId');
    expect(screen.getByText(url)).toBeInTheDocument();
  });

  it('연결되지 않은 경우 "링크 복사하기" 버튼이 떠야 합니다', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ConnectionInfo
            isConnected={false}
            userId={'sampleId'}
            isCheckingCompatibility={false}
            isCompatible={false}
          />
        </BrowserRouter>
      </RecoilRoot>,
    );

    expect(screen.getByText('링크 복사하기')).toBeInTheDocument();
  });

  it('연결시도중인 경우 이를 알리는 문구가 떠야 합니다', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ConnectionInfo
            isConnected={true}
            userId={'sampleId'}
            isCheckingCompatibility={true}
            isCompatible={false}
          />
        </BrowserRouter>
      </RecoilRoot>,
    );

    expect(screen.getByText('기기를 발견하였습니다.')).toBeInTheDocument();
    expect(
      screen.getByText('자이로센서 활성화 버튼을 눌러주세요.'),
    ).toBeInTheDocument();
  });

  it('연결에 성공한 경우 이를 알리는 문구가 떠야 합니다', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ConnectionInfo
            isConnected={true}
            userId={'sampleId'}
            isCheckingCompatibility={false}
            isCompatible={true}
          />
        </BrowserRouter>
      </RecoilRoot>,
    );

    expect(screen.getByText('연결에 성공하였습니다.')).toBeInTheDocument();
  });

  it('연결에 실패한 경우 이를 알리는 문구가 떠야 합니다', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ConnectionInfo
            isConnected={true}
            userId={'sampleId'}
            isCheckingCompatibility={false}
            isCompatible={false}
          />
        </BrowserRouter>
      </RecoilRoot>,
    );

    expect(
      screen.getByText('기기에 자이로센서를 찾을 수 없습니다.'),
    ).toBeInTheDocument();
    expect(screen.getByText('다른 기기를 이용해주세요.')).toBeInTheDocument();
  });
});
