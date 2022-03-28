const express = require('express');


// const { readFile } = require('fs');

const app = express();
const {readFile} = require('fs').promises;

app.get('/', async(request, response) => {

    response.send(await readFile('./index.html', 'utf-8'));
})

// app.get('/', (request, response) => {

//     readFile('./index.html', 'utf-8', (err, html) => {
//         if(err){
//             response.status(500).send('Sorry, server error');
//         }

//         response.send(html);
//     })
// })
app.use(express.static('styles'));

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'));