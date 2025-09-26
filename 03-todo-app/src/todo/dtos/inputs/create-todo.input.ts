import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'The description of the task' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
}
