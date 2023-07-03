const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38vw; background-color:white; width:200px; height:80px; animation: fadein 1s";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("click", handleClick);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    console.log("엔터키");

    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index="${attempts}${i}"]`
      );

      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      console.log("입력한글자:", 입력한_글자, "정답글자:", 정답_글자);
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "white";
      console.log("입력한글자:", 입력한_글자, "정답글자:", 정답_글자);
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index="${attempts}${index - 1}"]`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeyDown = (event) => {
    console.log(event);
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    const thisBlock = document.querySelector(
      `.board-column[data-index="${attempts}${index}"]`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const handleClick = (event) => {
    const key = event.target.dataset.key;
    const keyCode = key.charCodeAt(0);
    // console.log('키값은:',key,'키코드는', keyCode);
    const thisBlock = document.querySelector(
      `.board-column[data-index="${attempts}${index}"]`
    );

    if (key === "backspace") handleBackspace();
    else if (index === 5) {
      if (key === "ENTER") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90 && key !=="ENTER" ) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작시간 = new Date();

    function setTime() {
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시작시간);
      const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
    console.log("timer:", timer);
  };

  startTimer();

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("click", handleClick);
}

appStart();
