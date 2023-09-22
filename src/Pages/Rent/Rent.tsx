import React, { FC, useEffect, useState } from "react";
import { Property } from "../../modals/Property";
import PropertyCard from "./PropertyCard";
import SearchInput from "./SearchInput";
import Loading from "../../Components/Loading";

const Rent: FC = () => {
  const [location, setLocation] = useState<string>("WorldWide");
  const [price, setPrice] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [category, setCategory] = useState<string>("any");
  const [properties, setProperties] = useState<Property[]>();
  const [searchedProperties, setSearchedProperties] = useState<Property[]>();
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://rent-a-property-server.vercel.app/property")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  useEffect(() => {
    switch (price) {
      case 1:
        setPriceRange([0, 500]);
        break;

      case 2:
        setPriceRange([501, 2000]);
        break;

      case 3:
        setPriceRange([2001, 4000]);
        break;

      case 4:
        setPriceRange([4001, 7000]);
        break;

      case 5:
        setPriceRange([7001, Infinity]);
        break;

      default:
        setPriceRange([0, Infinity]);
        break;
    }
  }, [price]);

  useEffect(() => {
    setSearchedProperties(properties);
  }, [properties]);

  useEffect(() => {
    searchedProperties?.length === 0 ? setNotFound(true) : setNotFound(false);
  }, [searchedProperties]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (location?.trim().toLowerCase() === "worldwide" ||
        location?.trim().toLowerCase() === "world wide" ||
        location?.trim().toLowerCase() === "any" ||
        location?.trim().toLowerCase() === "") &&
      price === 0 &&
      category === "any"
    ) {
      setSearchedProperties(properties);
    } else {
      if (
        (location?.trim().toLowerCase() === "worldwide" ||
          location?.trim().toLowerCase() === "world wide" ||
          location?.trim().toLowerCase() === "any" ||
          location?.trim().toLowerCase() === "") &&
        price === 0 &&
        category !== "any"
      ) {
        setSearchedProperties(
          properties?.filter((property) => property.category === category)
        );
      } else if (
        (location?.trim().toLowerCase() === "worldwide" ||
          location?.trim().toLowerCase() === "world wide" ||
          location?.trim().toLowerCase() === "any" ||
          location?.trim().toLowerCase() === "") &&
        price !== 0 &&
        category === "any"
      ) {
        setSearchedProperties(
          properties?.filter(
            (property) =>
              property.price > priceRange[0] && property.price < priceRange[1]
          )
        );
      } else if (
        (location?.trim().toLowerCase() === "worldwide" ||
          location?.trim().toLowerCase() === "world wide" ||
          location?.trim().toLowerCase() === "any" ||
          location?.trim().toLowerCase() === "") &&
        price !== 0 &&
        category !== "any"
      ) {
        setSearchedProperties(
          properties?.filter(
            (property) =>
              property.price > priceRange[0] &&
              property.price < priceRange[1] &&
              property.category === category
          )
        );
      } else if (price === 0 && category === "any") {
        setSearchedProperties(
          properties?.filter((property) =>
            property?.location
              ?.trim()
              .toLowerCase()
              ?.includes(location?.trim().toLowerCase())
          )
        );
      } else if (price !== 0 && category === "any") {
        setSearchedProperties(
          properties?.filter(
            (property) =>
              property?.location
                ?.toLowerCase()
                ?.includes(location?.trim().toLowerCase()) &&
              property.price > priceRange[0] &&
              property.price < priceRange[1]
          )
        );
      } else if (price === 0 && category !== "any") {
        setSearchedProperties(
          properties?.filter(
            (property) =>
              property?.location
                ?.toLowerCase()
                ?.includes(location?.trim().toLowerCase()) &&
              property.category === category
          )
        );
      } else if (price !== 0 && category !== "any") {
        setSearchedProperties(
          properties?.filter(
            (property) =>
              property?.location
                ?.toLowerCase()
                ?.includes(location?.trim().toLowerCase()) &&
              property.price > priceRange[0] &&
              property.price < priceRange[1] &&
              property.category === category
          )
        );
      } else {
        setNotFound(true);
      }
    }
  };

  if (!properties) return <Loading />;

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Search Your Suitable Property</h1>
      <div>
        <SearchInput
          location={location}
          setLocation={setLocation}
          price={price}
          setPrice={setPrice}
          category={category}
          setCategory={setCategory}
          handleSearch={handleSearch}
        />
      </div>

      <div>
        {notFound ? (
          <h1 className="text-3xl font-semibold text-center w-full mt-12">
            No Result Found
          </h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center mt-12">
            {searchedProperties &&
              searchedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rent;
