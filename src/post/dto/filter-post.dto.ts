import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class FilterPostDto {

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly title?: string;

    @ApiPropertyOptional()
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    @IsOptional()
    readonly categoryId?: number | null;
}