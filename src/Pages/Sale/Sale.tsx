import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loading from '../../Components/Loading';
import { removeUser } from '../../features/userSlice';

const clientApiKey = "3d4e0c493458422e88918029d453bae7";

const Sale: FC = () => {
  const { user } = useAppSelector(state => state.userReducer);
  const [propertySize, setPropertySize] = useState<string>();
  const [propertySizeError, setPropertySizeError] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [sellerPhone, setSellerPhone] = useState<string>();
  const [propertyName, setPropertyName] = useState<string>();
  const [aboutProperty, setAboutProperty] = useState<string>();
  const [propertyImage, setPropertyImage] = useState<any>();
  const [bedrooms, setBedrooms] = useState<number>(6);
  const [bathrooms, setBathrooms] = useState<number>(6);
  const [category, setCategory] = useState<string>('house');
  const [location, setLocation] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!/([0-9]+x+[0-9])/.test(propertySize || '')) {
      setPropertySizeError('Example: 3x4');
    }
    else {
      setPropertySizeError('');
    }
  }, [propertySize])

  const handleSubmitSale = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!propertySizeError && user?.email && user.name) {
      const formData = new FormData();
      formData.append('image', propertyImage);
      const url = `https://api.imgbb.com/1/upload?key=${clientApiKey}`;
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(res => res.json()).then(result => {
        if (result.success) {
          const propertyInfo = {
            sellerName: user?.name,
            sellerEmail: user?.email,
            sellerPhone,
            propertyName,
            aboutProperty,
            propertyImage: result.data.url,
            price,
            propertySize,
            bedrooms,
            bathrooms,
            category,
            location,
          };
          fetch('http://localhost:5000/property', {
            headers: {
              'content-type': 'application/json',
              'authorization': `Bearer ${user.token}`
            },
            method: 'POST',
            body: JSON.stringify(propertyInfo)
          }).then(res => {
            if (res.status === 401 || res.status === 403) {
              dispatch(removeUser());
              setLoading(false);
            }
            else {
              return res.json();
            }
          }).then(data => {
            toast.success('Property rented', { id: 'rent-success' });
            setLoading(false);
            navigate('/');
          })
        } else {
          toast.error('Something went wrong', { id: 'image-upload-error' });
          setLoading(false);
        }
      })
    }
    else {
      setLoading(false);
      navigate('/login');
      return toast.error('Please, Login', { id: 'submit-error' });
    }
  }

  return (
    <form onSubmit={handleSubmitSale}>
      <div className="grid xl:grid-cols-2 xl:gap-6">
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
      </div>
      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="tel"
            name="seller_phone"
            id="seller_phone"
            onChange={e => setSellerPhone(e.target.value)}
            className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
          <label htmlFor="seller_phone" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="property_name"
            id="property_name"
            onChange={e => setPropertyName(e.target.value)}
            className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
          <label htmlFor="property_name" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Property Name</label>
        </div>
      </div>
      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="price"
            id="price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
          <label htmlFor="price" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Property Price/month (In US Dollar)</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="property_size"
            id="property_size"
            onChange={(e) => setPropertySize(e.target.value)}
            className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
          <label htmlFor="property_size" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Property Size (Ex: 3x4)</label>
          {propertySizeError && <p className='mt-2 text-error text-sm'>{propertySizeError}</p>}
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <textarea
          name="about_property"
          id="about_property"
          onChange={e => setAboutProperty(e.target.value)}
          className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
        <label htmlFor="about_property" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Property Details</label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="property_image">Upload a Property Picture</label>
        <input
          onChange={e => setPropertyImage(e.target.files && e.target.files[0])}
          className="block w-full text-sm text-gray-900 dark:text-white bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4 h-10" id="property_image"
          type="file"
          required />
      </div>
      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <label htmlFor="bedrooms" className="block mb-2 text-sm font-medium text-gray-900">Bedrooms</label>
          <select
            onChange={e => setBedrooms(parseInt(e.target.value))}
            id="bedrooms"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <option selected value={6}>6</option>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label htmlFor="bathrooms" className="block mb-2 text-sm font-medium text-gray-900">Bathrooms</label>
          <select
            onChange={e => setBathrooms(parseInt(e.target.value))}
            id="bathrooms"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <option selected value={6}>6</option>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label htmlFor="property_category" className="block mb-2 text-sm font-medium text-gray-900">Property Category</label>
        <select
          onChange={e => setCategory(e.target.value)}
          id="property_category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          <option selected value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="single_room">Single Room</option>
        </select>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          onChange={e => setLocation(e.target.value)}
          type="text"
          name="property_location"
          id="property_location"
          className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
        <label htmlFor="property_location" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Property Location</label>
      </div>
      {loading ?
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled><Loading /></button>
        :
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      }
    </form>

  )
}

export default Sale;