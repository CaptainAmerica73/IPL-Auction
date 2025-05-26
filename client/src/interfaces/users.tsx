export interface User {
  id: string;
  name: string;
  teamName: string;
  purse: bigint;
}

export interface Users {
  users: User[];
  totalUsers: number;
  isLoading: boolean;
  error: string | null;
}
