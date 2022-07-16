import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiBed } from 'react-icons/bi';
import { TbBath } from 'react-icons/tb';
import { TbSquaresFilled } from 'react-icons/tb';
import { Property } from '../../modals/Property';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlinePhone } from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';
import { MdOutlinePersonOutline } from 'react-icons/md';
import BookingModal from './BookingModal';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../app/hooks';
import Loading from '../../Components/Loading';

const PropertyDetails = () => {
    const { id } = useParams();
    const { user } = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();
    const [property, setProperty] = useState<Property>();
    const [bookingProperty, setBookingProperty] = useState<Property | null>();
    // const { propertyName, propertyImage, price, propertySize, bedrooms, bathrooms, category, location } = property;
    useEffect(() => {
        fetch(`http://localhost:5000/property/${id}`)
            .then(res => res.json())
            .then(data => setProperty(data));
    }, [id]);

    const { data: bookingStatus, isLoading, refetch } = useQuery(['booking_status', user, id], () => fetch(`http://localhost:5000/isApplied?id=${id}&email=${user?.email}`)
        .then(res => res.json())
    );

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className='lg:px-12'>
                <span
                    onClick={() => navigate('/')}
                    className='flex gap-2 items-center text-primary font-semibold cursor-pointer w-fit'><AiOutlineLeft className='text-xl' />
                    Back to map
                </span>
                <div className='mt-8'>
                    <h1 className='text-3xl font-bold'>{property?.propertyName ? property.propertyName : ''}</h1>
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
                    <div className='grid md:grid-cols-5 grid-cols-1 gap-6 mt-8'>
                        <div className='md:col-span-3'>
                            <h2 className='text-xl font-semibold mb-6'>About this {property?.category ? property.category : ''}</h2>
                            <p>{property?.aboutProperty ? property.aboutProperty : ''}</p>
                        </div>
                        <div className='md:col-span-2 border border-accent rounded-lg p-2 lg:p-4'>
                            <div className='shadow-lg bg-white p-2 rounded-lg mb-8'>
                                <h3 className='text-accent text-lg font-semibold'>Property Owner</h3>
                                <hr className='mb-3' />
                                <p><span className='flex gap-2 items-center text-gray-600 font-semibold'><MdOutlinePersonOutline className='text-xl' />: {property?.sellerName ? property.sellerName : ''}</span></p>
                                <p><span className='flex gap-2 items-center text-gray-600 font-semibold'><AiOutlinePhone className='text-xl' />: {property?.sellerPhone ? property.sellerPhone : ''}</span></p>
                                <p><span className='flex gap-2 items-center text-gray-600 font-semibold'><MdAlternateEmail className='text-xl' />: {property?.sellerEmail ? property.sellerEmail : ''}</span></p>
                            </div>
                            <p className='text-gray-500'>Rent Price</p>
                            <p><span className='text-primary font-semibold text-2xl'>${property?.price ? property.price : ''}</span><span className='text-gray-500'>/month</span></p>
                            {
                                bookingStatus.success ?
                                    <p className='text-lg text-white mt-2 uppercase bg-secondary rounded-3xl py-1 px-2 font-semibold w-fit'>{bookingStatus.status}</p>
                                    :
                                    <label
                                        onClick={() => setBookingProperty(property)}
                                        htmlFor="booking-modal" className="btn btn-primary text-white mt-4">Apply for Rent
                                    </label>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                bookingProperty && <BookingModal
                    bookingProperty={bookingProperty}
                    setBookingProperty={setBookingProperty}
                    refetch={refetch}
                />
            }
        </div>
    );
};

export default PropertyDetails;