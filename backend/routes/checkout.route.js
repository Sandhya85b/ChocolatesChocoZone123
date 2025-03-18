
router.post('/checkout', async (req, res) => {
    const { products } = req.body;
  
    const line_items = products.map(product => ({
      price_data: {
        currency: 'INR',
        product_data: { name: product.name },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'https://yourfrontend.vercel.app/success',
      cancel_url: 'https://yourfrontend.vercel.app/cancel',
    });
  
    res.json({ id: session.id });
  });
  