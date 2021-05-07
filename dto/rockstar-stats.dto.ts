import { Rockstar } from "../entity/rockstar.entity";
import { RockstarStats } from "../entity/rockstarstats.entity";
import { Users } from "../entity/users.entity";

export class ReturnRockstarDto{
    rockstar: Rockstar;
    rockstarStats: RockstarStats[];
    isItADto: string;
}