import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../modals/Auth";
import Input from "../../Components/Input";
import SelectInput from "../../Components/SelectInput";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [contact, setContact] = useState<string>("");
  const [city, setCity] = useState<
    | "chattogram"
    | "dhaka"
    | "khulna"
    | "mymensingh"
    | "rajshahi"
    | "barisal"
    | "rangpur"
    | "sylhet"
  >("chattogram");
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
        gender,
        age,
        contact,
        city,
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
    <div className="w-11/12 md:w-1/2 lg:w-2/5 mx-auto p-2 md:p-4 border border-solid border-primary rounded">
      <form onSubmit={(e) => handleSignUp(e)}>
        <h1 className="text-center text-2xl text-primary mb-6">
          Create An Account
        </h1>
        <Input
          type="text"
          label="Name"
          placeholder="full name"
          onChange={(e: any) => setName(e.target.value)}
          required
        />
        <p className="text-error text-sm">{nameError}</p>

        <Input
          type="email"
          label="Email"
          placeholder="example@gmail.com"
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />
        <p className="text-error text-sm ">{emailError}</p>

        <SelectInput
          id="gender"
          label="Gender"
          onChange={(e: any) => setGender(e.target.value)}
          required={true}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </SelectInput>

        <Input
          type="number"
          label="Age"
          placeholder="example: 34"
          onChange={(e: any) => setAge(e.target.value)}
          required
        />

        <Input
          type="text"
          label="Phone number"
          placeholder="01823232323"
          onChange={(e: any) => setContact(e.target.value)}
          required
        />

        <SelectInput
          id="city"
          label="City"
          onChange={(e: any) => setCity(e.target.value)}
          required={true}
        >
          <option value="chattogram">Chattogram</option>
          <option value="dhaka">Dhaka</option>
          <option value="khulna">Khulna</option>
          <option value="mymensingh">Mymensingh</option>
          <option value="rajshahi">Rajshahi</option>
          <option value="barisal">Barisal</option>
          <option value="rangpur">Rangpur</option>
          <option value="sylhet">Sylhet</option>
        </SelectInput>

        <Input
          type="password"
          label="Password"
          placeholder="Password"
          onChange={(e: any) => setPassword(e.target.value)}
          required
        />
        <p className="text-error text-sm">{passwordError}</p>

        <label className="label">
          <p>
            Already Registered?{" "}
            <Link to="/login" className="underline text-secondary">
              Login
            </Link>
          </p>
        </label>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary rounded">
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
