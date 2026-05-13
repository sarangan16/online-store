import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FiSend, FiCheck } from "react-icons/fi";

const Contact = () => {
  const form = useRef();

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "80px",
        position: "relative",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* page title section */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              color: "#999",
              fontSize: "11px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              fontFamily: "Jost, sans-serif",
              marginBottom: "20px",
            }}
          >
            — Reach Out —
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(48px, 8vw, 80px)",
              color: "#111",
              lineHeight: 1.05,
              marginBottom: "20px",
            }}
          >
            Get in{" "}
            <span style={{ fontStyle: "italic", color: "#111" }}>touch.</span>
          </h1>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#111",
              margin: "0 auto",
            }}
          />
        </div>

        {/* two column layout - info on left, form on right */}
        <div
          className="grid-2col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          {/* left side - contact info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            <p
              style={{
                color: "#555",
                fontFamily: "Jost, sans-serif",
                fontSize: "14px",
                lineHeight: 1.9,
              }}
            >
              We'd love to hear from you — whether it's a question about a
              product, a collaboration, or simply a desire to connect with the
              SARANS family.
            </p>

            {/* contact details - looping so i dont repeat myself */}
            {[
              { label: "Phone", value: "+94 777888424" },
              { label: "Email", value: "info.sarans@gmail.com" },
              { label: "Instagram", value: "@sarans.lk" },
              { label: "Hours", value: "Everyday, 9am–9pm" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  borderLeft: "2px solid #111",
                  paddingLeft: "20px",
                }}
              >
                <p
                  style={{
                    color: "#999",
                    fontSize: "10px",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    fontFamily: "Jost, sans-serif",
                    marginBottom: "4px",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    color: "#111",
                    fontFamily: "Jost, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div>
            {/* show success message after sending */}
            {sent ? (
              <div
                style={{
                  background: "#f9f9f9",
                  border: "1px solid #eee",
                  padding: "48px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#f0f0f0",
                    border: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiCheck size={24} color="#111" />
                </div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "28px",
                    color: "#111",
                  }}
                >
                  Message Sent
                </h3>
                <p
                  style={{
                    color: "#888",
                    fontFamily: "Jost, sans-serif",
                    fontSize: "13px",
                  }}
                >
                  Thank you for reaching out. We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                ref={form}
                onSubmit={sendEmail}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                }}
              >
                {/* looping through fields to keep things clean */}
                {[
                  {
                    label: "Name",
                    name: "name",
                    type: "text",
                    placeholder: "Your full name",
                  },
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                    placeholder: "your@email.com",
                  },
                  {
                    label: "Subject",
                    name: "subject",
                    type: "text",
                    placeholder: "What's this about?",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      style={{
                        display: "block",
                        color: "#999",
                        fontSize: "10px",
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        fontFamily: "Jost, sans-serif",
                        marginBottom: "8px",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      className="input-luxury"
                    />
                  </div>
                ))}

                {/* message textarea - kept separate since it needs different styling */}
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#999",
                      fontSize: "10px",
                      letterSpacing: "0.4em",
                      textTransform: "uppercase",
                      fontFamily: "Jost, sans-serif",
                      marginBottom: "8px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell us anything..."
                    required
                    className="input-luxury"
                    style={{ resize: "none" }}
                  />
                </div>

                {/* submit button - shows spinner while sending */}
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-gold"
                  style={{ width: "100%", boxSizing: "border-box" }}
                >
                  {sending ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          border: "2px solid #ffffff",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <FiSend size={13} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
