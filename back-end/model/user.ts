import { Role } from '../types';
import { User as UserPrisma } from '@prisma/client';

export class User {
    private id?: number | null;
    private age: number;
    private name: string;
    private country: string;
    private description: string;
    private email: string;
    private password: string;
    private role?: Role | undefined;
    private teamId?: number | null;

    constructor({
        id = null,
        age,
        name,
        country,
        description,
        email,
        password,
        role,
        teamId,
    }: {
        id?: number | null;
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
        password: string;
        role?: Role | undefined;
        teamId?: number | null;
    }) {
        this.validate({ age, name, email });
        this.id = id;
        this.age = age;
        this.name = name;
        this.country = country;
        this.description = description;
        this.password = password;
        this.email = email;
        this.role = role;
        this.teamId = teamId;
    }

    static from({
        id,
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
            id,
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
    }: {
        age: number;
        name: string;
        email: string;
    }) {
        if (!age) throw new Error('Age is required');
        if (!name?.trim()) throw new Error('Name is required');
        if (!email?.trim()) throw new Error('Email is required');
    }

    toPlainObject(): {
        id?: number | null;
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
            id: this.id,
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
    getId() {
        return this.id;
    }
}
