import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class FilterCategoryDto {

    @ApiPropertyOptional()
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    @IsOptional()
    readonly parentId?: number | null;

    includedParentIds?: number[];
}

export class FilterCategoryHierarchyDto extends FilterCategoryDto {

    @ApiPropertyOptional()
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    @IsOptional()
    readonly isHierarchy?: boolean | null;
}