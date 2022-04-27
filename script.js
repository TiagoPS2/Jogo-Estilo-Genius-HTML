let ordem = []
let clickOrdem = []
let score = 0

//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul

const blue = document.getElementsByClassName(`#blue`)
const red = document.getElementsByClassName(`#red`)
const green = document.getElementsByClassName(`#green`)
const yellow = document.getElementsByClassName(`#yellow`)

//Cria ordem aleatoria de cores
let shuffleOrdem = () => {
  let colorOrdem = Math.floor(Math.random() * 4)
  ordem[ordem.length] = colorOrdem
  clickOrdem = []

  for (let i in ordem) {
    let elementColor = createColorElement(ordem[i])
    ligthColor(elementColor, Number(i) + 1)
  }
}

//Acende a proxima cor
let ligthColor = (element, number) => {
  number = number * 500
  setTimeout(() => {
    element.classList.add('selected')
  }, number - 250)
  setTimeout(() => {
    element.classList.remove('selected')
  })
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
    alert(`Pontuação:  ${score}\n Você acertou! Iniciando próximo nível!`)
    nextLevel()
  }
}

//Funçao para o clique do usuario
let click = color => {
  clickOrdem[clickOrdem.length] = color
  createColorElement(color).classList.add('#selected')

  setTimeout(() => {
    createColorElement(color).classList.remove('#selected')
    checkOrdem()
  }, 250)
}

//Função que retorna a cor
let createColorElement = () => {
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
  alert(
    `Pontuação: ${score}\nVoce perdeu o Jogo!\Clique em OK para iniciar um novo jogo`
  )
  ordem = []
  clickOrdem = []
  playGame()
}

//Função de inicio de jogo
let playGame = () => {
  alert('Bem vindo ao Gênesis! Iniciando novo jogo')
  score = 0

  nextLevel()
}

//Eventos de click para as cores

green.addEventListener('click', click(0))
red.addEventListener('click', click(1))
yellow.addEventListener('click', click(2))
blue.addEventListener('click', click(3))

green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)

playGame()
