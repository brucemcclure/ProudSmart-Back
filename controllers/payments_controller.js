const stripe = require("stripe")("sk_test_gZGmrHbS1vCdlqjBJJZ6Syij00h2hR6oAA");

async function charge(req, res) {
  try {
    console.log(req.body);
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "aud",
      description: "An example charge",
      source: req.body.token
    });

    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}

module.exports = {
  charge
};
