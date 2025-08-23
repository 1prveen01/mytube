import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout"; // adjust path if needed
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const Support = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const currentTime = new Date().toLocaleString();
    const timeInput = document.createElement("input");
    timeInput.type = "hidden";
    timeInput.name = "time";
    timeInput.value = currentTime;
    form.current.appendChild(timeInput);

    emailjs
      .sendForm(
        "service_tpyo2nd",  
        "template_u2iocjt",  
        form.current,
        "YJBQEQ1J_7Atkif1P"  
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        }
      );
  };

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw]">
        <ToastContainer />

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">SUPPORT</h2>
          <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4 text-lg font-semibold">
            Need help? Send me a message and I’ll respond as soon as possible.
          </p>
        </div>

        {/* Form */}
        <div className="mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white text-center">
            Contact Support <span className="ml-1">📩</span>
          </h3>

          <form ref={form} onSubmit={sendEmail} className="mt-4 flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Social / Portfolio Links */}
        <div className="mt-12 text-center">
          <h3 className="text-lg text-gray-300 font-semibold">Connect with me</h3>
          <div className="flex items-center justify-center gap-6 mt-4">
            {/* Portfolio */}
            <a
              href="https://my-portfolio-ia14.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
            >
              <FaGlobe size={22} />
              <span>Portfolio</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/1prveen01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
            >
              <FaGithub size={22} />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/praveen-kumar-a70b8921a"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
            >
              <FaLinkedin size={22} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
