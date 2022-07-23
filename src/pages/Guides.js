import { useCallback, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import SocketEvent from '../constants/socket';
import leftImage from '../images/left.png';
import motionImage from '../images/motion.png';
import rightImage from '../images/right.png';
import settingState from '../recoil/settingState';
import userState from '../recoil/userState';
import { playClickSound } from '../utils/playSound';
import { sendToggleMotionButton, socket } from '../utils/socketAPI';

export default function Guide() {
  const [motionValueList, setMotionValueList] = useState([]);
  const [page, setPage] = useState(1);
  const setting = useRecoilValue(settingState);
  const user = useRecoilValue(userState);

  const navigate = useNavigate();

  const handleButtonSound = (event) => {
    if (
      (event.target.nodeName === 'BUTTON' || event.target.nodeName === 'A') &&
      setting.isPlayingSFX
    ) {
      playClickSound();
    }
  };

  const handleGoPrevPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => (prev -= 1));
    }
  }, [page]);

  const handleGoNextPage = useCallback(() => {
    if (page < 3) {
      setPage((prev) => (prev += 1));
    }
  }, [page]);

  useEffect(() => {
    socket.on(SocketEvent.RECEIVE_MOVE_UP, () => {
      setMotionValueList((prev) => [...prev, '🡹']);
    });

    socket.on(SocketEvent.RECEIVE_MOVE_DOWN, () => {
      setMotionValueList((prev) => [...prev, '🡻']);
    });

    socket.on(SocketEvent.RECEIVE_MOVE_LEFT, () => {
      setMotionValueList((prev) => [...prev, '🡸']);
    });

    socket.on(SocketEvent.RECEIVE_MOVE_RIGHT, () => {
      setMotionValueList((prev) => [...prev, '🡺']);
    });

    socket.on(SocketEvent.RECEIVE_STOP_DETECT_MOTION, () => {
      setMotionValueList([]);
    });

    return () => {
      socket.off(SocketEvent.RECEIVE_MOVE_UP);
      socket.off(SocketEvent.RECEIVE_MOVE_DOWN);
      socket.off(SocketEvent.RECEIVE_MOVE_LEFT);
      socket.off(SocketEvent.RECEIVE_MOVE_RIGHT);
      socket.off(SocketEvent.RECEIVE_STOP_DETECT_MOTION);
    };
  }, []);

  useEffect(() => {
    if (motionValueList[0] === '🡻' && motionValueList[1] === '🡸') {
      setTimeout(() => {
        navigate('/');
      }, 500);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡹' && motionValueList[1] === '🡸') {
      handleGoPrevPage();
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡹' && motionValueList[1] === '🡺') {
      handleGoNextPage();
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList.length >= 2) {
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    }
  }, [
    motionValueList,
    navigate,
    handleGoPrevPage,
    handleGoNextPage,
    user.controllerId,
  ]);

  return (
    <GuidesWrap onClick={handleButtonSound}>
      <div className="title-area">| Guides |</div>
      <div className="content-area">
        {page === 1 && (
          <>
            <div className="question">○ PONG은 어떤 게임인가요?</div>
            <div className="answer">
              &nbsp; PONG은 상업적으로 성공한 역사상 최초의 아케이드 게임입니다.
            </div>
            <div className="question"> ○ 게임 규칙이 무엇인가요?</div>
            <div className="answer">
              &nbsp; 나에게 날아오는 공을 튕겨 상대방에게 보내야 합니다. <br />
              &nbsp; 유저가 공을 튕기지 못한다면, 상대방이 점수를 얻게 됩니다.{' '}
              <br />
            </div>
            <div className="question">○ 게임을 하기 위한 조건이 있나요?</div>
            <div className="answer">
              &nbsp; 자이로센서가 탑재되어있는 모바일 기기가 추가적으로
              필요합니다.
            </div>
          </>
        )}
        {page === 2 && (
          <>
            <div className="question">
              ○ 게임 진행 시 컨트롤러 조종은 어떻게 하나요?
            </div>
            <div className="image-area">
              <img src={leftImage}></img>
              <img src={rightImage}></img>
            </div>
            <div className="answer">
              &nbsp; 그림과 같이 기기를 기울여 플레이하면 됩니다. <br />
              &nbsp; 기기를 왼쪽으로 기울이면 패들이 아래로, 기기를 오른쪽으로
              기울이면 패들이 위로 움직입니다.
            </div>
          </>
        )}
        {page === 3 && (
          <>
            <div className="question">
              ○ 컨트롤러 움직임으로 메뉴이동을 하려면 어떻게 해야 하나요?
            </div>
            <div className="image-area">
              <img src={motionImage}></img>
            </div>
            <div className="answer">
              &nbsp; 설정 페이지에서 컨트롤러 연결 및 움직임 설정을 모두 마쳐야
              합니다. <br />
              &nbsp; 이후 &#39;컨트롤러 움직임으로 메뉴 이동하기&#39; 버튼을
              눌러 화면 버튼에 화살표가 뜨는걸 확인해주세요.
              <br />
              &nbsp; 필요할 때마다 컨트롤러 화면에 표시된 &#39;모션감지
              시작&#39; 버튼을 누르고 화살표 방향대로 움직이면 됩니다.
            </div>
          </>
        )}
      </div>
      <div className="button-area">
        <div className="left-area">
          {page > 1 && (
            <button type="button" onClick={handleGoPrevPage}>
              {setting.isChangedPageByMotion && (
                <span className="arrow-area">⇧ ⇦</span>
              )}{' '}
              이전
            </button>
          )}
        </div>
        <div className="center-area">
          <Link to="/">
            {setting.isChangedPageByMotion && <span>⇩ ⇦</span>} 메인 화면으로
            돌아가기
          </Link>
        </div>
        <div className="right-area">
          {page < 3 && (
            <button type="button" onClick={handleGoNextPage}>
              {setting.isChangedPageByMotion && (
                <span className="arrow-area">⇧ ⇨</span>
              )}{' '}
              다음
            </button>
          )}
        </div>
      </div>
      {setting.isChangedPageByMotion && (
        <>
          <div className="motion-value-area">{motionValueList}</div>
        </>
      )}
    </GuidesWrap>
  );
}

const GuidesWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .title-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 15%;
    font-size: 100px;
    white-space: nowrap;
  }

  .content-area {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-basis: 60%;
    width: 83%;
  }

  .image-area {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .image-area img {
    width: 20%;
    object-fit: contain;
  }

  .button-area {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-basis: 20%;
    width: 100%;
  }

  .left-area {
    display: flex;
    justify-content: center;
    flex-basis: 33%;
  }

  .center-area {
    display: flex;
    justify-content: center;
    flex-basis: 33%;
  }

  .right-area {
    display: flex;
    justify-content: center;
    flex-basis: 33%;
  }

  .motion-value-area {
    display: flex;
    align-items: center;
    flex-basis: 5%;
    font-size: 30px;
  }

  .question {
    font-size: 50px;
  }

  .answer {
    display: flex;
    flex-direction: column;
    font-size: 30px;
  }

  .button-area a {
    padding: 20px 50px;
    font-size: 30px;
  }

  .button-area button {
    padding: 20px 50px;
    font-size: 30px;
  }

  .arrow-area {
    font-size: 20px;
  }
`;
