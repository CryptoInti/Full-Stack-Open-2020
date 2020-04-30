const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}

app.use(requestLogger)

let notes = [
    {
      id: 1,
      content: "HTML is easy asd ",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript asd ",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol asd ",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

app.get('/', (req, res) => {
    res.send('Hallo Welt')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if(note) {
        res.json(note)
    }else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(n => n.id !== id)

    res.status(203).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}
app.post('/api/notes', (req, res) => {
    const body = req.body

    if(!body.content) {
        return res.status(400).json({
            error: "content missing"
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }
    console.log(note)
    notes = notes.concat(note)
    res.json(note)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send('<img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.tumblr.com%2Fixshp06%2FYP6m2221z%2Fdennis_nedry_magic_word_header.gif&f=1&nofb=1" alt="nanana"></img>')
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})