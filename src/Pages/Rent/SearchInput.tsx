import React, { FC, useState } from 'react';

interface Props {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    price: number;
    setPrice: React.Dispatch<React.SetStateAction<number>>
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (e: React.FormEvent) => void;
}

const SearchInput: FC<Props> = ({ location, setLocation, price, setPrice, category, setCategory, handleSearch }) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    return (
        <form
            onSubmit={handleSearch}>
            <div className="stats stats-vertical md:stats-horizontal shadow w-full bg-white">
                <div className="stat">
                    {
                        showInput ?
                            <div>
                                <p className='text-gray-500 font-semibold'>Location</p>
                                <input
                                    autoFocus
                                    onChange={(e) => setLocation(e.target.value)}
                                    onBlur={() => setShowInput(false)}
                                    value={location}
                                    type="text"
                                    className='input border border-black text-base' />
                            </div>
                            :
                            <div className='flex flex-col font-semibold cursor-pointer' onClick={() => setShowInput(true)}>
                                <p className='text-gray-500 font-semibold'>Location</p>
                                <h1 className='mt-2'>{location}</h1>
                            </div>
                    }
                </div>

                <div className="stat">
                    <label htmlFor="price" className='text-gray-500 font-semibold pl-4'>Price</label>
                    <select
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        id='price'
                        className="select select-primary w-full max-w-xs border-none text-base bg-white">
                        <option value={0}>Any</option>
                        <option value={1}>$0-$500</option>
                        <option value={2}>$500-$2000</option>
                        <option value={3}>$2000-$4000</option>
                        <option value={4}>$4000-$7000</option>
                        <option value={5}>$7000+</option>
                    </select>
                </div>

                <div className="stat">
                    <label htmlFor="category" className='text-gray-500 font-semibold pl-4'>Property type</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        id='category'
                        className="select select-primary w-full max-w-xs border-none text-base bg-white">
                        <option value={'any'}>Any</option>
                        <option value={'house'}>Houses</option>
                        <option value={'apartment'}>Apartments</option>
                        <option value={'villa'}>Villas</option>
                        <option value={'single_room'}>Single Room</option>
                    </select>
                </div>

                <div className='stat'>
                    <button type="submit" className='btn btn-secondary text-white'>Search</button>
                </div>

            </div>

        </form>
    );
};

export default SearchInput;