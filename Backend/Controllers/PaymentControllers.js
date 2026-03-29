import stripe from "../Config/Stripe.js";

const CheckoutSessionController = async (req, res)=>{
    try {
        const { cartItems } = req.body;
        const line_items = cartItems.map((item)=>({
            price_data: {
                currency: "PKR",
                product_data: {
                    name: item.name,
                    images: [item.image]
                },
                unit_amount: Math.max(Math.round(Number(item.price) * 100), 50)
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            success_url: `${process.env.CLIENT_URL}/order-confirmation/{CHECKOUT_SESSION_ID}`,  // ✅ Ye line change karo
            cancel_url: `${process.env.CLIENT_URL}/cart`
        })

        return res.status(200).send({success: true, url: session.url});
    } catch (error) {
        return res.status(500).send({success: false, message: error.message})
    }
}

export default CheckoutSessionController;