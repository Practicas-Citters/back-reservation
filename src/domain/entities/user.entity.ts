import type { Court } from "./court.entity.js";

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
    MANAGER = 'manager'
}

export class User {
    constructor(
        public id: string,
        public fullName: string,
        public username: string,
        public email: string,
        public password: string,
        public phone: string,
        public birthDate: string, //Format: "YYYY-MM-DD"
        public role: UserRole,
        public profilePicture: string,
        public isPremium: boolean,
        public points: number,
        public favCourts: Court[]
    ) { }
}
