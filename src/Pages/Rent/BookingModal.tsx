import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeUser } from '../../features/userSlice';
import { Booking } from '../../modals/Booking';
import { Property } from '../../modals/Property';

interface Props {
    bookingProperty: Property;
    setBookingProperty: React.Dispatch<React.SetStateAction<Property | null | undefined>>;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

const BookingModal: FC<Props> = ({ bookingProperty, setBookingProperty, refetch }) => {
    const { user } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const [renterPhone, setRenterPhone] = useState<string>('');
    const navigate = useNavigate();

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        if (user?.email && user?.name) {
            const bookingInfo: Booking = {
                propertyId: bookingProperty._id,
                renterName: user.name,
                renterEmail: user.email,
                renterPhone,
                sellerName: bookingProperty.sellerName,
                sellerEmail: bookingProperty.sellerEmail,
                sellerPhone: bookingProperty.sellerPhone,
                propertyName: bookingProperty.propertyName,
                aboutProperty: bookingProperty.aboutProperty,
                propertyImage: bookingProperty.propertyImage,
                price: bookingProperty.price,
                propertySize: bookingProperty.propertySize,
                bedrooms: bookingProperty.bedrooms,
                bathrooms: bookingProperty.bathrooms,
                category: bookingProperty.category,
                location: bookingProperty.location,
                status: 'pending'
            };
            fetch('http://localhost:5000/applications', {
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                method: 'POST',
                body: JSON.stringify(bookingInfo)
            }).then(res => {
                if (res.status === 401 || res.status === 403) {
                    navigate('/login');
                    dispatch(removeUser());
                }
                else {
                    return res.json();
                }
            }).then(data => {
                toast.success('Applied for Rent', { id: 'apply-success' });
                setBookingProperty(null);
                refetch();
            })
        }
        else {
            navigate('/login');
            return toast.error('Please, Login', { id: 'apply-error' });
        }
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg mt-6">Apply Rent for <span className='text-primary'>{bookingProperty.propertyName}</span> ({bookingProperty.category})</h3>
                    <form onSubmit={handleApply} className="mt-8">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="seller_name"
                                id="seller_name"
                                value={user?.name}
                                disabled
                                className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="seller_name" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="email"
                                name="seller_email"
                                id="seller_email"
                                value={user?.email}
                                disabled
                                className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="seller_email" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="tel"
                                name="seller_phone"
                                id="seller_phone"
                                onChange={e => setRenterPhone(e.target.value)}
                                className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="seller_phone" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                        </div>
                        <button type="submit" className="btn btn-primary text-white">Submit</button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default BookingModal;