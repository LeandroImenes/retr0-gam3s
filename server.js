const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "retro_games"
})

// Testar a conexão
db.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar: ", erro)
    } else {
        console.log("Conectado ao DB")
    }
})

const mostrarJogos = (req, res) => {
    const sql = "SELECT id, nome, desenvolvedora, genero, imagem, preco FROM jogos"
    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).send("Erro ao consultar o DB")
        }
        res.send(resultados)
    })
}
const novoJogo = (req, res) => {
    const { nome, desenvolvedora, genero, imagem, preco } = req.body
    if (nome && desenvolvedora && genero && imagem && preco) {
        const sql = "INSERT INTO jogos (nome, desenvolvedora, genero, imagem, preco) VALUES (?, ?, ?, ?, ?)"
        const valores = [nome, desenvolvedora, genero, imagem, preco]

        db.query(sql, valores, (erro, resultado) => {
            if (erro) {
                return res.status(500).send("Erro ao inserir jogo")
            }
            res.send("Jogo cadastrado com sucesso")
        })
    } else {
        res.status(400).send("Erro: Preencha todos os campos")
    }
}

const atualizarJogo = (req, res)=>{
    const {id} = req.params
    const {nome, desenvolvedora, genero, imagem, preco} = req.body

    if(nome && desenvolvedora && genero && imagem && preco){
        const sql = "UPDATE jogos SET nome = ?, desenvolvedora = ?, genero = ?, imagem = ?, preco = ? WHERE id = ?"
        const valores = [nome, desenvolvedora, genero, imagem, preco, id]

        db.query(sql,valores,(erro, resultado)=>{
            if(erro){
                return res.status(500).send("Erro ao atualizar jogo")
            }
            res.send("Jogo atualizado com sucesso")
        })
    }else{
        res.status(400).send("Erro: Preencha todos os campos")
    }
}
//Delete Discos
const deletarJogo = (req, res)=>{
    const{id}=req.params
    const sql="DELETE FROM jogos WHERE id = ?"

    db.query(sql,[id],(erro,resultado)=>{
        if(erro){
            return res.status(500).send("Erro ao deletar jogo")
        }
        res.send("Jogo deletado com sucesso")
    })
}


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const porta = 3000

app.get("/listar", mostrarJogos)
app.post("/cadastrar", novoJogo)
app.put("/atualizar/:id", atualizarJogo)
app.delete("/deletar/:id", deletarJogo)

app.listen(porta,()=>{
    console.log(`Servidor rodando porta ${porta}`)
})