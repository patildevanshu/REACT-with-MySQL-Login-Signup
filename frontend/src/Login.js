import React, { useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link ,useNavigate } from "react-router-dom";
import validation from './LoginValidation';
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors , setErrors] = useState({});
  const handleInput = (event) => {
    setValues(prev => ({...values, [event.target.name]: [event.target.value] }));
  };
  const navigate = useNavigate();


  // captcha validation
  const [captchaInput, setCaptchaInput] = useState('');
    const [message, setMessage] = useState('');

    // Initialize the CAPTCHA engine on component mount
    React.useEffect(() => {
        loadCaptchaEnginge(6); // Load a 6 character CAPTCHA
    }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateCaptcha(captchaInput)) {
      setMessage('CAPTCHA verified successfully!');
      setErrors(validation(values)); 
    if(errors.email === "" && errors.password === "" ) {
      axios.post("http://localhost:8081/login" , values) 
      .then(res => {
          if(res.data === "admin"){
            navigate("/admin");
          }
          else if(res.data === "organizer"){
            navigate("/organizer");
          }
          else if(res.data === "co-ordinator"){
            navigate("/coordinator");
          }
          else if(res.data === "teacher"){
            navigate("/teacher");
          }
          else if(res.data === "student"){
            navigate("/student");
          }
          else {
            alert("Invalid Credentials");
          }
      })
      .catch(err => console.log(err));
}
  } else {
      setMessage('CAPTCHA verification failed. Please try again.');
  }
    
  };
 

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary-subtle vh-100">
      <div className="d-flex align-items-center">
        <h1>Mind Prabha Techonologies Private Limited</h1>
      <div className="bg-white p-3 rounded w-75">
        
        <h2 className="text-center mb-3">Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              className="form-control"
              onChange={handleInput}
            />
            {errors.email && <span className="text-danger">{errors.email }</span> }
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              className="form-control"
              onChange={handleInput}
            />
            {errors.password && <span className="text-danger">{errors.password }</span> }
          </div>
          <div>
                {/* Load the CAPTCHA template */}
                <LoadCanvasTemplate />
            </div>
            <div>
                <label>Enter CAPTCHA:</label>
                <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                />
            </div>
          <button className="btn btn-success w-100 " type="submit">
            <strong>Login</strong>
          </button>
          {message && <p>{message}</p>}
          <p>Terms and conditions applied</p>
          <Link
            to="/signup"
            className="btn btn-default border w-100"
            type="submit"
          >
            <strong>Create Account</strong>
          </Link>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
