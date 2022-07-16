import React, { FC, useEffect, useState } from 'react'
import { Property } from '../../modals/Property';
import PropertyCard from './PropertyCard';
import SearchInput from './SearchInput'

const Rent: FC = () => {
    const [location, setLocation] = useState<string>('WorldWide');
    const [price, setPrice] = useState<number>(0);
    const [priceRange, setPriceRange] = useState<number[]>([]);
    const [category, setCategory] = useState<string>('any');
    const [properties, setProperties] = useState<Property[]>();
    const [searchedProperties, setSearchedProperties] = useState<Property[]>();
    const [notFound, setNotFound] = useState<boolean>(false);


    console.log(location, price, category);

    useEffect(() => {
        fetch('http://localhost:5000/property')
            .then(res => res.json())
            .then(data => setProperties(data));
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if ((location?.toLowerCase() === 'worldwide' || location?.toLowerCase() === 'world wide' || location?.toLowerCase() === 'any' || location?.toLowerCase() === '' || location?.toLowerCase() === ' ') && price === 0 && category === 'any') {
            setSearchedProperties(properties);
            setNotFound(false);
        }
        else {
            if ((location?.toLowerCase() === 'worldwide' || location?.toLowerCase() === 'world wide' || location?.toLowerCase() === 'any' || location?.toLowerCase() === '' || location?.toLowerCase() === ' ') && price === 0 && category !== 'any') {
                setSearchedProperties(properties?.filter(property => property.category === category));
                setNotFound(false);
            }
            else if ((location?.toLowerCase() === 'worldwide' || location?.toLowerCase() === 'world wide' || location?.toLowerCase() === 'any' || location?.toLowerCase() === '' || location?.toLowerCase() === ' ') && price !== 0 && category === 'any') {
                setSearchedProperties(properties?.filter(property => property.price > priceRange[0] && property.price < priceRange[1]));
                setNotFound(false);
            }
            else if ((location?.toLowerCase() === 'worldwide' || location?.toLowerCase() === 'world wide' || location?.toLowerCase() === 'any' || location?.toLowerCase() === '' || location?.toLowerCase() === ' ') && price !== 0 && category !== 'any') {
                setSearchedProperties(properties?.filter(property => property.price > priceRange[0] && property.price < priceRange[1] && property.category === category));
                setNotFound(false);
            }
            else if (price === 0 && category === 'any') {
                setSearchedProperties(properties?.filter(property => property?.location?.toLowerCase()?.includes(location?.toLowerCase())));
                setNotFound(false);
            }
            else if (price !== 0 && category === 'any') {
                setSearchedProperties(properties?.filter(property => property?.location?.toLowerCase()?.includes(location?.toLowerCase()) && property.price > priceRange[0] && property.price < priceRange[1]));
                setNotFound(false);
            }
            else if (price === 0 && category !== 'any') {
                setSearchedProperties(properties?.filter(property => property?.location?.toLowerCase()?.includes(location?.toLowerCase()) && property.category === category));
                setNotFound(false);
            }
            else if (price !== 0 && category !== 'any') {
                setSearchedProperties(properties?.filter(property => property?.location?.toLowerCase()?.includes(location?.toLowerCase()) && property.price > priceRange[0] && property.price < priceRange[1] && property.category === category));
                setNotFound(false);
            }
            else {
                setNotFound(true);
            }
        }
    }

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>Search Your Favorite Properties</h1>
            <div>
                <SearchInput
                    location={location} setLocation={setLocation}
                    price={price} setPrice={setPrice}
                    category={category} setCategory={setCategory}
                    handleSearch={handleSearch}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center mt-12'>
                {
                    notFound ?
                        <h1>No Result Found</h1>
                        :
                        searchedProperties && searchedProperties.map(property => <PropertyCard
                            key={property._id}
                            property={property}
                        />)
                }
            </div>
        </div>
    )
}

export default Rent