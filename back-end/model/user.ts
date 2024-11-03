import { Role } from '../types';

export class User {
    private age: number;
    private name: string;
    private country: string;
    private description: string;
    private email: string;
    private password: string;
    private favGames: string;
    private role: Role;
    

    constructor(user: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
        password: string;
        favGames: string;
        role: Role;
    }) { this.validate(user)
        this.age = user.age;
        this.name = user.name;
        this.country = user.country;
        this.description = user.description;
        this.email = user.email;
        this.password = user.password; 
        this.favGames = user.favGames;  
        this.role = user.role;
    }

    validate(user: {age: number, name: string, country: string, description: string, email: string, password: string, favGames: string, role: Role}) {
        if (!user.age) {
            throw new Error('Age is required');
        }
        if (!user.name) {
            throw new Error('Name is required');
        }
        if (!user.email) {
            throw new Error('Email is required');
        }
        if (!user.password) {
            throw new Error('Password is required');
        }
    }
    equals({
        age,
        name,
        country,
        description,
        email,
        role,
        password,
        favGames,
    }: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
        password: string;
        role: Role;
        favGames: string;
    }): boolean {
        return (
            this.age === age &&
            this.name === name &&
            this.country === country &&
            this.description === description &&
            this.email === email &&
            this.role == role   &&
            this.password === password  &&
            this.favGames === favGames  &&
            this.password === password        
        );
    }

    getAge() {
        return this.age;
    }

    getName() {
        return this.name;
    }

    getCountry() {
        return this.country;
    }

    getDescription() {
        return this.description;
    }

    getEmail() {
        return this.email;
    }

    getrole() {
        return this.role;
    }
    getfavGames() {
        return this.favGames;
    }
}
