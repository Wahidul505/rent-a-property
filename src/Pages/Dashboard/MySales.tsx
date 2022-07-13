import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../app/hooks';
import Loading from '../../Components/Loading';
import { Property } from '../../modals/Property';
import SaleCard from './SaleCard';

const MySales: FC = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const { data: mySales, isLoading } = useQuery(['my-sales', user], () => fetch(`http://localhost:5000/my-sales/${user?.email}`)
        .then(res => res.json())
    );

    if (isLoading) {
        return <Loading />
    };


    return (
        <div className='flex flex-col gap-8 px-3'>
            {
                mySales && mySales.map((sale: Property) => <SaleCard key={sale._id} sale={sale} />)
            }
        </div>
    );
};

export default MySales;