const stripe = require("stripe")(process.env.STRIPE_KEY);

async function charge(req, res) {
  try {
    const {token, metadata} = req.body;
    console.log(metadata);
    let response = await stripe.charges.create({
      amount: 2000,
      currency: "aud",
      description: "An example charge",
      source: token.id,
      metadata: metadata
    });

    console.log(response);
    let {status} = response.status;
    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}

module.exports = {
  charge
};
