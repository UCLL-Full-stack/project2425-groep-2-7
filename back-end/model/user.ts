import { Role } from '../types';
import { User as UserPrisma } from '@prisma/client';

export class User {
    private age: number;
    private name: string;
    private country: string;
    private description: string;
    private email: string;
    private password: string;
    private favGames: string;
    private role: Role;
    private teamId?: number | null;

    constructor({
        age,
        name,
        country,
        description,
        email,
        password,
        favGames,
        role,
        teamId,
    }: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
        password: string;
        favGames: string;
        role: Role;
        teamId?: number | null;
    }) {
        this.validate({ age, name, email, password });
        this.age = age;
        this.name = name;
        this.country = country;
        this.description = description;
        this.email = email;
        this.password = password;
        this.favGames = favGames;
        this.role = role;
        this.teamId = teamId;
    }

    static from({
        age,
        name,
        country,
        description,
        email,
        password,
        favGames,
        role,
        teamId,
    }: UserPrisma): User {
        return new User({
            age,
            name,
            country,
            description,
            email,
            password,
            favGames,
            role: role as Role, // Explicitly cast if needed
            teamId: teamId ?? undefined ,
        });
    }

    validate({ age, name, email, password }: { age: number; name: string; email: string; password: string }) {
        if (!age) throw new Error('Age is required');
        if (!name) throw new Error('Name is required');
        if (!email) throw new Error('Email is required');
        if (!password) throw new Error('Password is required');
    }

    equals({
        age,
        name,
        country,
        description,
        email,
        password,
        favGames,
        role,
    }: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
        password: string;
        favGames: string;
        role: Role;
    }): boolean {
        return (
            this.age === age &&
            this.name === name &&
            this.country === country &&
            this.description === description &&
            this.email === email &&
            this.password === password &&
            this.favGames === favGames &&
            this.role === role
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

    getRole() {
        return this.role;
    }

    getFavGames() {
        return this.favGames;
    }

    getTeamId() {
        return this.teamId;
    }
}
