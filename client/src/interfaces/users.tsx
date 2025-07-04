export interface User {
  _id: string;
  userName: string;
  role: "user" | "admin";
  isAuthenticated: boolean;
  auctions: string[];
  teamName: string;
}

export interface Users {
  users: User[];
  totalUsers: number;
  isLoading: boolean;
  error: string | null;
}
