const API_URL = "http://localhost:3000"

const btnCadastrar = document.getElementById('btnCadastrar')
const btnCancelar = document.getElementById('btnCancelar')
const modal = document.getElementById('modalCadastro')
const form = document.getElementById('formJogo')
const lista = document.getElementById('listarJogos')
const mensagemVazia = document.getElementById('mensagemVazia')

let idEditando = null

btnCadastrar.addEventListener("click", () => {
    modal.showModal();
})

btnCancelar.addEventListener("click", () => {
    modal.close();
})
modal.addEventListener("close",()=>{
    idEditando = null
    form.reset()
})
//Carregando as informações do BD (GET)
async function carregarJogos() {
    try {
        const resposta = await fetch(API_URL + '/listar')
        const jogos = await resposta.json()

        lista.innerHTML = ""

        if (jogos.length === 0) {
            mensagemVazia.hidden = false
            lista.appendChild(mensagemVazia)
            return
        }
        mensagemVazia.hidden = true
        //Renderizar
        jogos.forEach(jogo => {
            criarCard(jogo.nome, jogo.desenvolvedora, jogo.genero, jogo.imagem, jogo.preco,jogo.id)
        })
    } catch (erro) {
        console.error("Erro ao carregar jogos:", erro)
        alert("Não foi possivel conectar ao servidor")
    }
}


//Escolhe o que o submit vai fazer
form.addEventListener("submit", async (evento) => {
    evento.preventDefault()
    if(idEditando){
        await atualizarJogo(idEditando)
    }else{
        await cadastrarJogo()
    }
})

//Cadastrar novo Jogo (post)
async function cadastrarJogo() {
    const novoJogo = {
        nome: document.getElementById("nome").value.trim(),
        desenvolvedora: document.getElementById("desenvolvedora").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        imagem: document.getElementById("imagem").value.trim(),
        preco: Number(document.getElementById("preco").value)
    }
    try {
        const resposta = await fetch(API_URL + '/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)
        })
        if (resposta.ok) {
            modal.close()
            carregarJogos()
        }else{
            alert("Erro ao salvar jogo. Verificar database")
        }
    }catch (erro){
        console.error("Erro na requisição:", erro)
        alert("Erro de conexão com o servidor")
    }
  
}

async function atualizarJogo(id) {
    const jogoAtualizado = {
        nome: document.getElementById("nome").value.trim(),
        desenvolvedora: document.getElementById("desenvolvedora").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        imagem: document.getElementById("imagem").value.trim(),
        preco: Number(document.getElementById("preco").value)
    }
    try{
        const resposta = await fetch(API_URL + '/atualizar/'+ id,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jogoAtualizado)
        })
        if(resposta.ok){
            modal.close()
            carregarJogos()
        }else {
            alert("Erro ao atualizar jogo. Verificar BD")
        }
    }catch (erro){
        console.error("Erro na requisição:", erro)
        alert("Erro de conexão com o servidor")
    }
}
async function deletarJogo(id) {
    try{
        const resposta = await fetch(API_URL + '/deletar/' + id,{
            method:"DELETE"
        })
        if(resposta.ok){
            carregarJogos()
        }else{
            alert("Erro ao deletar jogo")
        }
    }catch (erro){
        console.error("Erro na requisição:",erro)
        alert("Erro de conexão com o servidor")
    }
    
}



function criarCard(nome, desenvolvedora, genero, imagem, preco, id){
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

    const nomeArtista = document.createElement("p")
    nomeArtista.textContent = "Desenvolvedora: " + desenvolvedora

    const nomeGenero = document.createElement("p")
    nomeGenero.textContent = "Gênero: " + genero;

    const valor = document.createElement("strong")
    valor.classList.add("preco")
    valor.textContent = Number(preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    //Botões para editar e excluir
    const acoesCard = document.createElement("div")
    acoesCard.classList.add("acoes-card")
    
    //Editar
    const btnEditar = document.createElement("button")
    btnEditar.type = "button"
    btnEditar.classList.add("btn-editar")
    btnEditar.textContent = "Editar"
    //Função ao clicar
    btnEditar.addEventListener("click",() => {
        idEditando = id
        document.getElementById("nome").value = nome 
        document.getElementById("desenvolvedora").value = desenvolvedora
        document.getElementById("genero").value = genero
        document.getElementById("imagem").value = imagem
        document.getElementById("preco").value = preco
        modal.showModal()
    }) 
    const btnExcluir = document.createElement("button")
    btnExcluir.type = "button"
    btnExcluir.classList.add("btn-excluir")
    btnExcluir.textContent = "Excluir"
    btnExcluir.addEventListener("click",()=>deletarJogo(id))   

    acoesCard.append(btnEditar, btnExcluir)
    info.append(titulo, nomeArtista, nomeGenero, valor, acoesCard)
    card.append(capa, info)
    lista.append(card)


}
carregarJogos()