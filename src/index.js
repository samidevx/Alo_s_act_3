const { body, validationResult } = require('express-validator');
var morgan = require('morgan')
const express = require('express')
const app = express()
const db = require('./db.json')


app.use(express.json())
app.use(morgan(':method :url :status :user-type'))

app.get('/db', (req,res) => {
    res.status(200).json(db)
})

app.get('/db/:email', (req,res) => {
    const email = parseInt(req.params.email)
    const dba = db.find(dba => dba.email === email)
    res.status(200).json(dba)
})

app.post('/db', //path

    body('first_name').isString().notEmpty,
    body('last_name').isString().notEmpty,
    body('full_name').isString().notEmpty,
    body('position').isString().notEmpty,
    body('twitter').isString().notEmpty,
    body('linkedin').isString().notEmpty,
    body('company').isString().notEmpty,
    body('website_url').isURL().trim().escape(),
    body('domains').isURL().trim().escape(),
    body('country').isLength({ min: 5 }),

     (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    db.push({
        email : req.body.email,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        full_name : req.body.full_name,
        position : req.body.position,
        twitter : req.body.twitter,
        
        linkedin : req.body.linkedin,
        company : req.body.company,
        website_url : req.body.website_url,
        domains : req.body.domains,
        country : req.body.countryv
    })
     res.status(200).json(db)
})


app.put('/db/:email', (req,res) => {
    const email = parseInt(req.params.email)
    let dba = db.find(dba => dba.email === email)

    dba.first_name =req.body.first_name,
    dba.last_name =req.body.last_name,
    dba.full_name =req.body.full_name,
    dba.country =req.body.country,
    dba.position =req.body.position,
    dba.twitter =req.body.twitter,
    dba.linkedin =req.body.linkedin,
    dba.phone_number =req.body.phone_number,
    dba.website_url=req.body.website_url,
    dba.company =req.body.company,
    res.status(200).json(dba)
})

app.delete('/db/:email', (req,res) => {
    const email = parseInt(req.params.email)
    let dba = db.find(dba => dba.email === email)
    db.splice(db.indexOf(dba),1)
    res.status(200).json(dba)
})
 
module.exports= app.listen(3000, () => {
    console.log("Serveur à l'écoute")
})