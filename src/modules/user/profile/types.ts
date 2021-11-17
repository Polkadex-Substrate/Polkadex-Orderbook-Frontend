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
