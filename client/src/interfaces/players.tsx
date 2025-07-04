export interface Player {
  _id: string;
  image: string;
  name: string;
  specialization: string;
  nationality: string;
  debut: string;
  dob: Date;
  squad: string;
  stats: Stats;
}

export interface Stats {
  "Batting & Fielding": object[];
  Bowling: object[];
}

export interface Players {
  players: Player[];
  totalPlayers: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}
