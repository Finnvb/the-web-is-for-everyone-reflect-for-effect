const express = require('express')
const compression = require('compression')
const app = express()
const fetch = (...args) => import('node-fetch').then(({
  default: fetch
}) => fetch(...args))
const URL = 'https://jeugdzorg.api.fdnd.nl/'
// nodemon index.js //
console.log(URL)
//parses user data
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({
  extended: false
})
// app.use(bodyParser.urlencoded({extended: true}))

// Serve public files
app.use(express.static('public'))

// Hook up a template engine
app.set('view engine', 'ejs')
app.set('views', './views')


app.use( function (req, res, next) {

  // only cache GET requests
  if(req.method =='GET') {
    res.set('Cache-control', 'public, max-age=300')
  } else{

    res.set('Cache-control', `no-store`)
  }
  next()
})

app.use(compression())

app.get('/form', async (req, res) => {
 vragenlijst = await fetchJson(`${URL}v1/vragenlijst`).then(json => json.data)
vraag = await fetchJson(`${URL}v1/vraag`).then(json => json.data)
 competentie = await fetchJson(`${URL}v1/competentie`).then(json => json.data)
  console.log(vragenlijst)
  console.log(vraag[2])
  console.log(competentie)
  res.render('form'), {

    vragenlijst,
    competentie,
    vraag

  }
})

app.get('/', async (req, res) => {
  vragenlijst = await fetchJson(`${URL}v1/vragenlijst`).then(json => json.data)
 vraag = await fetchJson(`${URL}v1/vraag`).then(json => json.data)
  competentie = await fetchJson(`${URL}v1/competentie`).then(json => json.data)
   console.log(vragenlijst)
  //  console.log(vraag[2])
   console.log(competentie)
   res.render('index'), {
 
     vragenlijst,
     competentie,
     vraag
 
   }
 })


 app.get('/login', async (req, res) => {
  vragenlijst = await fetchJson(`${URL}v1/vragenlijst`).then(json => json.data)
 vraag = await fetchJson(`${URL}v1/vraag`).then(json => json.data)
  competentie = await fetchJson(`${URL}v1/competentie`).then(json => json.data)
   console.log(vragenlijst)
   console.log(vraag[2])
   console.log(competentie)
   res.render('login'), {
 
     vragenlijst,
     competentie,
     vraag
 
   }
 })




//post requests naar api
app.post('/competentie', urlencodedParser, (req, res) => {

  const postData = {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetchJson(`${URL}v1/competentie`, postData).then(function () {
    res.render('form', {
      naam: 'req.body'
    })
  })

})




app.post('/vragenlijst', urlencodedParser, (req, res) => {

  const postData = {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetchJson(`${URL}v1/vragenlijst`, postData).then(function () {
    res.render('form', {
      naam: 'req.body'
    })
  })
})



app.post('/vraag', urlencodedParser, (req, res) => {
  // console.log(req.body);
  const postData = {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetchJson(`${URL}v1/vraag`, postData).then(function (data) {
    console.log(data);
    res.render('form', {
      vragenlijstId: 'req.body',
      competentieId: 'req.body',
      vraag: 'req.body'

    })
  })
})







// app.get('/testing', (req, res) => {
//   fetchJson(`https://quote.api.fdnd.nl/v1/quote/`).then(function (jsonData) {
//     console.log(jsonData)
//     res.render('testing', {
//       title: 'Dit is de quotes pagina',
//       quotes: jsonData.data,
//     })
//   })
// })

// app.get('/quote/:quoteId', (request, response) => {
//   fetchJson(`https://quote.api.fdnd.nl/v1/quote/${request.params.quoteId}`).then(function (
//     jsonData
//   ) {
//     response.render('quote', {
//       title: 'Dit is een enkele quote',
//       quote: jsonData.data[0],
//     })
//   })
// })

app.set('port', process.env.PORT || 1337)

const server = app.listen(app.get('port'), () => {
  console.log(`Application started on port: ${app.get('port')}`)
  console.log('http://localhost:1337');
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */



async function fetchJson(url, data = {}) {
  return await fetch(url, data)
    .then((response) => response.json())
    .catch((error) => error)
}