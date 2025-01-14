const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(`sk_test_51Qfg9OCDYJoGIGqNmHcIajefwRQAMTv9e3vW4AmNz19An0udYs3iYDSR6gWUQZkYo4autroUthsZFBdPvT97UPja00VRIEbz4I`);
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());


app.post('/checkout', async (req, res) => {

   try{
        const products = req.body;

        const line_items = products.map(product => ({ //create a new array of line_items
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.title,
                    images: [product.image],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity || 1, 
            
        }));

        const session = await stripe.checkout.sessions.create({ //create a new session with the line_items
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `http://localhost:5173/?success=true`,
            cancel_url: `http://localhost:5173/?canceled=true`,
        });

        res.json({ id: session.id }); //send the session id to the client
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    
    }
});

app.listen(3000, () => {    
    console.log('Server is running on http://localhost:3000');
});