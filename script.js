const API_URL = "http://localhost:3000"

const btnCadastrar = document.getElementById("btnCadastrar")
const btnCancelar = document.getElementById("btnCancelar")
const modal = document.getElementById("modalCadastro")
const form = document.getElementById("formJogos")
const lista = document.getElementById("listarJogos")
const mensagemVazia = document.getElementById("mensagemVazia")

btnCadastrar.addEventListener("click", ()=>{
    modal.showModal()
})

btnCancelar.addEventListener("click", ()=>{
    modal.close()
})

async function carregarJogos(){
    try{
        const resposta = await fetch(API_URL + '/listar')
        const jogos = await resposta.json()
        
        lista.innerHTML=""

        if(jogos.length == 0){
            mensagemVazia.hidden=false
            lista.appendChild(mensagemVazia)
            return
        }

        mensagemVazia.hidden = true
        jogos.forEach(jogo => {
            criarCard(jogo.nome, jogo.desenvolvedora, jogo.genero, jogo.imagem, jogo.preco)
        })
    }catch (erro){
        console.error("Erro ao carregar jogos: ", erro)
        alert("Não foi possível conectar ao servidor")  
    }
}

function criarCard(nome, desenvolvedora, genero, imagem, preco){
    mensagemVazia.hidden = true;

    const card = document.createElement("article")
    card.classList.add("card-jogo")

    const capa = document.createElement("div")
    capa.classList.add("capa")

    const imagemCapa = document.createElement("img")
    imagemCapa.src = imagem
    capa.appendChild(imagemCapa)

    const info = document.createElement("div")
    info.classList.add("info-jogo")

    const titulo = document.createElement("h3")
    titulo.textContent = nome

    const nomeDesenvolvedora = document.createElement("p")
    nomeDesenvolvedora.textContent = "Desenvolvedora: " + desenvolvedora

    const nomeGenero = document.createElement("p")
    nomeGenero.textContent = "Gênero: " + genero

    const valor = document.createElement("strong")
    valor.classList.add("preco")
    valor.textContent = preco.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})

    info.append(titulo, nomeDesenvolvedora,nomeGenero,valor)
    card.append(capa,info)
    lista.appendChild(card)
}

carregarJogos()