import { Player } from "./players";
import { Team } from "./teams";

export interface Auction {
  _id: string;
  auctionName: string;
  teams: Team[];
  players: Player[];
  currentTeams: number;
  totalTeams: number;
  wallet: string;
  status: "idle" | "active" | "ended";
  createdBy: string;
}

export interface PrivateAuction extends Auction {
  privacy: "private";
  password: string;
}

export interface PublicAuction extends Auction {
  privacy: "public";
}

export interface Auctions {
  auctions: (PublicAuction | PrivateAuction)[];
  totalAuctions: number;
  isLoading: boolean;
  error: string | null;
}
