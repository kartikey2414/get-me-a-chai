"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchpayments, initiate, fetchuser } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const PaymentPage = ({ username }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });

  const [currentuser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast.success("Thanks for your Donation!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      router.replace(`/${username}`);
    }
  }, [searchParams, router, username]);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u || {});
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments || []);
  };

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentuser?.razorpayid,
      amount: amount,
      currency: "INR",
      name: "Get Me A Chai",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name || "<name>",
        email: "<email>",
        contact: "<phone>",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full relative">
        <img
          className="object-cover w-full h-48 md:h-[350px]"
          src={currentuser?.coverpic || ""}
          alt=""
        />
        <div className="absolute overflow-hidden size-36 -bottom-20 left-1/2 -translate-x-1/2 border-white border-2 border-opacity-15 rounded-full">
          <img
            className="rounded-full object-cover size-36"
            width={130}
            height={130}
            src={currentuser?.profilepic || ""}
            alt="Profile Pic"
          />
        </div>
      </div>
      <div className="info flex flex-col gap-2 justify-center items-center my-24">
        <div className="font-bold">@{username}</div>
        <div className="text-slate-400">Let&apos;s help {username} get a Chai!</div>
        <div className="text-slate-400">
          {payments.length} Payments . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>
        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-10 text-white">
            <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length == 0 && <li>No payments yet</li>}
              {payments &&
                payments.map((p, i) => {
                  return (
                    <li key={i} className="my-5 flex gap-2 items-center">
                      <img src="/avatar.gif" alt="" width={33} />
                      <span>
                        {p.name} donated{" "}
                        <span className="font-bold">₹{p.amount}</span> with
                        message &quot;{p.message}&quot;
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="make-payment w-full md:w-1/2 bg-slate-900 rounded-lg p-10 text-white">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                type="text"
                onChange={handleChange}
                name="name"
                value={paymentform.name || ""}
                placeholder="Enter Name"
                className="bg-slate-800 w-full p-3 rounded-lg"
              />
              <input
                type="text"
                name="message"
                onChange={handleChange}
                value={paymentform.message || ""}
                placeholder="Enter Message"
                className="bg-slate-800 w-full p-3 rounded-lg"
              />
              <input
                type="text"
                onChange={handleChange}
                name="amount"
                value={paymentform.amount || ""}
                placeholder="Enter Amount"
                className="bg-slate-800 w-full p-3 rounded-lg"
              />
              <button
                type="button"
                onClick={() => pay(Number.parseInt(paymentform.amount || 0) * 100)}
                className="text-white rounded-lg bg-gradient-to-br from-purple-700 disabled:from-purple-100 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5"
                disabled={
                  (paymentform.name?.length || 0) < 3 ||
                  (paymentform.message?.length || 0) < 4 ||
                  (paymentform.amount?.length < 1)
                }
              >
                Pay
              </button>
            </div>
            <div className="flex gap-3 mt-5 md:flex-row flex-col">
              <button
                className="bg-slate-800 rounded-lg p-3"
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 rounded-lg p-3"
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-800 rounded-lg p-3"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;