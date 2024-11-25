export interface Property {
  _id: string;
  property_name: string;
  status: "available" | "rented" | "sold";
  property_use: "rental" | "sale";
  asking_price?: number;
  monthly_rent?: number;
  lease_term?: number;
  neighborhood: string;
  size: string;
  beds: string;
  baths: string;
  property_type: "residential" | "commercial" | "industrial";
  city:
    | "chattogram"
    | "dhaka"
    | "khulna"
    | "mymensingh"
    | "rajshahi"
    | "barisal"
    | "rangpur"
    | "sylhet";
  image: string;
  owner_email: string;
}
