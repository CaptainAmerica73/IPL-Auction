import { Player } from "./players";
import { Team } from "./teams";

export interface Auction {
  id: string;
  auctionName: string;
  teams: Team[];
  players: Player[];
  totalTeams: number;
  wallet: string;
  privacy: "private" | "public";
  status: "idle" | "active" | "ended";
  createdBy: string;
}

export interface Auctions {
  auctions: Auction[];
  totalAuctions: number;
  isLoading: boolean;
  error: string | null;
}
