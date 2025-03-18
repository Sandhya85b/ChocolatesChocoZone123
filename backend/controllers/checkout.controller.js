const Order = require('../models/checkout.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
    const { products, token } = req.body;
    const totalAmount = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

    const charge = await stripe.charges.create({
        amount: totalAmount * 100,
        currency: 'INR',
        source: token.id,
        description: 'E-commerce Order Payment'
    });

    const order = new Order({
        userId: req.userId,
        products,
        totalAmount,
        paymentId: charge.id
    });

    await order.save();
    res.json({ message: 'Order placed successfully', order });
};
