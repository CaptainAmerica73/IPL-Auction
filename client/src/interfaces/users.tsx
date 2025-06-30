export interface User {
  id: string;
  userName: string;
  role: "user" | "admin";
  isAuthenticated: boolean;
  teamName: string;
  auctions: string[];
  wallet: string;
}

export interface Users {
  users: User[];
  totalUsers: number;
  isLoading: boolean;
  error: string | null;
}
