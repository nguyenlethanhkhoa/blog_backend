import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly categoryId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    readonly tags: string[];
}