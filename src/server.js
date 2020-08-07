const proffys = [
    {
    name:"Diego Fernandes ", 
    avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp:"89987654634",
    bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject:"Química", 
    cost:"20,00", 
    weekday:[0], 
    time_from:[720], 
    time_to:[1220]
},
{
    name:"Rafael dos Anjos ", 
    avatar:"https://scontent.fcfb2-1.fna.fbcdn.net/v/t31.0-8/20229450_1444277112329874_8421907480401079454_o.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=lZRWSX8RqPkAX9bYAyX&_nc_ht=scontent.fcfb2-1.fna&oh=f13f099bd201634ad9466be871053e3c&oe=5F522E29",
    whatsapp:"89987654634",
    bio:"Física não é somente uma matéria, ela é um complemento da sua vida. Professor totalmente engajado em fazer o aluno ficar mais confuso do que quando entrou na aula, e também impressionado com a genialidade da vida e do universo universo.",
    subject:"Física", 
    cost:"300,00", 
    weekday:[4], 
    time_from:[720], 
    time_to:[1220]
}
]

const subjects = [
    "Artes ",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]
//funcionalidades
function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

function pageLanding(req,res){
    return res.render("index.html")
}

function pageStudy(req,res){
    const filters = req.query
    return res.render("study.html", {proffys,filters,subjects,weekdays})    
}

function pageGiveClasses(req,res){
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0

    //se tiver dados (data), adcionar; se nao nao adcionar
    if(isNotEmpty){
        data.subject = getSubject(data.subject)
    //adcionar data(dados) a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }
    //se nao, mostrar a pagina
    return res.render("give-classes.html",{subjects,weekdays})
}


const express = require('express')
const server = express() 


//configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express:server,
    noCache:true,  
})

server
//configurar arquivos estaticos(css,scripts,images)
.use(express.static("public"))
//rotas de aplicação 
.get("/",pageLanding)
.get("/study",pageStudy)
.get("/give-classes", pageGiveClasses) 
.listen(5500)

