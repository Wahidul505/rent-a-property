import React, { FC } from "react";

interface Props {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  property_use: string;
  setPropertyUse: React.Dispatch<React.SetStateAction<string>>;
  property_type: string;
  setPropertyType: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchInput: FC<Props> = ({
  city,
  setCity,
  property_use,
  setPropertyUse,
  property_type,
  setPropertyType,
  handleSearch,
}) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="stats stats-vertical md:stats-horizontal shadow w-full bg-white">
        {/* City Filter */}
        <div className="stat">
          <label htmlFor="city" className="text-gray-500 font-semibold pl-4">
            City
          </label>
          <select
            onChange={(e) => setCity(e.target.value)}
            id="city"
            value={city}
            className="select select-secondary w-full max-w-xs border-none text-base bg-white"
          >
            <option value="any">Any</option>
            <option value="chattogram">Chattogram</option>
            <option value="dhaka">Dhaka</option>
            <option value="khulna">Khulna</option>
            <option value="mymensingh">Mymensingh</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="barisal">Barisal</option>
            <option value="rangpur">Rangpur</option>
            <option value="sylhet">Sylhet</option>
          </select>
        </div>

        {/* Property Use Filter */}
        <div className="stat">
          <label
            htmlFor="property_use"
            className="text-gray-500 font-semibold pl-4"
          >
            Property Use
          </label>
          <select
            onChange={(e) => setPropertyUse(e.target.value)}
            id="property_use"
            value={property_use}
            className="select select-secondary w-full max-w-xs border-none text-base bg-white"
          >
            <option value="any">Any</option>
            <option value="rental">Rental</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        {/* Property Type Filter */}
        <div className="stat">
          <label
            htmlFor="property_type"
            className="text-gray-500 font-semibold pl-4"
          >
            Property Type
          </label>
          <select
            onChange={(e) => setPropertyType(e.target.value)}
            id="property_type"
            value={property_type}
            className="select select-secondary w-full max-w-xs border-none text-base bg-white"
          >
            <option value="any">Any</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex justify-center items-center py-4 md:py-0">
          <button type="submit" className="btn btn-primary rounded">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
