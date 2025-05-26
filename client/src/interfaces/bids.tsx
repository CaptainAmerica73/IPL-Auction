export interface Bid {
  playerId: string;
  playerName: string;
  amount: number;
  biddedBy: string;
}

export interface Bids {
  bids: Bid[];
  totalPages: number;
  currentPage: number;
  status: "idle" | "active";
  isLoading: boolean;
  error: string | null;
}
