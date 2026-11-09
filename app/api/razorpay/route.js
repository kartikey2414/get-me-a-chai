import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    await connectDB();

    let body = await req.formData();
    body = Object.fromEntries(body);
    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
      return NextResponse.json({
        success: false,
        message: "Order Id not found",
      });
    }

    let user = await User.findOne({ username: p.to_user });
    const secret = user.razorpaysecret;

    let xx = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      secret,
    );

    if (xx) {
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: true },
        { new: true },
      );

      if (!updatedPayment) {
        return NextResponse.json({
          success: false,
          message: "Failed to update payment record",
        });
      }

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`,
        { status: 303 },
      );
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment Verification Failed",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
