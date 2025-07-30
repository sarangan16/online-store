import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n3vfxer",
        "template_ngm0r1r",
        form.current,
        "IyLH_onUBQW3zh1hY"
      )
      .then(
        () => {
          alert("Message has been sent successfully");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send", error.text);
        }
      );
  };

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto bg-white p-8 items-center md:items-start">
      <div className="contact-hero-text md:w-1/2 pr-8 mb-8 md:mb-0 flex items-center justify-center md:justify-start mt-6">
        <div className="w-full max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1">
            <div className="flex flex-col justify-center text-center md:text-left z-10 h-full">
              <h1 className="text-4xl sm:text-3xl md:text-3xl lg:text-7xl font-extrabold uppercase leading-tight tracking-tight">
                Have any question?{" "}
                <span className="text-yellow-500">Get in touch</span>
              </h1>
            </div>
          </div>
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
  );
};

export default Contact;
