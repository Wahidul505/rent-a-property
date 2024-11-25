import React, { FC, useEffect, useState } from "react";
import { Property } from "../../modals/Property";
import PropertyCard from "./PropertyCard";
import SearchInput from "./SearchInput";
import Loading from "../../Components/Loading";

const Rent: FC = () => {
  const [city, setCity] = useState<string>("any");
  const [property_use, setPropertyUse] = useState<string>("any");
  const [property_type, setPropertyType] = useState<string>("any");
  const [properties, setProperties] = useState<Property[]>();
  const [searchedProperties, setSearchedProperties] = useState<Property[]>();
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://rent-a-property-server.vercel.app/property")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  useEffect(() => {
    setSearchedProperties(properties);
  }, [properties]);

  useEffect(() => {
    searchedProperties?.length === 0 ? setNotFound(true) : setNotFound(false);
  }, [searchedProperties]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (city === "any" || city.trim().toLowerCase() === "") &&
      property_use === "any" &&
      property_type === "any"
    ) {
      setSearchedProperties(properties);
    } else {
      setSearchedProperties(
        properties?.filter((property) => {
          const matchesCity =
            city === "any" ||
            property.city?.trim().toLowerCase() === city.trim().toLowerCase();
          const matchesPropertyUse =
            property_use === "any" || property.property_use === property_use;
          const matchesPropertyType =
            property_type === "any" || property.property_type === property_type;

          return matchesCity && matchesPropertyUse && matchesPropertyType;
        })
      );
    }
  };

  if (!properties) return <Loading />;

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Search Your Suitable Property</h1>
      <div>
        <SearchInput
          city={city}
          setCity={setCity}
          property_use={property_use}
          setPropertyUse={setPropertyUse}
          property_type={property_type}
          setPropertyType={setPropertyType}
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
