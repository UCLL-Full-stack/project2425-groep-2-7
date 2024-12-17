import { Role } from '../types';
import { User as UserPrisma } from '@prisma/client';

export class User {
    private age: number;
    private name: string;
    private country: string;
    private description: string;
    private email: string;
    private password: string;
    private role?: Role | undefined;
    private teamId?: number | null;

    constructor({
        age,
        name,
        country,
        description,
        email,
        password,
        role,
        teamId,
    }: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
        password: string;
        role?: Role | undefined;
        teamId?: number | null;
    }) {
        this.validate({ age, name, email, password });
        this.age = age;
        this.name = name;
        this.country = country;
        this.description = description;
        this.email = email;
        this.password = password;
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
            role: role as Role,
            teamId: teamId ?? undefined,
        });
    }

    validate({
        age,
        name,
        email,
        password,
    }: {
        age: number;
        name: string;
        email: string;
        password: string;
    }) {
        if (!age) throw new Error('Age is required');
        if (!name) throw new Error('Name is required');
        if (!email) throw new Error('Email is required');
        if (!password) throw new Error('Password is required');
    }

    toPlainObject(): {
    age: number;
    name: string;
    country: string;
    description: string;
    email: string;
    password: string;
    role?: Role | undefined;
    teamId?: number | null;
    } {
        return {
            age: this.age,
            name: this.name,
            country: this.country,
            description: this.description,
            email: this.email,
            password: this.password,
            role: this.role,
            teamId: this.teamId,
        };
    }

    equals(user: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
        password: string;
        role?: Role | undefined;
    }): boolean {
    return (
        this.getAge() === user.age &&
        this.getName() === user.name &&
        this.getCountry() === user.country &&
        this.getDescription() === user.description &&
        this.getEmail() === user.email &&
        this.getPassword() === user.password &&
        this.getRole() === user.role
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
    getTeamId() {
        return this.teamId;
    }
    getPassword() {
        return this.password;
    }
}
