export interface Bid {
  auctionId: string;
  playerName: string;
  amount: number;
  biddedBy: string;
}

export interface Bids {
  bids: Bid[];
  totalBids: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}
