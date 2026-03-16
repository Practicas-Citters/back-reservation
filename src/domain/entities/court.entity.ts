import type { Sport } from "./sport.entity.js";
import type { User } from "./user.entity.js";

export class Court {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public image: string,
        public capacity: number,
        public pricePerHour: number,
        public location: string,
        public isAvailable: boolean,
        public sport: Sport,
        public user: User
    ) { }
}
