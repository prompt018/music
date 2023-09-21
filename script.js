// 아티클 패널 자바스크립트로 회전 

const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const deg = 45; //각각의 article요소가 회전할 각도
const len = lists.length-1; //순번이 0부터 시작하므로 전체 개수에서 1을 빼줌
const audio = frame.querySelectorAll("audio");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");

let i = 0; 
let num = 0;
let active = 0;

function activation(index, lists) {
  for(let el of lists){
   el.classList.remove("on");
  }
  lists[index].classList.add("on");
}

// article  개수만큼 반복
for(let el of lists) {  
 let pic = el.querySelector(".pic");  

 //각 article 요소를 45도씩 회전하고 아래로 배치
 el.style.transform = `rotate(${deg* i}deg) translateY(-100vh)`;
 pic.style.backgroundImage = `url(img/member${i+1}.jpg)`;
 i++; 

 //각 아티클 요소 안쪽의 재생,정지,처음부터 재생 버튼을 변수에 저장
 let play = el.querySelector(".play");
 let pause = el.querySelector(".pause");
 let load = el.querySelector(".load");

// play 버튼 클릭시
play.addEventListener("click", e=>{
    
 let isActive = e.currentTarget.closest("article").classList.contains("on");
 if(isActive){
    e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
    e.currentTarget.closest("article").querySelector("audio").play();
 }
});

//pause 버튼 클릭시
pause.addEventListener("click",e=>{
 let isActive = e.currentTarget.closest("article").classList.contains("on");
 if(isActive){
  e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");

  e.currentTarget.closest("article").querySelector("audio").pause();
 }
 
});

//load 버튼 클릭시
load.addEventListener("click", e=> {
  let isActive = e.currentTarget.closest("article").classList.contains("on");
  if (isActive){
   e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
   e.currentTarget.closest("article").querySelector("audio").load();
   e.currentTarget.closest("article").querySelector("audio").play();
  }

});
}


//모든 오디오 요소를 반복하면서 정지시키고 .pic  요소의 모션을 중지해서 초기화 하는 함수

function initMusic(){
  for(let el of audio){
   el.pause();
   el.load();
   el.closest("article").querySelector(".pic").classList.remove("on");
  }
 } 
 
 //prev 버튼 클릭시
 prev.addEventListener("click",()=>{
  // 음악 초기화 함수 호출
  initMusic();
 
  //num 값을 증가시키며 프레임 45도 만큼 증가시키며 시계방향으로 계속 회전
  num++
  frame.style.transform = `rotate(${deg * num}deg)`;
 
  (active == 0) ? active = len : active--;
  activation(active, lists);
 });
 
 //next 버튼 클릭시
 
 next.addEventListener("click",()=> {
 
  // 음악 초기화 함수 호춣
  initMusic();
 
 //num값을 감소시키며 프레임을 45도 만큼 감소시키며 반시계 방향으로 회전
  num--;
  frame.style.transform = `rotate(${deg * num}deg)`;
 
  (active == len) ? active = 0 : active++;
  activation(active, lists);
 });
  
