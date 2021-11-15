import { Label } from "../kyc";

export interface UserProfile {
  first_name: string;
  last_name: string;
  dob: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  state: string;
  created_at: string;
  updated_at: string;
  metadata?: string;
}

export interface Phone {
  country: string;
  number: string;
  validated_at: string | null;
}

export interface ProxyAccount {
  username: string;
  password: string;
  address: string;
  keyringPair?: any;
  created_at?: string;
  state?: string;
}
export interface UserSkeleton {
  username: string;
  address: string;
}
