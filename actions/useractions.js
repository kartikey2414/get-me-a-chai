"use server";
import Razorpay from "razorpay";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;
  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform?.name || "Anonymous",
    message: paymentform?.message || "",
  });

  return x;
};

export const fetchuser = async (username) => {
  await connectDB();
  let u = await User.findOne({ username: username });

  if (!u) {
    return null;
  }

  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayments = async (username) => {
  await connectDB();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();
  return p;
};

export const updateProfile = async (data, oldusername) => {
  await connectDB();
  let nData = data;

  if (oldusername !== nData.username) {
    let u = await User.findOne({ username: nData.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ email: nData.email }, nData);
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: nData.username },
    );
  } else {
    await User.updateOne({ email: nData.email }, nData);
  }
};
