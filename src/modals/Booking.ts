export interface Booking {
    _id?: string;
    propertyId: string;
    renterName: string;
    renterPhone: string;
    renterEmail: string;
    sellerName: string;
    sellerEmail: string;
    sellerPhone: string;
    propertyName: string;
    aboutProperty: string;
    propertyImage: string;
    price: number;
    propertySize: string;
    bedrooms: number;
    bathrooms: number;
    category: string;
    location: string;
    status: string;
}