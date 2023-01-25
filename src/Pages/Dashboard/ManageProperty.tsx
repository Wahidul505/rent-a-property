import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loading from '../../Components/Loading';
import { removeUser } from '../../features/userSlice';
import { Property } from '../../modals/Property';

const ManageProperty = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const { data: properties, isLoading, refetch } = useQuery('manage-properties', () => fetch('https://rent-a-property.onrender.com/property').then(res => res.json()));

    if (isLoading) {
        return <Loading />
    }

    const handleDeleteProperty = (id: string) => {
        fetch(`https://rent-a-property.onrender.com/property/${id}`, {
            headers: {
                'authorization': `Bearer ${user?.token}`
            },
            method: 'DELETE'
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                dispatch(removeUser());
            }
            else {
                return res.json();
            }
        }).then(data => {
            if (data.deletedCount) {
                toast.success('Successfully Deleted', { id: 'deleteSuccess' });
                refetch();
            }
        });
    }

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Property Name</th>
                        <th>Owner Id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        properties && properties.map((property: Property, index: number) => {
                            const { _id, propertyName, sellerEmail } = property;
                            return <tr key={_id}>
                                <th>{index + 1}</th>
                                <td>{propertyName}</td>
                                <td>{sellerEmail}</td>
                                <td><button
                                    onClick={() => handleDeleteProperty(_id)}
                                    className='btn btn-xs btn-error'>
                                    Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageProperty;