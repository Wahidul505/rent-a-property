import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeUser } from "../../features/userSlice";
import Input from "../../Components/Input";
import SelectInput from "../../Components/SelectInput";
import ImageInput from "../../Components/ImageInput";

const clientApiKey = "3d4e0c493458422e88918029d453bae7";

const Sale: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [size, setSize] = useState<string>();
  const [asking_price, setAsking_price] = useState<number>();
  const [monthly_rent, setMonthly_rent] = useState<number>();
  const [lease_term, setLease_term] = useState<number>();
  const [property_name, setProperty_name] = useState<string>();
  const [neighborhood, setNeighborhood] = useState<string>("");
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
  const [image, setImage] = useState<any>();
  const [beds, setBeds] = useState<number>(6);
  const [baths, setBaths] = useState<number>(6);
  const [property_type, setProperty_type] = useState<
    "residential" | "commercial" | "industrial"
  >("residential");
  const [loading, setLoading] = useState<boolean>(false);
  const [propertyOption, setPropertyOption] = useState<"sale" | "rental">(
    "sale"
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmitSale = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (user?.email && user.name) {
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${clientApiKey}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            const propertyInfo = {
              property_name,
              status: "available",
              property_use: propertyOption,
              asking_price:
                propertyOption === "sale" ? asking_price : undefined,
              monthly_rent:
                propertyOption === "rental" ? monthly_rent : undefined,
              lease_term: propertyOption === "rental" ? lease_term : undefined,
              neighborhood,
              size,
              beds,
              baths,
              property_type,
              city,
              image: result.data.url,
              owner_email: user?.email,
            };
            fetch("https://rent-a-property-server.vercel.app/property", {
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${user.token}`,
              },
              method: "POST",
              body: JSON.stringify(propertyInfo),
            })
              .then((res) => {
                if (res.status === 401 || res.status === 403) {
                  dispatch(removeUser());
                  setLoading(false);
                } else {
                  return res.json();
                }
              })
              .then((data) => {
                toast.success("Property rented", { id: "rent-success" });
                setLoading(false);
                navigate("/");
              });
          } else {
            toast.error("Something went wrong", { id: "image-upload-error" });
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
      navigate("/login");
      return toast.error("Please, Login", { id: "submit-error" });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Please choose an option</h1>
      <div className="flex items-center space-x-8">
        <button
          className={`bg-transparent  py-1 text-2xl text-[#C9562D] font-semibold ${
            propertyOption === "sale" && "border-b border-[#C9562D]"
          }`}
          onClick={() => setPropertyOption("sale")}
        >
          Sale
        </button>
        <button
          className={`bg-transparent  py-1 text-2xl text-[#C9562D] font-semibold ${
            propertyOption === "rental" && "border-b border-[#C9562D]"
          }`}
          onClick={() => setPropertyOption("rental")}
        >
          Rent
        </button>
      </div>
      <form onSubmit={handleSubmitSale} className="mt-8">
        <div className="grid md:grid-cols-2 md:space-x-6">
          <Input
            id="property_name"
            label="Property Name"
            placeholder="Name of your property"
            type="text"
            onChange={(e: any) => setProperty_name(e.target.value)}
            required
          />
          <SelectInput
            id="property_type"
            label="Property Type"
            onChange={(e: any) => setProperty_type(e.target.value)}
            required={true}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </SelectInput>
        </div>
        <div className="grid md:grid-cols-2 md:space-x-6">
          <Input
            id="size"
            type="number"
            label="Property Size (In square feet)"
            placeholder="2500"
            onChange={(e: any) => setSize(e.target.value)}
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
        </div>
        <div className="grid md:grid-cols-2 md:space-x-6">
          <Input
            id="neighborhood"
            type="text"
            label="Neighborhood"
            placeholder="The area your property located in (One word only)"
            onChange={(e: any) => setNeighborhood(e.target.value)}
            required
          />
          <ImageInput
            id="property_image"
            label="Picture of your Property"
            onChange={(e: any) => setImage(e.target.files && e.target.files[0])}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 md:space-x-6">
          <Input
            id="beds"
            type="number"
            label="Number of Beds"
            placeholder="example: 6"
            onChange={(e: any) => setBeds(parseInt(e.target.value))}
            required
          />

          <Input
            id="baths"
            type="number"
            label="Number of Baths"
            placeholder="example: 6"
            onChange={(e: any) => setBaths(parseInt(e.target.value))}
            required
          />
        </div>

        {/* //  */}

        <div className="grid md:grid-cols-2 md:space-x-6">
          {propertyOption === "sale" && (
            <Input
              id="asking_price"
              type="number"
              label="Asking Price"
              placeholder="In BDT"
              onChange={(e: any) => setAsking_price(parseFloat(e.target.value))}
              required
            />
          )}
          {propertyOption === "rental" && (
            <Input
              id="monthly_rent"
              type="number"
              label="Monthly Rent"
              placeholder="In BDT"
              onChange={(e: any) => setMonthly_rent(parseFloat(e.target.value))}
              required
            />
          )}
          {propertyOption === "rental" && (
            <Input
              id="lease_term"
              type="number"
              label="Lease Term (month)"
              placeholder="example: 12"
              onChange={(e: any) => setLease_term(parseFloat(e.target.value))}
              required
            />
          )}
          <div
            className={`flex justify-end items-center ${
              propertyOption === "rental" && "col-span-2"
            }`}
          >
            {loading ? (
              <button className="btn btn-primary rounded" disabled>
                <svg
                  role="status"
                  className="inline w-8 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </button>
            ) : (
              <button type="submit" className="btn btn-primary rounded">
                Submit
              </button>
            )}
          </div>
        </div>

        {/* // */}
      </form>
    </div>
  );
};

export default Sale;
