const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('.board')


let time = 0
let score = 0
var interval = 0

const colors = ['#f41a1a', '#f4e61a', '#4df41a', '#1af4ec', '#1a28f4', '#cb1af4', '#f41a40']


startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event =>{
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event =>{
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame(){
    interval = setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime(){
    if (time === 0){
        finishGame()
    }
    else{
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    
    timeEl.parentNode.classList.add('hide')
    board.style.flexDirection = 'column'
    board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>
    <a href="#" class="moveToStart">Попрбовать снова</a>`
    clearInterval(interval)
    let moveToStartBtn = document.querySelector('.moveToStart')
    moveToStartBtn.addEventListener('click', () => { moveToStart()})
    return
}

function moveToStart(){
    score = 0
    board.innerHTML = ''
    timeEl.parentNode.classList.remove('hide');
    
    screens.forEach(screen =>{
        screen.classList.remove('up')
    })
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()

    const x = getRandomNumber(0, width-size)
    const y = getRandomNumber(0, height-size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `${colors[getRandomNumber(0, colors.length-1)]}`

    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}
