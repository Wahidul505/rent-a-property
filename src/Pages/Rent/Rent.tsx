import React, { FC, useEffect, useState } from 'react'
import { Property } from '../../modals/Property';
import PropertyCard from './PropertyCard';
import SearchInput from './SearchInput'

const Rent: FC = () => {
    const [location, setLocation] = useState<string>('New York');
    const [price, setPrice] = useState<number>(1);
    const [category, setCategory] = useState<string>('house');
    const [properties, setProperties] = useState<Property[]>();
    const [searchedProperties, setSearchedProperties] = useState<Property[]>();

    useEffect(() => {
        fetch('http://localhost:5000/property')
            .then(res => res.json())
            .then(data => setProperties(data));
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
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
                    properties && properties.map(property => <PropertyCard
                        key={property._id}
                        property={property}
                    />)
                }
            </div>
        </div>
    )
}

export default Rent