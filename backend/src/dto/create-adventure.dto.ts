export class CreateAdventureDto {
    adventureName: string;
    adventureDescription: string;
    adventureImage: string;
    customMonsters?: string;
    battlefieldMaps: string[];
    adventureFriends: number[];
    adventureMonsters?: string;
  }
  