import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: 'The id of the task' })
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, {
    nullable: true,
    description: 'The description of the task',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'The status of the task',
  })
  @IsOptional()
  done?: boolean;
}
