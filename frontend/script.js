document.getElementById("pay-btn").addEventListener("click", async () => {
    try {
        const response = await fetch("https://yourbackend.herokuapp.com/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 500, currency: "INR" })
        });

        const order = await response.json();

        const options = {
            key: "", 
            amount: order.amount,
            currency: order.currency,
            name: "E-commerce Store",
            description: "Test Transaction",
            order_id: order.id,
            handler: async function (response) {
                const verifyResponse = await fetch("https://yourbackend.herokuapp.com/verify-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response)
                });

                const result = await verifyResponse.json();
                if (result.success) {
                    alert("Payment Successful!");
                } else {
                    alert("Payment Failed!");
                }
            },
            prefill: {
                name: "John Doe",
                email: "johndoe@example.com",
                contact: "9999999999"
            },
            theme: { color: "#3399cc" }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Payment Error:", error);
    }
});
