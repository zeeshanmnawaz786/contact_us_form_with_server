import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [result, setResult] = useState(null);

  const sendEmail = async (data) => {
    data.preventDefault();
    console.log(state);
    try {
      await axios({
        method: "post",
        url: "http://localhost:8080/send",
        data: { ...state },
      });
    } catch (err) {
      setResult({
        success: false,
        message: "Something went wrong. Try again later",
      });
    }
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target, "event");

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      {result && (
        <p className={`${result.success ? "success" : "error"}`}>
          {result.message}
        </p>
      )}
      <form onSubmit={sendEmail}>
        <input
          type="text"
          name="name"
          value={state.name}
          placeholder="Enter your full name"
          onChange={onInputChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="email"
          value={state.email}
          placeholder="Enter your email"
          onChange={onInputChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="subject"
          value={state.subject}
          placeholder="Enter subject"
          onChange={onInputChange}
        />
        <br />
        <br />
        <input
          as="textarea"
          name="message"
          value={state.message}
          rows="3"
          placeholder="Enter your message"
          onChange={onInputChange}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
