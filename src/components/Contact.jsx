import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiSend, FiCheck } from "react-icons/fi";

const Contact = () => {
  const form = useRef();

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_n3vfxer",
        "template_senzkld",
        form.current,
        "IyLH_onUBQW3zh1hY",
      )
      .then(
        () => {
          setSent(true);
          setSending(false);
          form.current.reset();
        },
        (error) => {
          setSending(false);
          console.error("Failed to send", error.text);
        },
      );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white py-16">
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto w-full p-8 items-center md:items-stretch gap-8">
        <div className="contact-hero-text md:w-1/2 flex items-center justify-center">
          <div className="text-center md:text-left">
            <SplitText
              text="Get in touch!"
              className="text-4xl sm:text-6xl md:text-7xl text-[#FF5733] uppercase font-black leading-tight"
              delay={100}
              duration={1.5}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <form ref={form} onSubmit={sendEmail} className="space-y-5 text-left">
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter Subject"
                name="subject"
                className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">
                Message
              </label>
              <textarea
                placeholder="Enter Message"
                name="message"
                rows="6"
                className="w-full px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm pt-3 outline-0 transition-all"
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-slate-900 font-medium hover:bg-slate-800 tracking-wide text-sm px-4 py-2.5 w-full border-0 outline-0 cursor-pointer"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
