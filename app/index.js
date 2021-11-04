const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const app = express()

const PORT = 41800

let links = {
    'short': {link: 'https://instagram.com/418team', count: 0},
}

app.use(bodyParser.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'))

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    res.send(String(a + b))
})

app.get('/links', (req, res) => {
    res.render('shortlink', {links})
})

app.post('/links', (req, res) => {
    const url = req.body.url
    const short = req.body.short

    links[short] = {link: url, count: 0}
    res.send('ok')
})

app.get('/link/:link_id', (req, res) => {
    const target = links[req.params.link_id]

    if (!target) {
        res.send('Ссылка не существует');
        return
    }

    links[req.params.link_id] = {...target, count: target.count + 1}

    res.redirect(target.link)
})

app.post('/sum2', (req, res) => {
    res.send(String(req.body.a + req.body.b))
})

app.listen(PORT,() => {
    console.log('Сервер запущен. http://127.0.0.1:' + PORT)
})
