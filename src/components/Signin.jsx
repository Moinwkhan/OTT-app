import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import img from "./images/x-lg.svg";

function Signin({ShowSignup}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [error, setError] = useState(""); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
      );
      console.log(`Signup successful, ${response}`);
      ShowSignup(false);
    } catch (error) {
      if (error.response && error.response.status == 409) {
        setError(
          "User already exists. Please choose a different username or email."
        );
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        console.log(`Error occurred during signup: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCrossbtn = () => {
    setFormVisible(false);
    setTimeout(() => {
      ShowSignup(false);
    }, 100);
  };

  return (
    <div>
      {formVisible && (
        <div>
          <img
            src={img}
            alt=""
            className="crossimage"
            onClick={handleCrossbtn}
          />
          <Form onSubmit={handleSubmit} method="post" className="signupForm">
            <Form.Group className="mb-3" controlId="formBasicname">
              <Form.Label style={{ fontSize: "20px" }}>Username</Form.Label>
              <input
                type="text"
                name="name"
                placeholder="Enter Username"
                className="signinInputs"
                value={formData.name}
                onChange={handleChange}
                autoComplete="none"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontSize: "20px" }}>Email</Form.Label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="signinInputs"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ fontSize: "20px" }}>Password</Form.Label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="signinInputs"
                value={formData.password}
                onChange={handleChange}
                autoComplete="none"
                required
              />
            </Form.Group>

            <Button
              className="fs-4"
              variant="none"
              type="submit"
              disabled={submitting}
              style={{ position: "absolute", top: "120%", left: "35%" }}
            >
              {submitting ? "Signing up..." : "Signup"}
            </Button>
          </Form>
          {error && (
            <Alert
              variant="danger"
              style={{ marginTop: "-50px", transition: "none" }}
            >
              {error}
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}

export default Signin;
