export interface User {
  name?: string;
  email: string;
  password: string;
  gender?: "male" | "female";
  age?: number;
  contact?: string;
  city?:
    | "chattogram"
    | "dhaka"
    | "khulna"
    | "mymensingh"
    | "rajshahi"
    | "barisal"
    | "rangpur"
    | "sylhet";
}
