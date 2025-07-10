import { Player } from "./players";

export interface Team {
  teamName: string;
  owner: string;
  imageURL: string;
  wallet: string;
  active: boolean;
  players: Pick<
    Player,
    "_id" | "name" | "image" | "specialization" | "nationality"
  >[];
}
