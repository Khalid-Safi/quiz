/*
*[1] الضغظ على إبدا
*[2] تشغيل التايمر
![3] إضافة البيانات
![4] التحقق من الإجابة
*/

// ? SeLected Elements
let timeSpan = document.getElementById("time");
let startBtn = document.getElementById("start");
let main = document.querySelector(".main");
let container = document.querySelector(".big-container");
// ? Global Var
let num = 0;
let qn = 1;
const huh = new Audio();
huh.src = './assets/huh.mp3';
const win = new Audio();
win.src = "./assets/win.mp3"
let dogru = 0;
let yanlis = 0;
getQuestions(num);
function startBtnClicked() {
  main.classList.remove("none");
  startBtn.remove();

  let time = setInterval(function () {
    timer();
  }, 1000);
  let m = 2;
  let s = 60;
  function timer() {
    s--;
    if (s == -1) {
      m--;
      s = 59;
    }
    if (m == -1) {
      m = 0;
      s = 0;
      clearInterval(time);
      alert('لقد خسرت!!!')
      location.reload()
    }
    timeSpan.innerHTML = `${m}:${s}`;
    if (s <= 9) {
      timeSpan.innerHTML = `${m}:0${s}`;
    }
  }
}
function getQuestions(num) {
  fetch("questions.json")
    .then((response) => response.json())
    .then(function (data) {
      myObj = [data];
      addTheQuestionAndAns(myObj[0][num], data);
      if (qn == 11) {
        document.getElementById(
          "question-num"
        ).innerHTML = `10 of 10 questions`;
      } else {
        document.getElementById(
          "question-num"
        ).innerHTML = `${qn++} of 10 questions`;
      }
    });
}

function addTheQuestionAndAns(question, data) {
  if (num <= 9) {
    let h1 = document.createElement("h1");
    h1.innerHTML = question.question;
    h1.id = "question";
    main.appendChild(h1);

    let ansCon = document.createElement("div");
    ansCon.className = "ans-con";
    ansCon.id = "anscon";
    main.appendChild(ansCon);

    for (let i = 1; i < 5; i++) {
      let ansDiv = document.createElement("div");
      ansDiv.id = `ans${i}`;
      ansDiv.classList.add("anss");
      ansDiv.setAttribute(
        "onclick",
        `checkAns(myObj[0][num].rightAns,this.id)`
      );
      ansDiv.innerHTML = question[`ans${i}`];
      ansDiv.dataset.ans = question[`ans${i}`];
      ansCon.appendChild(ansDiv);
    }
  }
}

function checkAns(rAns, id) {
  let element = document.getElementById(id);
  if (element.innerHTML == rAns) {
    element.className = "dogru";
    document.getElementById("ans1").removeAttribute("onclick");
    document.getElementById("ans2").removeAttribute("onclick");
    document.getElementById("ans3").removeAttribute("onclick");
    document.getElementById("ans4").removeAttribute("onclick");
    dogru++;
    win.play()
  }
  if (element.innerHTML != rAns) {
    element.className = "yanlis";
    document.getElementById("ans1").removeAttribute("onclick");
    document.getElementById("ans2").removeAttribute("onclick");
    document.getElementById("ans3").removeAttribute("onclick");
    document.getElementById("ans4").removeAttribute("onclick");
    yanlis++;
    huh.play()
  }
  setTimeout(function () {
    num++;
    main.removeChild(document.getElementById("anscon"));
    main.removeChild(document.getElementById("question"));
    getQuestions(num);
    if (qn == 11) {
        document.getElementById("yan-do").style.display = "flex";
        document.getElementById("dogru-box").innerHTML = dogru;
        document.getElementById("yanlis-box").innerHTML = yanlis;
        
      }
  }, 2500);
  
}
