const express = require('express');
const Stripe = require('stripe');
const cors = require('cors')
var bodyParser = require('body-parser')

const stripe = Stripe('sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg');

const app= express();

app.use(bodyParser.json())

app.use(cors())

app.post('/secret', async (req, res)=>{

  const { amount }=req.body

 const intent= await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'},
  });

  res.json({client_secret: intent.client_secret});

})

app.listen(3001, ()=>{
    console.log('Running on port 3001')
})