import stripe from "../Config/Stripe.js";
import cartModel from "../Database/models/CartModel.js";
import orderModel from "../Database/models/OrderModels.js";
import dotenv from "dotenv";

dotenv.config();

export const CreateOrderController = async (req, res)=>{
    try {
        const userId = req.user._id;
        const { shippingAddress, paymentMethod } = req.body;

        const cart = await cartModel.findOne({ user: userId }).populate("items.product");
        if(!cart || cart.items.length === 0){
            return res.status(400).send({success: false, message: "Cart is empty"});
        }

        // Calculate total and prepare order items
        let subTotal = 0;
        const orderItems = cart.items.map((item)=>{
            subTotal += item.product.discountedPrice * item.quantity;
            return { product: item.product._id, quantity: item.quantity, price: item.product.discountedPrice }
        });

        const shippingCharges = subTotal > 1000 ? 150 : 0;
        const tax = (subTotal * 18) / 100;
        const totalAmount = subTotal + shippingCharges + tax;

        // 1️⃣ Create order in DB
        const order = await orderModel.create({
            user: userId,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "pending" : "pending",
            orderStatus: "processing",
            totalAmount
        });

        // // 3️⃣ If Stripe, create session
        if(paymentMethod === "STRIPE"){
            const line_items = cart.items.map((item)=>{
                const price = Number(item.product.discountedPrice);
                const name = item.product.name;
                const image = item.product.images[0].url;
                return{
                    price_data: {
                        currency: "PKR",
                        product_data: {
                            name: name,
                            images: [image],
                        },
                        unit_amount: Math.max(Math.round(Number(price) * 100), 50)
                    },
                    quantity: item.quantity
                }
            })

            if(shippingCharges > 0){
                line_items.push({
                    price_data:{
                        currency: "pkr",
                        product_data:{
                            name: "Shipping Charges"
                        },
                        unit_amount: (shippingCharges * 100)
                    },
                    quantity: 1
                })
            }

            if(tax > 0){
                line_items.push({
                    price_data:{
                        currency: "pkr",
                        product_data:{
                            name: "Tax(18%)"
                        },
                        unit_amount: (tax * 100)
                    },
                    quantity: 1
                })
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items,
                success_url: `${process.env.CLIENT_URL}/order-confirmation/${order._id}`,
                cancel_url: `${process.env.CLIENT_URL}/cart`
            });

            return res.status(200).send({success: true, url: session.url});
        }

        // 2️⃣ Clear cart
        cart.items = [];
        await cart.save();

        // 4️⃣ If COD, return order directly
        res.status(200).send({success: true, order});
    } catch (error) {
        return res.status(500).send({success: false, message: error.message});
    }
}

export const GetOrderConfirmation = async (req, res)=>{
    try {
        const orderId = req.params.id;
        const userId = req.user._id;
        const order = await orderModel.findOne({_id: orderId, user: userId}).populate("items.product");
        if(!order){
            return res.status(404).send({success: false, message: "order not found"});
        }
        return res.status(200).send({success: true, order})
    } catch (error) {
        return res.status(500).send({success: false, message: error.message});
    }
}

