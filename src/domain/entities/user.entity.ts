
export enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    USUARIO = 'usuario'
}

export class User {
    constructor(
        public id: string,
        public fullName: string,
        public username: string,
        public email: string,
        public password: string,
        public phone: string,
        public birthDate: string,
        public role: UserRole,
        public profilePicture: string,
        public isPremium: boolean,
        public points: number
    ) { }
}
