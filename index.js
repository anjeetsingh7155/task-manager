const express = require('express') // import express
const app = express() // create an express app
const path = require('path') // import path
const server = require('http').createServer(app) // create a server
const port = 3000// set the port to 3000 
app.use(express.json()) //use the json data 
app.use(express.urlencoded({ extended: true })) //use the url encoded data 
app.use(express.static(path.join(__dirname, 'public'))) // use the static files in the public folder
app.set('view engine', 'ejs') // set the view engine to ejs
const fs = require('fs') // import fs module

app.get('/', (req, res) => { //get the home page
    fs.readdir(`./files`, (err, files) => {

        res.render('index', { files: files }) //render the index.ejs file
    })
})

app.post('/create', (req, res) => { // post the data
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
        if (err) {
            alert('someting went wrong')
        }
        res.redirect('/')

    })
})
app.get('/files/:filename', (req, res) => { //this is the route to get the file
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, filedata) => {
        res.render('show', { filename: req.params.filename, filedata: filedata })
    })
})

app.get('/edit/:filename', (req, res) => { //this is the route to edit the file
    res.render('edit', { filename: req.params.filename, })
})
app.post('/edit', (req, res) => { //this is the route to edit the file
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`,(err)=>{
        if(err){
            alert('someting went wrong')
        }
        res.redirect('/')
      })
})
app.listen(port, () => { //  listen the port 3000
    console.log(`server is running on ${port}`)
})