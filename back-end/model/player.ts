export class Player {
    readonly age: number;
    readonly name: string;
    readonly country: string;
    readonly description: string;
    readonly email: string;

    constructor(player: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
    }) {
        this.age = player.age;
        this.name = player.name;
        this.country = player.country;
        this.description = player.description;
        this.email = player.email;
    }

    equals({
        age,
        name,
        country,
        description,
        email,
    }: {
        age: number;
        name: string;
        country: string;
        description: string;
        email: string;
    }): boolean {
        return (
            this.age === age &&
            this.name === name &&
            this.country === country &&
            this.description === description &&
            this.email === email
        );
    }
}
