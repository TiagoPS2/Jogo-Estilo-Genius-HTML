//Variaveis de pontuações
let ordem = []
let clickOrdem = []
let score = 0

//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul

//Audios
const audio = [
  new Audio('assets/0.mp3'),
  new Audio('assets/1.mp3'),
  new Audio('assets/2.mp3'),
  new Audio('assets/3.mp3')
]
var somGameOver = document.getElementById('GameOver')

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')

//Cria ordem aleatoria de cores
let shuffleOrdem = () => {
  let colorOrdem = Math.floor(Math.random() * 4)
  ordem[ordem.length] = colorOrdem
  clickOrdem = []

  for (let i in ordem) {
    let elementColor = createColorElement(ordem[i])
    lightColor(elementColor, Number(i) + 1, ordem[i])
  }
}

//Acende a proxima cor
let lightColor = (elementColor, number, color) => {
  number = number * 600
  setTimeout(() => {
    audio[color].play()
    elementColor.classList.add('selected')
  }, number - 400)
  setTimeout(() => {
    elementColor.classList.remove('selected')
  }, number)
}

//Checa se os botões clicados são os mesmo da ordem generada
let checkOrdem = () => {
  for (let i in clickOrdem) {
    if (clickOrdem[i] != ordem[i]) {
      gameOver()
      break
    }
  }

  if (clickOrdem.length == ordem.length) {
    window.alert(
      `Pontuação:  ${score}\n Você acertou! Iniciando próximo nível!`
    )
    nextLevel()
  }
}

//Funçao para o clique do usuario
let click = color => {
  clickOrdem[clickOrdem.length] = color
  createColorElement(color).classList.add('selected')
  audio[color].play()

  setTimeout(() => {
    createColorElement(color).classList.remove('selected')
    checkOrdem()
  }, 250)
}

//Função que retorna a cor
let createColorElement = color => {
  if (color == 0) {
    return green
  } else if (color == 1) {
    return red
  } else if (color == 2) {
    return yellow
  } else if (color == 3) {
    return blue
  }
}

//Função para proximo nivel do jogo
let nextLevel = () => {
  score++
  shuffleOrdem()
}

//Função para gamer over
let gameOver = () => {
  somGameOver.play()
  alert(`${score}\nVoce perdeu o Jogo!\Clique em OK para iniciar um novo jogo`)
  ordem = []
  clickOrdem = []
}

//Função de inicio de jogo
let playGame = () => {
  score = 0
  lightColor()
  nextLevel()
}

//Eventos de click para as cores
green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)
