import PropTypes from 'prop-types';
import styled from 'styled-components';

import controllerUrlGenerator from '../utils/controllerUrlGenerator';
import urlCopier from '../utils/urlCopier';

import Qrcode from './Qrcode';

const ConnectionInfo = ({
  isConnected,
  userId,
  isCheckingCompatibility,
  isCompatible,
}) => {
  const controllerUrl = controllerUrlGenerator(userId);

  const handleCopyButtonClick = () => {
    urlCopier(controllerUrl);
  };

  return (
    <ConnectionInfoWrap>
      {isConnected ? (
        <>
          {isCheckingCompatibility && (
            <>
              <div className="header">
                <div>기기를 발견하였습니다.</div>
                <div>자이로센서 활성화 버튼을 눌러주세요.</div>
              </div>
              <div className="icon-area">
                <div> ! </div>
              </div>
            </>
          )}

          {!isCheckingCompatibility &&
            (isCompatible ? (
              <>
                <div className="header">
                  <div>연결에 성공하였습니다.</div>
                </div>
                <div className="icon-area">
                  <div>ok</div>
                </div>
              </>
            ) : (
              <>
                <div className="header">
                  <div>기기에 자이로센서를 찾을 수 없습니다.</div>
                  <div>다른 기기를 이용해주세요.</div>
                </div>
                <div className="icon-area">
                  <div>error</div>
                </div>
              </>
            ))}
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
  isConnected: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  isCheckingCompatibility: PropTypes.bool.isRequired,
  isCompatible: PropTypes.bool.isRequired,
};

const ConnectionInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;

  .header {
    display: flex;
    flex-direction: column;
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

  .icon-area {
    display: flex;
    flex-basis: 85%;
    font-size: 150px;
    align-items: center;
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
