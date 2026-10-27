const btnCadastrar = document.getElementById("btnCadastrar")
const btnCancelar = document.getElementById("btnCancelar")
const modal = document.getElementById("modalCadastro")
const form = document.getElementById("formJogo")
const lista = document.getElementById("listarJogos")
const mensagemVazia = document.getElementById("mensagemVazia")

btnCadastrar.addEventListener("click", ()=>{
    modal.showModal()
})
btnCancelar.addEventListener("click", ()=>{
    modal.close()
})
form.addEventListener("submit", (evento)=>{
    evento.preventDefault()
    const jogo = document.getElementById("jogo").value.trim()
    const descricao = document.getElementById("descricao").value.trim
    const desenvolvedora = document.getElementById("desenvolvedora").value.trim()
    const genero = document.getElementById("genero").value.trim()
    const imagem = document.getElementById("imagem").value.trim()
    const preco = Number(document.getElementById("preco").value)
   
    criarCard(jogo,desenvolvedora,genero,imagem,preco)
    form.reset()
    modal.close()
})
function criarCard(jogo, desenvolvedora, genero, imagem, preco){
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
    titulo.textContent = jogo
    const textoDescricao = document.createElement("p")
    textoDescricao.textContent = "Descrição: " + descricao
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