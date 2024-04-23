import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryHierarchyDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('categories')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async findAll(
        @Query() filter: FilterCategoryHierarchyDto
    ): Promise<[CategoryEntity[], number]> {
        return await this.categoryService.findAll(filter);
    }

    @Post()
    async create(
        @Body() category: CreateCategoryDto
    ): Promise<CategoryEntity> {
        return await this.categoryService.create(category);
    }

    @Patch(':id')
    async update(
        @Query('id') id: number,
        @Body() category: UpdateCategoryDto
    ): Promise<CategoryEntity> {
        return await this.categoryService.update(id, category);
    }

    @Get(':id')
    async findOne(@Query('id') id: number): Promise<CategoryEntity> {
        return await this.categoryService.findOneById(id);
    }

    @Delete(':id')
    async deleteOne(@Query('id') id: number): Promise<void> {
        await this.categoryService.deleteOne(id);
    }
    
}
