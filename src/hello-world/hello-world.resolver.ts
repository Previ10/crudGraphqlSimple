import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
    @Query(() => String, { description: "Retorna un saludo" })
    hello(): string {
        return 'Hello World!';
    }

    @Query(() => Float, { name: "randomnumber" })
    getRandomNumber(@Args("tos", { type: () => Int }) tos: number): number {
        return Math.random() * tos;
    }

    @Query(() => Int, { name: "randomnumberCeroTwo" })
    getRandomNumberCeroTwo(@Args("to", { type: () => Int }) to: number): number {
        return Math.floor(Math.random() * to);
    }
}