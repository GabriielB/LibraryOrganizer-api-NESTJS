/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';
import { AuthorDTO } from './author.dto';
import {Type} from 'class-transformer';

export class BookDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @Type(() => AuthorDTO)
  @ValidateNested({each: true})
  readonly author: AuthorDTO[];

  @IsNotEmpty()
  @IsString()  
  readonly language: string;
  
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly releaseYear: number;

  @IsNotEmpty()
  @IsString()
  readonly publisher: string;
  
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly pages: number;
}
