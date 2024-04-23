import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePostDto {

    @ApiPropertyOptional()
    @IsNumber()
    @IsNotEmpty()
    readonly categoryId?: number;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    readonly title?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    readonly content?: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsString({ each: true })
    readonly tags?: string[];
}