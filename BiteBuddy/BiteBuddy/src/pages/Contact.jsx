import React, { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const { isSignedIn, user } = useUser();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  // useEffect(() => {
  //   if (user) {
  //     setname(user.fullName || "");
  //     setemail(user.primaryEmailAddress?.emailAddress || "");
  //   }
  // }, [user]);

  const handlesumbit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("Please login to contact us");
      return;
    }

    if (!message.trim()) {
      toast.error("Message is required");
      return;
    }

    const payload = { name, email, message };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/contact",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Message sent successfully 🚀");
      setmessage("");
      setemail("");
      setname("");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Get in Touch 🍽️
        </h1>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Have a question, feedback, or partnership idea? We’d love to hear from
          you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT INFO */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
               <i className="bi bi-geo-alt-fill text-orange-500"></i> Our Location
            </h3>
            <p className="text-gray-600 mt-1">
              Pune, Warje Atul Nagar, Maharashtra, India
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800"><i className="bi bi-telephone-fill text-orange-500"></i> Phone</h3>
            <p className="text-gray-600 mt-1">+91 9130051235</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800"><i className="bi bi-envelope-fill text-orange-500"></i> Email</h3>
            <p className="text-gray-600 mt-1">
              kaustubhsakpal9@gmail.com
            </p>
          </div>

          <div className="pt-4 border-t text-sm text-gray-500">
            “We’re a small team that cares about good food and good service. Drop us a message anytime  we’ll get back to you soon.”
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {!isSignedIn && (
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Please login to send a message
              </p>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                  Login
                </button>
              </SignInButton>
            </div>
          )}

          <form className="space-y-5" onSubmit={handlesumbit}>
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                value={name}
                // disabled={isSignedIn}
                onChange={(e) => setname(e.target.value)}
                required
                type="text"
                placeholder="Your name"
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                value={email}
                // disabled={isSignedIn}
                onChange={(e) => setemail(e.target.value)}
                required
                type="email"
                placeholder="Your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                onChange={(e) => setmessage(e.target.value)}
                value={message}
                required
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={!isSignedIn}
              className={`w-full py-3 font-semibold rounded transition ${
                isSignedIn
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
