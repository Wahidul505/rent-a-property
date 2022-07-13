import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../app/hooks';
import Loading from '../../Components/Loading';
import { Booking } from '../../modals/Booking';
import RentCard from './RentCard';

const MyRents: FC = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const { data: myRents, isLoading } = useQuery('my-rents', () => fetch(`http://localhost:5000/my-rents/${user?.email}`)
        .then(res => res.json())
    );

    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='flex flex-col gap-8 px-3'>
            {
                myRents && myRents.map((rent: Booking) => <RentCard key={rent._id} rent={rent} />)
            }
        </div>
    );
};

export default MyRents;