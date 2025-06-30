import { Player } from "./players";

export interface Team {
  teamName: string;
  owner: string;
  wallet: string;
  players: Player[];
}
