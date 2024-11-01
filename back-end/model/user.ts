import { Role } from "../types"; 

export class User {
    private age: number;
    private name: string;
    private country: string;
    private description: string;
    private email: string;
    private role: Role

    constructor(user: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
        role: Role;
    }) {
        this.age = user.age;
        this.name = user.name;
        this.country = user.country;
        this.description = user.description;
        this.email = user.email;
        this.role = user.role;
    }

    equals({
        age,
        name,
        country,
        description,
        email,
        role,
    }: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
        role: Role;
    }): boolean {
        return (
            this.age === age &&
            this.name === name &&
            this.country === country &&
            this.description === description &&
            this.email === email &&
            this.role == role
        );
    }
}
