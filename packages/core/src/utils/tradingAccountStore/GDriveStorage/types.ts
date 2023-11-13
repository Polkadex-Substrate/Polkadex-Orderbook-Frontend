export interface GoogleDriveAccount<T> {
  id: string;
  name: string;
  description: string;
  data: T;
}
