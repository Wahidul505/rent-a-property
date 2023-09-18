import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../modals/Auth";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (name.length < 3 || name.length > 15) {
      setNameError("Name should be between 2 and 15 character");
    } else {
      setNameError("");
    }
    if (!/.+@.+\..+/.test(email)) {
      setEmailError("Provide a valid email");
    } else {
      setEmailError("");
    }
    if (!/^(?=.*[a-z])(?=.*[0-9]).*$/.test(password)) {
      setPasswordError("Password must contains both character and number");
    } else {
      setPasswordError("");
    }
  }, [name, email, password]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameError && !emailError && !passwordError) {
      const newUser: User = {
        name,
        email,
        password,
      };
      const res = await fetch(
        "https://rent-a-property-server.vercel.app/sign-up",
        {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(newUser),
        }
      );
      const data = await res.json();
      if (data.status) {
        navigate("/login");
        toast.success("Please, Login with the created account", {
          id: "signUp-success",
        });
      } else {
        toast.error(data.error, { id: "signUp-failed" });
      }
    }
  };

  return (
    <div className="w-11/12 md:w-1/2 lg:w-2/5 mx-auto flex-shrink-0 shadow-2xl bg-base-100 p-2 md:p-4">
      <form onSubmit={(e) => handleSignUp(e)}>
        <h1 className="text-center text-2xl text-primary mb-6">
          Create An Account
        </h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl">Name</span>
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name"
            className="input input-bordered text-lg"
          />
          <p className="text-error text-sm mt-2">{nameError}</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl">Email</span>
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            className="input input-bordered text-lg"
            required
          />
          <p className="text-error text-sm mt-2">{emailError}</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl">Password</span>
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="input input-bordered text-lg"
            required
          />
          <p className="text-error text-sm mt-2">{passwordError}</p>
          <label className="label">
            <p>
              Already Registered?{" "}
              <Link to="/login" className="underline text-secondary">
                Login
              </Link>
            </p>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
