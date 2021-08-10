const express = require('express')
const app = express()
const cors = require('cors')



app.use(cors()) 
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.method)
    console.log(req.path)
    console.log(req.body)
    console.log('----')
    next()
} )

let notas = [
    {
        id: 1,
        content: 'tengo hambre',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    },
    {
        id: 2,
        content: 'tengo que cocinar',
        date: '2019-05-30T18:39:34.091Z',
        important: false,
    },
    {
        id: 3,
        content: 'tengo que comprar comida',
        date: '2019-05-30T19:20:14.298Z',
        important: true,
    },
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notas)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notas.find((notas) => notas.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notas = notas.filter((note) => note.id != id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const note = req.body

    if (!note || !note.content) {
        return res.status(400).json({
            error: 'note.content is missing',
        })
    }

    const ids = notas.map((id) => id.id)
    const maxId = Math.max(...ids)
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important : false,
        date: new Date().toISOString(),
    }
    notas = [...notas, newNote]

    res.json(newNote)
})

app.use((req,res)=>{

    res.status(404).json({
        error:'Not Fount'
    })

})

const PORT = process.env.PORT || 3001


app.listen(PORT, () => {    
    console.log(`server listening ${PORT}`)
})