const stripe = require("stripe")(process.env.STRIPE_KEY);
const UserModel = require("./../database/models/user_model.js");

// updatePurchasedCourses updates a given user's purchased courses upon successful payment
// this is called in the charge function 
async function updatePurchasedCourses (user, purchasedCourse) {
  // console.log(`purchased courses before ${user.purchasedCourses}`);
  user.purchasedCourses.push(purchasedCourse);
  // console.log(`purchased courses after ${user.purchasedCourses}`);
  try {
    await user.save();
    // console.log("shoulda workded");
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
  
}

async function charge(req, res) {
  try {
    const {token, metadata} = req.body;
    // console.log(`metadata is ${metadata}, username is ${req.user.firstName} `);
    let response = await stripe.charges.create({
      amount: metadata.amount,
      currency: "aud",
      description: "An example charge",
      source: token.id
    });

    let {status} = response;
    // console.log(`status is ${status}`);

    if (status === "succeeded") {
      updatePurchasedCourses(req.user, metadata.purchasedCourse);
    }
    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}



module.exports = {
  charge
};
