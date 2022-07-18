import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlinePhone } from 'react-icons/ai';
import { BiBed } from 'react-icons/bi';
import { MdAlternateEmail, MdOutlinePersonOutline } from 'react-icons/md';
import { TbBath, TbSquaresFilled } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { Property } from '../../modals/Property';
import RentApplications from './RentApplications';

const SaleDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState<Property>();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://rent-a-property-server.herokuapp.com/property/${id}`)
            .then(res => res.json())
            .then(data => {
                setProperty(data)
                console.log(data)
            });
    }, [id]);
    return (
        <div>
            <div>
                <span
                    onClick={() => navigate('/dashboard/my-sales')}
                    className='flex gap-2 items-center text-primary font-semibold cursor-pointer w-fit'><AiOutlineLeft className='text-xl' />
                    Back to My Sales
                </span>
                <div className='mt-8'>
                    <h1 className='text-3xl font-bold'>
                        {property?.propertyName ? property.propertyName : ''}
                        <span>{property?.category ? property.category : ''}</span>
                    </h1>
                    <p className='text-gray-500 mt-3 text-lg'>{property?.location ? property.location : ''}</p>
                </div>
                <div className='mt-8'>
                    <img className='rounded-lg w-full h-96' src={property?.propertyImage ? property.propertyImage : ''} alt="" />
                    <div className="stats stats-vertical md:stats-horizontal shadow w-full mt-8 border border-accent">
                        <div className="stat">
                            <div className="stat-title">Bedrooms</div>
                            <div><span className='flex gap-2 items-center text-gray-600 font-semibold'><BiBed className='text-xl' /> {property?.bedrooms ? property.bedrooms : ''} Beds</span></div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">Bathrooms</div>
                            <div><span className='flex gap-2 items-center text-gray-600 font-semibold'><TbBath className='text-xl' /> {property?.bathrooms ? property.bathrooms : ''} Baths</span></div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">Square Area</div>
                            <div><span className='flex gap-2 items-center text-gray-600 font-semibold'><TbSquaresFilled className='text-xl' /> {property?.propertySize ? property.propertySize : ''} &#13217;</span></div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-6 mt-8'>
                        <div>
                            <h2 className='text-xl font-semibold mb-6'>About this {property?.category ? property.category : ''}</h2>
                            <p>{property?.aboutProperty ? property.aboutProperty : ''}</p>
                        </div>
                        <div className='border border-accent rounded-lg p-2'>
                            <div className='shadow-lg bg-white p-2 rounded-lg mb-8'>
                                <h3 className='text-accent text-lg font-semibold'>Property Owner</h3>
                                <hr className='mb-3' />
                                <p><span className='flex gap-2 items-center text-gray-600 font-semibold'><MdOutlinePersonOutline className='text-xl' />: {property?.sellerName ? property.sellerName : ''}</span></p>
                                <p><span className='flex gap-2 items-center text-gray-600 font-semibold'><AiOutlinePhone className='text-xl' />: {property?.sellerPhone ? property.sellerPhone : ''}</span></p>
                                <p><span className='flex gap-2 items-center text-gray-600 font-semibold'><MdAlternateEmail className='text-xl' />: {property?.sellerEmail ? property.sellerEmail : ''}</span></p>
                            </div>
                            <p className='text-gray-500'>Rent Price</p>
                            <p><span className='text-primary font-semibold text-2xl'>${property?.price ? property.price : ''}</span><span className='text-gray-500'>/month</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <RentApplications id={id} />
        </div>
    );
};

export default SaleDetails;