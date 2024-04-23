import { ApiPropertyOptional } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class UpdateCategoryDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiPropertyOptional()
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    readonly parentId: number | null;
}