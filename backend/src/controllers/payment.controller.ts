import { Request, Response } from "express";
import stripe from "../services/stripeInit";

export const paymentHandler = async (req: Request, res: Response) => {
    const baseUrl = process.env.BASE_URL;
    const { id, product_name, storeId, product_description, price, quantity, imageUrl } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product_name,
                            description: product_description,
                            images: [imageUrl]
                        },
                        unit_amount: price * 100
                    },
                    quantity: quantity
                }
            ],
            mode: 'payment',
            phone_number_collection: {
                enabled: true
            },
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        display_name: 'Standard Shipping',
                        type: 'fixed_amount',
                        fixed_amount: { amount: 3000, currency: 'inr' },
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 5 },
                            maximum: { unit: 'business_day', value: 7 }
                        }
                    }
                }
            ],
            success_url: `${baseUrl}/complete-payment?session_id={CHECKOUT_SESSION_ID}&itemId=${id}&storeId=${storeId}&quantity=${quantity}`,
            cancel_url: `${baseUrl}/cancel-payment?reason=user_cancelled`,
            metadata: {
                orderId: id,
            },
            allow_promotion_codes: true
        });

        res.json({ url: session.url });
    } catch (err) {
        console.log("Error in paymentHandler", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}