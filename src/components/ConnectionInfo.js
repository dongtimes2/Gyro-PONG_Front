import PropTypes from 'prop-types';
import styled from 'styled-components';

import controllerUrlGenerator from '../utils/controllerUrlGenerator';

import Qrcode from './Qrcode';

const ConnectionInfo = ({ isConnected, userId }) => {
  const controllerUrl = controllerUrlGenerator(userId);

  const handleCopyButtonClick = async () => {
    await navigator.clipboard.writeText(controllerUrl);
  };

  return (
    <ConnectionInfoWrap>
      {isConnected ? (
        <>
          <div className="header">기기가 연결되어 있습니다</div>
        </>
      ) : (
        <>
          <div className="header">모바일 기기를 연결해주세요</div>
          <div className="qrcode-area">
            <div>QR CODE</div>
            <Qrcode link={controllerUrl} size={250} />
          </div>
          <div className="link-area">
            <div>LINK</div>
            <div>{controllerUrl}</div>
          </div>
          <div className="button-area">
            <button onClick={handleCopyButtonClick}>링크 복사하기</button>
          </div>
        </>
      )}
    </ConnectionInfoWrap>
  );
};

ConnectionInfo.propTypes = {
  isConnected: PropTypes.any.isRequired,
  userId: PropTypes.string.isRequired,
};

const ConnectionInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;

  .header {
    display: flex;
    align-items: center;
    flex-basis: 15%;
    font-size: 50px;
  }

  .qrcode-area {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-basis: 60%;
    font-size: 30px;
    text-align: center;
  }

  .link-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 15%;
    font-size: 30px;
  }

  .button-area {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    flex-basis: 10%;
    height: 80%;
  }

  button {
    color: black;
    font-size: 40px;
    border: 1px solid black;
    padding: 0px 50px;
  }

  button:hover {
    color: white;
    background-color: black;
  }

  button:active {
    color: #3b3b3b;
  }
`;

export default ConnectionInfo;
