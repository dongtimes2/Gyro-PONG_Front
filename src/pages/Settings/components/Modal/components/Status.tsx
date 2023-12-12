import styled from 'styled-components';

import { useUserStore } from 'src/store/user';
import { s_DisconnectByUser } from 'src/utils/socketAPI';

import Button from '@components/Button/Button';
import Title from '@components/Title/Title';

const LayoutBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  .messageArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.75rem;
  }

  .buttonArea {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

interface Props {
  setShowModal: (value: boolean) => void;
}

const Status = ({ setShowModal }: Props) => {
  const clear = useUserStore((state) => state.clear);
  const handleDisconnectButtonClick = () => {
    s_DisconnectByUser();
    clear();
  };

  return (
    <LayoutBase>
      <Title size="sm">연결 정보</Title>
      <div className="messageArea">
        <p>모바일 기기와 연결되어 있습니다</p>
      </div>
      <div className="buttonArea">
        <Button size="sm" onClick={handleDisconnectButtonClick}>
          연결 끊기
        </Button>
        <Button size="sm" onClick={() => setShowModal(false)}>
          나가기
        </Button>
      </div>
    </LayoutBase>
  );
};

export default Status;
