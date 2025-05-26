import { User } from "./users";

export interface Auction {
  id: string;
  users: User[];
  totalTeams: number;
  status: "idle" | "active" | "ended";
}

export interface Auctions {
  auctions: Auction[];
  totalAuctions: number;
  isLoading: boolean;
  error: string | null;
}
