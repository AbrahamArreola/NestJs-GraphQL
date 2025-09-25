import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hello',
    description: 'Returns a hello world message',
  })
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'Returns a random number between 0 and 100',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description:
      'Returns a random number between 0 and the given number (default is 6)',
  })
  getRandomFromZeroTo(
    @Args('toNumber', { type: () => Int, nullable: true }) toNumber: number = 6,
  ): number {
    return Math.floor(Math.random() * (toNumber + 1));
  }
}
