import React, { FC } from 'react'
import { AiOutlinePhone } from 'react-icons/ai';
import { BiBed } from 'react-icons/bi';
import { MdAlternateEmail, MdOutlinePersonOutline } from 'react-icons/md';
import { TbBath, TbSquaresFilled } from 'react-icons/tb';
import { Booking } from '../../modals/Booking'

interface Props {
    rent: Booking;
}

const RentCard: FC<Props> = ({ rent }) => {
    const { _id, propertyImage, price, propertyName, location, bedrooms, bathrooms, propertySize, status, sellerName, sellerPhone, sellerEmail } = rent;
    return (
        <div
            className='rounded-lg bg-white border border-primary relative'>
            <div>
                <span className={`text-white text-lg uppercase p-2 rounded-3xl absolute top-1 right-1 z-20 ${status === 'pending' && 'bg-primary'} ${status === 'declined' && 'bg-error'} ${status === 'confirmed' && 'bg-success'}`}>{status}</span>
                <img className='rounded-t-lg w-full h-64' src={propertyImage} alt="" />
            </div>
            <div className='mt-3 p-3'>
                <p><span className='text-primary font-semibold text-xl'>${price}</span><span className='text-gray-500'>/month</span></p>
                <h3 className='text-2xl font-semibold'>{propertyName}</h3>
                <p className='text-gray-500 text-lg'>{location}</p>
                <div className='md:grid md:grid-cols-3 mt-6'>
                    <span className='flex gap-2 items-center text-gray-600 font-semibold'><BiBed className='text-xl' /> {bedrooms} Beds</span>
                    <span className='flex gap-2 items-center text-gray-600 font-semibold'><TbBath className='text-xl' /> {bathrooms} Baths</span>
                    <span className='flex gap-2 items-center text-gray-600 font-semibold'><TbSquaresFilled className='text-xl' />{propertySize} &#13217;</span>
                </div>
                <div className='bg-base-100 p-2 rounded-lg mt-8'>
                    <h3 className='text-accent text-lg font-semibold'>Property Owner</h3>
                    <hr className='mb-3' />
                    <p><span className='flex gap-2 items-center text-gray-600 font-semibold'><MdOutlinePersonOutline className='text-xl' />: {sellerName}</span></p>
                    <p><span className='flex gap-2 items-center text-gray-600 font-semibold'><AiOutlinePhone className='text-xl' />: {sellerPhone}</span></p>
                    <p><span className='flex gap-2 items-center text-gray-600 font-semibold'><MdAlternateEmail className='text-xl' />: {sellerEmail}</span></p>
                </div>
            </div>
        </div>
    )
}

export default RentCard