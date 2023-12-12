<div align="center" style="max-width: 100%;">
  <h1>Gyro PONG</h1>
  <img width="100%" style="max-width: 100%" src="https://github.com/dongtimes2/readme_image/assets/98700888/dd2e33b8-3cb6-40d2-9d12-1dea4f45326c" alt="title logo"/><br/>
</div>

<h2>실행 조건</h2>
<div align="left" style="max-width: 100%;">
  <h3>PC 브라우저</h3>

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
  | :---: | :---: | :---: |
  | 105 ~ latest | 105 ~ latest | 15.4 ~ latest|
  <ul>
    <li>브라우저 사이즈는 최소 1280px x 800px여야 합니다</li>
  </ul>
  <br />
  <h3>모바일 브라우저</h3>

 | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung|
  | :---: | :---: | :---: |
  | 18 ~ latest | 4.2 ~ latest| 1.0 ~ latest|
  <ul>
    <li>모바일 기기에는 orientation 센서가 탑재되어 있어야 합니다</li>
    <li>Safari 브라우저로 접속 시 진동 기능을 사용할 수 없습니다</li>
  </ul>
</div>
<br />

## 개요

- 프로젝트 이름: 🕹️Gyro PONG🕹️
- 프로젝트 소개  
&nbsp;  모바일 기기의 자이로 센서를 이용하여 PONG 게임을 할 수 있는 웹 게임입니다.  
&nbsp;  모바일 기기를 기울임으로써 유닛을 움직일 수 있다는 특징을 가지고 있습니다.  
- 개발 기간
  - 최초 개발: 2022.07 ~ 2022.07 (기획 1주, 개발: 2주)
  - 리뉴얼: 2023.11 ~
- 제작 동기  
&nbsp;  웹은 탄생 이후 지금까지 획기적인 발전 과정을 거쳤습니다.  
&nbsp;  하지만 웹을 조작하는 방법은 예전과 크게 달라지지 않다는 것을 느꼈습니다.  
&nbsp;  버튼을 누르거나, 특정 디바이스를 이용하여 수평면으로만 움직이는게 전부였기 때문입니다.  
&nbsp;  
&nbsp;  물론 터치스크린의 등장으로 인해 손으로 직접 웹을 만지며 조작이 가능해졌지만,  
&nbsp;  누름, 그리고 평면으로 움직임이는 방법을 사용한다는 점에서  
&nbsp;  터치스크린 역시 웹을 조작하는데에는 기존과 크게 다르지 않다고 생각했습니다.  
&nbsp;  
&nbsp;  단순한 움직임으로 웹을 조작하는 기존의 패러다임에서 탈피하여  
&nbsp;  좀 더 다채롭고 역동적으로 웹을 조작하고 싶다는 생각이 들었고,  
&nbsp;  이런 발상을 기반으로 하여 이번 프로젝트를 기획하였습니다.  
&nbsp;  
&nbsp;  '역동적인 움직임', '누군가와 함께 즐기는 활동' 이라는 주제로 방향을 잡다보니 게임으로 가닥이 잡혔고,  
&nbsp;  '처음 선보이는 것', '새로운 것' 이라는 키워드에 초점을 맞추니 최초의 아케이드 게임인 PONG이 떠올랐습니다.  
&nbsp;  
&nbsp;  결과적으로 서로 다른 두 개의 소재가 만나 모션을 통해 움직이는 웹 게임 Gyro PONG을 개발하였습니다.

<br />

## 이용 방법

<details>
<summary>컨트롤러 등록하기</summary>
<div>

|메인 화면|설정 화면|
|:--:|:--:|
|![main](https://github.com/dongtimes2/readme_image/assets/98700888/8ab1312d-da42-4238-8aba-fd948c9403dc)|![settings](https://github.com/dongtimes2/readme_image/assets/98700888/9e51d94b-c54e-4945-bdd7-d30a8913cae3)|
|메인 화면에서 '설정' 버튼을 클릭해주세요.|설정 화면에서 '컨트롤러 연결 설정' 버튼을 클릭해주세요.|

|연결 모달|연동 영상|
|:--:|:--:|
|![settings_modal](https://github.com/dongtimes2/readme_image/assets/98700888/a8f1f549-619c-4594-aae7-9122342d66a6)|![settings_video](https://github.com/dongtimes2/readme_image/assets/98700888/e19feafd-7baf-4757-aad7-d237bbb53312)|
|연결 모달 내 QR코드가 뜨면, 모바일 기기로 QR 코드를 찍어 연결해주세요.<br />혹은 컨트롤러 전용 링크를 통해 접속할 수도 있습니다.|모바일 기기와 연동하는 모습입니다.<br />연동할 때, 유저가 모바일 기기를 기울이기 편한 각도를 등록해야 합니다.|
</div>
</details>

<details>
<summary>시작하기</summary>
<div>

|메인 화면|로비 화면|
|:--:|:--:|
|![main_activated](https://github.com/dongtimes2/readme_image/assets/98700888/f651dabd-7c73-4865-b6a4-d1a3bf3003cb)|![lobby](https://github.com/dongtimes2/readme_image/assets/98700888/724caeee-e475-46f1-a806-fcba47795b5d)|
|연동이 완료되면 메인 화면의 시작 버튼이 활성화 됩니다.<br />'시작' 버튼을 클릭해주세요.|로비 화면으로 진입한 모습입니다|
</div>
</details>

<details>
<summary>방 만들기</summary>
<div>

|로비 화면|게임 생성 모달|
|:--:|:--:|
|![lobby](https://github.com/dongtimes2/readme_image/assets/98700888/724caeee-e475-46f1-a806-fcba47795b5d)|![create_game_modal](https://github.com/dongtimes2/readme_image/assets/98700888/8c15b7af-7934-414e-a36a-74d93cdd973d)|
|로비 화면에서 '게임 생성' 버튼을 클릭해주세요 |모달이 뜨면, 생성할 게임의 난이도와 목표 점수를 설정할 수 있습니다.<br />'게임 생성' 버튼을 클릭해주세요.|

|유저 대기 화면||
|:--:|:--:|
|![host_waiting](https://github.com/dongtimes2/readme_image/assets/98700888/ff17d3fb-8d7a-4ac8-b1a0-fcf759ba8267)|![blank](https://github.com/dongtimes2/readme_image/assets/98700888/0d6cf067-5b12-4131-a2fe-a3104b6abf9f)|
|게임이 성공적으로 생성되었습니다.<br />유저가 참가할 때까지 기다려주세요||

</div>
</details>

<details>
<summary>게임에 참여하기</summary>
<div>

|로비 화면||
|:--:|:--:|
|![lobby_has_game_room](https://github.com/dongtimes2/readme_image/assets/98700888/190e6efb-0944-49fa-afde-0b85c2d5b737)|![guest_wait](https://github.com/dongtimes2/readme_image/assets/98700888/2452f14b-5d00-4874-91b2-046490557d54)|
|누군가 게임을 생성했을 경우, 로비 화면에 생성된 게임룸을 볼 수 있습니다.<br />생성된 게임을 클릭해주세요.|게임에 참여한 모습입니다.<br/>방장이 게임 시작 버튼을 누를 때까지 대기해주세요.|
</div>
</details>

<details>
<summary>게임 시작하기</summary>
<div>

|게임 시작하기|게임 화면|
|:--:|:--:|
|![host_ready](https://github.com/dongtimes2/readme_image/assets/98700888/f74a2f3b-ee06-4ccb-ae23-85b29d28f1a1)|![game](https://github.com/dongtimes2/readme_image/assets/98700888/6482f5fb-d25e-4aa4-8494-7777835edf29)|
|유저가 참여하면 게임 시작 버튼이 화면에 나타납니다.<br />게임 진행을 위해 '게임 시작' 버튼을 눌러주세요. |게임이 진행중인 모습입니다.<br /> 컨트롤러를 좌,우로 기울이면 paddle이 움직입니다.|
</div>
</details>

<details>
<summary>컨트롤러 움직임으로 버튼 클릭 및 메뉴 이동하기</summary>
<div>

|설정 화면|활성화 되어 버튼에 화살표가 추가된 모습|
|:--:|:--:|
|![settings_activated](https://github.com/dongtimes2/readme_image/assets/98700888/a35ef939-0978-4309-bf11-89ea5aec65c0)|![arrow](https://github.com/dongtimes2/readme_image/assets/98700888/2b30c716-e80c-44bb-a338-6f700ea81032)|
|컨트롤러와 연동하면 설정 화면에 '컨트롤러 움직임으로 버튼 누르기' 버튼이 표시됩니다.<br />버튼을 클릭해주세요.|버튼 옆에 화살표 기호가 추가된 것을 볼 수 있습니다.|

|활성화 이후 컨트롤러 화면|실행 화면|
|:--:|:--:|
|![blank](https://github.com/dongtimes2/readme_image/assets/98700888/b30c044b-044b-439e-bc40-95f25df58dd0)|![arrow_play](https://github.com/dongtimes2/readme_image/blob/main/ezgif.com-optimize-min.gif?raw=true)|
|활성화 할 경우 컨트롤러에는 '모션 감지 시작' 버튼이 생성됩니다.<br />버튼을 클릭하면 컨트롤러의 움직임을 인식합니다.|컨트롤러의 '모션 감지 시작' 버튼을 누른 이후, PC 화면에 뜬 화살표 모양대로 컨트롤러를 움직여주세요.<br />인식에 성공할 경우 컨트롤러는 모션 인식을 중단합니다.<br />다시 한 번 모션 감지를 하고싶은 경우, 컨트롤러의 '모션 감지 시작' 버튼을 눌러주세요.|
</div>
</details>

<br />

## 기술스택

리뉴얼을 거치면서 기술 스택을 변경하였습니다.  
이전에 사용된 기술 스택은 취소선 처리하였습니다.

### 프론트엔드

#### 핵심

- React
- TypeScript
- ~~Recoil~~ => Zustand
- Canvas
- Socket.io-client
- Styled components

#### 그 외

- husky

#### 테스트 환경

- vitest

#### 배포

- ~~Netlify~~ => AWS

### 백엔드

#### 핵심

- Express
- Socket.io

#### 그 외

- husky

#### 테스트 환경

- supertest
- jest

#### 배포

- AWS

<br />

## 기술 및 구현 상세 내용

### paddle이 움직이는 범위 컨트롤하기

모바일 기기를 가로로 쥔 상태로 왼쪽, 혹은 오른쪽으로 돌리면, 기울인 각도 만큼 게임 내 paddle이 좌 우로 움직이도록 기획하였습니다.

하지만 기울이는 각도에 따라 paddle이 얼만큼 움직여야 하는지 기준을 세우는 것이 애매하였습니다.  
가장 쉬운 방법은 개발자의 임의대로 기울임 값을 지정하는 것이지만, 사람마다 신체구조가 달라 최대로 기기를 기울일 수 있는 활동 범위가 다르기 때문에, 유저의 편의성을 위해 다른 방법을 찾아야 했습니다.  

긴 고민 끝에 사람마다 최대로 기기를 기울일 수 있는 범위를 조사한 뒤, 이를 기반으로 paddle이 움직이는 기준을 세우기로 하였습니다.  
따라서 맨 처음 게임에 접속했을 때, 컨트롤러를 연결하는 과정에서, 유저가 최대한 기울일 수 있는 각도의 범위도 함께 지정할 수 있도록 구현했습니다.  

이런 고민을 거치며, 웹을 이용하는 사용자의 경험에 대해 더욱 생각해볼 수 있는 경험이 되었습니다.  

<br>

### 움직임 범위에 맞추어 paddle 표시하기

앞 단락에서 언급하였듯, 유저마다 모바일 기기를 움직일 수 있는 각도의 범위가 다르기 때문에, 여러 대의 모바일 기기로부터 동일한 각도 값을 받아도, 화면에는 유저별로 paddle의 위치를 다르게 표현해야 됩니다.  
(예를 들어 기기를 움직이는 각도의 범위가 짧은 유저는, 그렇지 않은 유저에 비해, 기기를 조금만 움직여도 paddle이 빠르게 이동해야 합니다)

이를 해결하기 위해 paddle의 위치를 계산하는 일차 방정식을 도입하여 util 함수에 적용하였습니다.  
방정식은 다음과 같습니다. (이때 β는 센서로부터 얻은 기울임 값을 의미합니다)  
&nbsp;  
$\text{Paddle의 y좌표 시작점} = \frac{\beta\text{ - }\text{왼쪽 기울임 최대 각도}}{\text{오른쪽 기울임 최대 각도}\text{ - }\text{왼쪽 기울임 최대 각도}} \times \text{(canvas 높이 - Paddle 높이)}$
&nbsp;  
&nbsp;  
서버는 모바일 기기로부터 받은 베타 값과 유저별 최대 기울임 각도를 알고 있기 때문에, 우항의 분수 부분을 계산하여 클라이언트에게 줄 수 있으며, 나머지 부분은 클라이언트가 계산하여 화면에 표시합니다.  

![beta](https://github.com/dongtimes2/readme_image/assets/98700888/8a36440a-0830-4f57-a56b-b9ae84731452)

<br>

### 모니터 사양에 관계 없이 동일한 결과물 출력하기

이 게임은 원격으로 접속한 두 명의 유저가 실시간으로 동일한 그래픽을 보면서 참여한다는 특징을 가지고 있습니다.  
이를 위해서는 모니터의 사이즈와 픽셀 밀도에 관계없이 항상 동일한 결과를 화면에 출력해야 합니다.  
환경에 관계없이 동일한 결과가 출력되도록 구현한 내역은 아래와 같습니다.  

#### 상대적 크기 단위 사용

canvas에 표시되는 모든 요소의 크기를 지정하기 위해 고정된 값이 아닌 상대적 값을 이용하였습니다.  
이를 통해 화면의 크기가 달라져도 요소의 크기가 같은 비율로 변경되기 때문에, 항상 같은 결과의 화면을 볼 수 있게 됩니다.  
대표적으로 쉬움 난이도를 선택했을 경우, paddle의 높이는 canvas 높이의 1/5가 되도록 지정하였습니다.  
<!-- &nbsp;  
리뉴얼 이전에는 이 문제를 해결하기 위해 게임에 참여한 두 유저의 브라우저 창 사이즈를 조사한다음, 사이즈가 작은 유저의 화면을 기준으로 canvas 크기를 지정하였습니다.  
하지만 두 유저의 브라우저 창 사이즈가 너무 크게 차이날 경우, 큰 모니터를 사용하고 있는 유저는 모니터 크기에 비해 작은 게임 화면을 봐야 되는 문제점이 있었습니다.   -->

#### 픽셀 밀도 고려

모니터의 픽셀 밀도가 다르다면, 같은 크기의 요소를 그려도 사이즈가 이상하거나 흐릿하게 나타나는 문제점이 발생할 수 있습니다.  
따라서 devicePixelRatio를 이용하여 모니터의 픽셀 밀도를 얻은 뒤, 다음과 같은 코드를 이용하여 canvas 화면을 보정하였습니다.  

```js
const canvas = canvasRef.current!;
const context = canvas.getContext('2d')!;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

canvas.width = canvasWidth * window.devicePixelRatio;
canvas.height = canvasHeight * window.devicePixelRatio;

context.scale(window.devicePixelRatio, window.devicePixelRatio);
```

<br>

### 화면 동기화 하기

PONG 게임은 화면 내에서 ball이 끊임 없이 움직이며, ball의 위치가 게임에 참여한 두 명의 유저에게 동일하게 보여야 하기 때문에, 멀티 플레이라 할지라도 턴제 게임과 다르게 실시간 동기화의 중요성이 매우 높습니다.  
따라서 소켓 통신을 이용하여 유저에게 보이는 화면을 최대한 동기화시킬 필요성이 있었습니다.  

#### 1. 일정 주기로 ball 위치 동기화 하기 (기각)

첫 번째 방법은, ball이 벽이나 paddle에 부딛힐 때, 혹은 일정한 시간 간격마다 ball의 위치를 동기화하는 방법입니다.  
소켓 통신을 이용하여 ball의 위치정보를 동기화하여 위치 보정을 하였으나, 이는 좋은 해결 방법이 되지 못했습니다.  
왜냐하면, 게임 특성상 ball은 매 프레임마다 매끄럽게 움직여야 하는데, ball이 움직이는 상황에서 위치가 갱신될때마다 애니메이션이 툭툭 하고 끊기며 움직임이 어그러졌기 때문입니다.  
이는 UX를 심각하게 떨어뜨렸으며, 심지어 유저마다 애니메이션 오차를 발생시키는 결과를 낳았습니다.

#### 2. 라운드가 시작될 때마다 ball 위치 동기화 하기 (기각)

두 번째 방법은, 매 라운드가 시작될 때마다 소켓 통신을 통해 ball 위치를 동기화를 하는 방법이었습니다.  
게임 특성상 유저가 실점을 한다면 ball은 사라지고, 라운드가 다시 시작될 때마다 ball은 중앙에서부터 다시 생성되어 움직입니다.  
따라서 실점에 의해 ball이 사라질 때마다, 클라이언트는 서버에게 ball을 새롭게 생성해달라는 요청을 보내게 되고, 서버는 두 유저에게 ball을 생성하는 응답을 동시에 보낸다면, 두 유저가 보는 화면에는 ball이 동시에 생성되어 자연스럽게 동기화가 될 것이라는 예상을 하였습니다.  
이 방법은 첫 번째 방법에 비해 플레이 타임 내내 애니메이션 움직임이 매끄럽게 이어진다는 장점이 있습니다.  

하지만 ball이 생성된 이후의 ball의 움직임은 누군가가 실점하기 전까지는 서버가 알 방법이 없었기 때문에, 클라이언트 문제로 브라우저에 렉이 생기거나 서버로부터 paddle 움직임 값을 제대로 전달받지 못한다면, 두 유저간 ball 움직임에 차이가 발생할 가능성이 생기며, 이에 따라 서로 다른 게임 화면을 보게 되는 결과가 발생한다는 단점을 가지고 있었습니다.  

#### 3. 계속해서 동기화 하기 (채택)

리뉴얼 이후로 새롭게 도입한 방법으로, requestAnimationFrame에 의해 canvas의 프레임이 변할 때마다 계속해서 동기화를 하는 기법을 채택하였습니다.  
즉, 게임에 참여한 두 명의 유저 중 host(방장)의 canvas 데이터를 guest(참가자)에게 계속해서 전달하는 방식입니다.  
host는 ball의 위치가 canvas 상단으로부터 몇 % 지점에 있는지, 좌측으로부터 몇 % 지점에 있는지 비율을 계산하여 소켓 서버를 통해 guest에게 보내면, guest는 전달받은 비율을 자기 자신만의 canvas 사이즈로 재 계산하여 화면에 ball을 표시하도록 하였습니다.  
guest의 경우 canvas 화면이 계속해서 소켓 통신에 의해 갱신되기 때문에 직전의 방식보다는 움직임이 매끄럽지 못하지만, 실시간으로 동일한 결과물을 확실하게 볼 수 있다는 점을 보장할 수 있게 되었습니다.  

```js
// host가 guest에게 ball의 상대적 위치정보와 score 정보를 전달하는 부분
s_SendGameData({
  ball: {
    x: ballX.current / canvasWidth,
    y: ballY.current / canvasHeight,
  },
  score: {
    host: hostScore.current,
    guest: guestScore.current,
  },
});

// (중략)

// guest가 host에게 받은 데이터를 이용하여 canvas에 사용되는 데이터를 갱신하는 부분
 useEffect(() => {
    socket.on(EVENT.SEND_GAME_DATA, (gameData: GameData) => {
      ballX.current = gameData.ball.x * canvasWidth;
      ballY.current = gameData.ball.y * canvasHeight;
      hostScore.current = gameData.score.host;
      guestScore.current = gameData.score.guest;
    });

    // (중략)
 }, []);
```
![ball](https://github.com/dongtimes2/readme_image/assets/98700888/8ef779c6-48f0-46f2-9915-69e7da89df26)

<br>

### ball이 wall이나 paddle에 맞았을 때 튕김 구현하기

#### 레이아웃 및 구현 소개

paddle 위치 및 ball 사이즈에 대한 레이아웃은 다음과 같습니다.  

<div style="max-width: 100%;">
  <img width="70%" src="https://github.com/dongtimes2/readme_image/assets/98700888/bc26484f-4148-4f32-b166-04aa692ddee7">
</div>

ball을 나타내기 위한 클래스는 다음과 같이 선언되어 있습니다.  

```ts
export class Ball {
  private x: number;
  private y: number;
  private length: number;

  constructor(x: number, y: number, length: number) {
    this.x = x;
    this.y = y;
    this.length = length;
  }

  public paint(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.length, this.length);
  }
}
```

ball의 움직임을 나타내기 위해, 애니메이션 프레임이 계속해서 변할 때마다 ball의 x좌표 및 y좌표에 특정 delta 값을 계속해서 더하는 식으로 구현하였습니다.  

```ts
const animate = () => {
  window.requestAnimationFrame(animate);

  ballX += ballDeltaX;
  ballY += ballDeltaY;

  const ball = new Ball(ballX, ballY, canvasWidth / 40);
  ball.print(context);
}

animate();
```

&nbsp;  

#### 1. wall에 맞았을 때

ball은 상단, 혹은 하단의 wall에 맞았을 때 튕겨야 합니다.  
이때 벽에 부딛힌 각도와 수직인 방향으로 튕기도록 구현하였습니다.  

<div style="max-width: 100%;">
  <img width="50%" src="https://github.com/dongtimes2/readme_image/assets/98700888/24a7dabb-b9fd-4b48-a3bd-ff57f764aa5a">
</div>

x축의 진행 방향은 그대로 두고 y축의 진행 방향에 음수를 곱해 반전시킨다면 튕김 효과를 줄 수 있습니다.  
따라서 delta Y에 -1을 곱하였습니다.  

```ts
if (ballY + canvasWidth / 40 > canvasHeight || ballY < 0) {
  ballDeltaY *= -1;
}
```

&nbsp;  

#### 2. paddle에 맞았을 때

총 세 가지의 경우의 수를 나누었습니다.  
- paddle 중앙에 맞은 경우
- paddle 상단에 맞은 경우
- paddle 하단에 맞은 경우

&nbsp;  

##### 2-1. paddle 중앙에 맞은 경우

|paddle의 중앙 영역|중앙 영역 레이아웃|
|:--:|:--:|
|![middle](https://github.com/dongtimes2/readme_image/assets/98700888/85066ad1-f01e-4c6b-bf85-6c672ca02944)|![middle_layout](https://github.com/dongtimes2/readme_image/assets/98700888/d3c392c4-5556-4652-a9c8-1f712d185dd6)|

ball이 paddle 중앙에 맞았는지의 여부를 판정하기 위한 조건은 다음과 같습니다.  

&nbsp;  

$$\text{canvas width} / 20 + \text{canvas width} / 80 \leq x \leq \text{canvas width} / 20 + \text{canvas width} / 40$$

$$\text{paddle y좌표 시작점} \leq y \leq \text{paddle y좌표 시작점} + \text{paddle 길이} - \text{canvas width} / 40$$

&nbsp;  
만약 ball의 x좌표와 y좌표가 상기한 조건에 해당할 경우, ball의 x축 진행방향을 반전시켜 튕김 효과를 주었습니다.  
즉 delta X에 -1을 곱하였습니다.  

```ts
if (ball의 X좌표 및 Y좌표 === 상기한 조건) {
  ballDeltaX *= -1;
}
```

&nbsp;  

#### 2-2. paddle 상단에 맞은 경우

|paddle의 상단 영역|상단 영역 레이아웃|
|:--:|:--:|
|![upper](https://github.com/dongtimes2/readme_image/assets/98700888/5910fad0-9886-406c-a30e-b9c6aa040be9)|![upper_layout](https://github.com/dongtimes2/readme_image/assets/98700888/e7de7ef7-b341-422a-9c53-186b8b545579)|

ball이 paddle 상단에 맞았는지의 여부를 판정하기 위한 조건은 다음과 같습니다.  

&nbsp;  

$$\text{canvas width} / 20 - \text{canvas width} / 80 \leq x \leq \text{canvas width} / 20 + \text{canvas width} / 40$$

$$\text{paddle y좌표 시작점} - \text{canvas width} / 40 \leq y \leq \text{paddle y좌표 시작점}$$

&nbsp;  
만약 ball의 x좌표와 y좌표가 상기한 조건에 해당할 경우, ball의 x축 및 y축 진행방향을 반전시켜 튕김 효과를 주었습니다.  
즉 delta X와 delta Y에 -1을 곱하였습니다.  

```ts
if (ball의 X좌표 및 Y좌표 === 상기한 조건) {
  ballDeltaX *= -1;
  ballDeltaY *= -1;
}
```

&nbsp;  

#### 2-3. paddle 하단에 맞은 경우

|paddle의 하단 영역|하단 영역 레이아웃|
|:--:|:--:|
|![upper](https://github.com/dongtimes2/readme_image/assets/98700888/dc44a748-17c3-4462-af33-401978e07fcd)|![upper_layout](https://github.com/dongtimes2/readme_image/assets/98700888/b127cd7e-227f-4bfb-81a6-00c6f39e4ddd)|

ball이 paddle 하단에 맞았는지의 여부를 판정하기 위한 조건은 다음과 같습니다.  

&nbsp;  

$$\text{canvas width} / 20 - \text{canvas width} / 80 \leq x \leq \text{canvas width} / 20 + \text{canvas width} / 40$$

$$\text{paddle y좌표 시작점} + \text{paddle 길이} - \text{canvas width} / 40 \leq y \leq \text{paddle y좌표 시작점} + \text{paddle 길이}$$

&nbsp;  
만약 ball의 x좌표와 y좌표가 상기한 조건에 해당할 경우, ball의 x축 및 y축 진행방향을 반전시켜 튕김 효과를 주었습니다.  
즉 delta X와 delta Y에 -1을 곱하였습니다.  

```ts
if (ball의 X좌표 및 Y좌표 === 상기한 조건) {
  ballDeltaX *= -1;
  ballDeltaY *= -1;
}
```

<br>

### 유저의 돌발 이벤트 감지하기

게임 특성상 유저가 항상 올바른 행동을 한다는 보장을 할 수 없기 때문에, 돌발 이벤트에 대한 대비를 하였습니다.  

#### 연결을 끊은 경우

사이트의 접속을 끊는다면 소켓 연결도 끊기게 되는데, 소켓의 disconnect 이벤트가 발생했을 때 다음과 같은 처리를 하였습니다.  

- PC 브라우저의 접속이 끊어진 경우
  - 연동한 모바일 기기의 소켓 연결도 함께 끊은다음, 모바일 기기에는 더이상 기기를 사용할 수 없다는 문구가 출력되도록 하였습니다.  

- 모바일 기기의 접속이 끊어진 경우
  - PC 브라우저의 화면을 강제로 메인 화면으로 이동시킨다음, 모바일 기기와의 연동 정보를 제거하였습니다.  
  이후 다시 게임에 참여하려면, 설정 화면을 통해 모바일 기기를 다시 연동해야 합니다.

&nbsp;  

|PC 브라우저의 접속이 끊어진 경우|모바일 기기의 접속이 끊어진 경우|
|:--:|:--:|
|![pc_disconnect](https://github.com/dongtimes2/readme_image/assets/98700888/925b2562-a31b-4736-8685-507a7a04baeb)|![mobile_disconnect](https://github.com/dongtimes2/readme_image/assets/98700888/4dbfd742-2851-41ed-912e-a3e5903cc28b)|
|모바일 기기에는 더이상 기기를 사용할 수 없다는 문구가 출력된다.|PC 브라우저는 강제로 메인 화면으로 이동하며, 모바일 기기와의 연동 정보가 사라진다|

&nbsp;  

#### 유저가 브라우저를 blur한 경우

게임을 구현할 때 requestAnimationFrame를 이용하여 canvas의 움직임을 표현하였습니다.  
requestAnimationFrame의 경우 자원을 절약하기 위해, 사용자에게 보여지지 않는다면 애니메이션이 중도에 멈출 수 있습니다.  
특히 host의 경우 guest에게 계속해서 canvas의 프레임 정보를 전달해야 하는데, host가 브라우저를 blur하여 애니메이션이 멈출 경우 guest의 화면도 멈추기 때문에 원활한 플레이를 할 수 없게 됩니다.  
따라서 blur 이벤트가 발생할 경우, 그 즉시 게임에서 패배하도록 구현하였습니다.  

#### 게임 페이지 내 뒤로가기, 혹은 새로고침을 시도할 경우

pushState 및 popState 이벤트를 이용하여 게임 페이지 내에서 뒤로가기 기능을 막았습니다.  
beforeunload 이벤트를 이용하여 새로고침을 시도했을 때, 페이지가 바로 새로고침 되지 않도록 하였습니다.  

```ts
useEffect(() => {
    const handlePreventRefresh = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    const handlePreventGoBack = (event: PopStateEvent) => {
      window.history.pushState(null, '', window.location.href);
      event.preventDefault();
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('beforeunload', handlePreventRefresh);
    window.addEventListener('popstate', handlePreventGoBack);

    return () => {
      window.removeEventListener('beforeunload', handlePreventRefresh);
      window.removeEventListener('popstate', handlePreventGoBack);
    };
  }, []);
```

#### 게임 페이지 내 PC 브라우저 창을 닫거나, 모바일 기기의 연결을 끊은 경우

부정행위로 간주해여 상대방에게 게임에서 승리했다는 안내가 전달됨과 함께 게임이 종료됩니다.

<br>

### 모바일 기기 움직임으로 버튼 클릭 및 페이지 이동 구현

#### 구현 배경

마우스를 이용하지 않고도, 모바일 기기의 움직임을 통해 버튼을 클릭하거나 페이지를 이동할 수 있는 기능을 구현하였습니다.  

맨 처음 해당 기능을 구현하고자 할 때, 정확히 어떤 움직임을 취해야 하는지를 정할 필요성이 있었습니다.  
가장 먼저 모바일 기기를 허공에서 이리저리 움직이는 방법을 떠올렸습니다.  
허공에서 기기의 위치 변화를 감지하기 위해서는 GPS를 사용해야 하는데, GPS는 특성상 정밀한 움직임을 파악하는데 무리가 있고 실내에서는 인식률이 극히 낮아 사용하기 어렵기 때문에 GPS 기술을 택할 수 없었습니다.  
따라서 기기의 위치를 변화시키는 방법은 사용할 수 없었습니다.  

두 번째 방법은 기기의 기울임 정보를 이용하는 방법입니다.  
거의 모든 휴대폰에는 자이로 센서가 탑재되어 있어 기울임 수치를 정확하게 탐지할 수 있기 때문에, 기울임 정보를 이용하여 움직임 정보를 취하는 방향으로 가닥을 잡았습니다.  

이제 어떻게 기울여서 사용할 것인지에 대한 방식을 정해야 했습니다.  
유저가 직관적으로 사용할 수 있어야 하고, 인식률도 높아야 된다는 제약 조건을 모두 만족시켜야 했습니다.  
고심끝에 채택한 아이디어는 '상', '하', '좌', '우' 각각의 움직임을 조합하는 방식입니다.  
예를 들어 설정 페이지로 이동하고 싶으면 기기를 '좌', 그리고 '상' 방향으로 움직여야 합니다.  

|![main](https://github.com/dongtimes2/readme_image/assets/98700888/06c3300d-cde8-416b-89f7-c6489e55ae0e)|![move](https://github.com/dongtimes2/readme_image/assets/98700888/73cfb458-ccc5-4530-a68b-cef42c16404d)|
|:--:|:--:|
|버튼 옆에 화살표가 표시되어있어, 어느 방향으로 움직임을 취해야 하는지 볼 수 있다|실제 작동 모습|

<br />

#### 구현 상세

![alpha_beta_gamma](https://github.com/dongtimes2/readme_image/assets/98700888/bacb30df-a2f8-4680-beb6-b66b7709d9ab)  
Image source: https://newnow.co/me-myself-and-i/  
&nbsp;  
&nbsp;  

기기가 왼쪽, 혹은 오른쪽으로 회전했는지 파악하기 위해서는 α값(z축)을 확인해야 합니다.  
기기가 위, 혹은 아래로 회전했는지 파악하기 위해서는 β값(x축)을 확인해야 합니다.  
이때 기기가 확실하게 상하좌우로 움직였는지 판정하기 위해서는, 현재 지점을 기준으로 α값이나 β값이 지정된 경계값보다 더 많이 변동했는가를 파악해야 됩니다.  

<div align="center" style="max-width: 100%;">
  <img width="30%" src="https://github.com/dongtimes2/readme_image/assets/98700888/cbd9941b-d965-48ea-8f37-6a35a8a8d8c0" alt="direction"/>
</div>

예를 들어 첨부된 그림과 같이, 상하좌우 경계값의 길이가 20이라고 가정해봅시다.  
현재 α값이 0이고, 기기가 움직인 이후의 α값이 30이라면, α값은 30 증가하였는데 이는 경계값인 20보다 크기 때문에 기기가 좌측으로 움직였다고 판정할 수 있습니다.  
현재 β값이 50이고, 기기가 움직인 이후의 β값이 20이라면, β값은 30감소하였는데 이는 경계값인 20보다 크기 때문에 기기가 아래로 움직였다고 판정할 수 있습니다.  

이런 원리로 기기가 어느 방향으로, 어느 순서로 움직였는지 판정할 수 있고, 이 값이 미리 정해진 값과 일치하다면 주어진 동작을 수행하도록 하였습니다.  

```ts
// 입력된 움직임 값이 ⇩⇦ 라면 홈으로 이동하는 코드

useEffect(() => {
  if (motionString === '⇩⇦') {
    navigate(PATH.HOME);
    s_ResetMotionData();
  }
}, [motionString, navigate]);
```


<!-- 문제를 해결하기 위해, 게임에 참가한 각 유저들의 브라우저 창 사이즈를 측정하였습니다.  
너비 값들 중의 최솟값과, 높이 값들 중의 최솟값을 각각 구해,  
게임이 표시되는 영역은 앞서 구한 너비의 최솟값과 높이의 최솟값이 되도록 하였습니다.

이렇게 구현한다면 게임에 참가한 모든 유저가 똑같은 사이즈의 게임 화면을 볼 수 있게 되는 장점이 생기게 됩니다.

두 번째로 유저별 기울임 수치를 이용하여 Paddle의 위치를 나타내는 방법은  
일차방정식을 이용하여 Paddle의 위치를 계산하는 방법을 사용하였습니다. -->

<!-- 맨 처음 어플리케이션에 접속하면 소켓 통신을 통해 서버로부터 소켓 아이디를 가져와야 된다.
이런 상태여야 어플리케이션의 모든 기능을 수행할 수 있고, 소켓 통신 장애로부터 비롯한 에러도 발생하지 않는다.

따라서 클라이언트 입장에서는 정상적으로 소켓 통신이 가능한 상태인지 파악할 필요성이 있고,
소켓 통신이 정상적으로 진행되지 않을 경우, 어플리케이션의 이용 자체를 제한할 필요성이 있었다.

따라서 pc 환경에서 허용된 라우팅 주소로 접속할 때, 로딩중 컴포넌트를 보여줘 최초의 소켓 통신이 정상적으로 이루어질 때까지 사이트의 이용을 제한하였음 -->

<br />

### AWS 배포
|프론트엔드|백엔드|
|:---:|:---:|
|![front](https://github.com/dongtimes2/readme_image/assets/98700888/86861956-207b-4540-a57a-24aa63396b08)|![back](https://github.com/dongtimes2/readme_image/assets/98700888/b1fb3ee7-d983-4312-94a4-81b6de645d64)|

<br />

## 개발 가이드

### 환경 변수

프로젝트 폴더 root 위치에 .env 파일을 만들고 다음과 같이 환경변수를 설정해주어야 합니다.

#### 프론트엔드

```
VITE_SERVER_URL  // 백엔드 서버 주소입니다.
```

#### 백엔드

```
PORT  // 백엔드 포트 번호입니다. 지정하지 않을 경우 8000번으로 부여됩니다.
CLIENT_URL  // 프론트엔드 주소입니다.
```
### 빌드

#### 프론트엔드

빌드 결과물은 ./build 폴더에 생성됩니다.

```sh
$ npm install
$ npm run build
```

#### 백엔드

빌드 결과물은 ./dist 폴더에 생성됩니다.

```sh
$ npm install
$ npm run build

# 빌드한 결과물 실행
# 전역 환경에 pm2가 설치되어 있어야 올바르게 동작합니다.
$ npm start
```

<br />

## node version

node.js: 18.17.1(LTS), npm: 9.6.7 버전으로 개발되었습니다.  
.nvmrc 파일이 포함되어 있으므로, nvm이 설치되어있는 환경이라면 따로 버전을 설정할 필요가 없습니다.  
