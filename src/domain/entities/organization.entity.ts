import type { User } from "./user.entity.js";

export class Organization {
    constructor(
        public id: string,
        public name: string,
        public description: string | null,
        public email: string,
        public phone: string,
        public address: string,
        public city: string,
        public zipCode: string,
        public logo: string | null,
        public bannerImage: string | null,
        public isActive: boolean,
        public managers: User[] //We will use this as an array just in case there is more than one account per organization
    ) { }
}
