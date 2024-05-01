import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UrlService } from 'src/shared/url/url.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterCategoryHierarchyDto } from './dto/filter-category.dto';
import { CategoryReposity } from './category.repository';

@Injectable()
export class CategoryService {

    constructor(
        private readonly urlService: UrlService,
        private readonly categoryReposity: CategoryReposity
    ) {}

    async findAll(filter: FilterCategoryHierarchyDto): Promise<[CategoryEntity[], number]> {
        
        if (!filter?.isHierarchy) {
            return await this.categoryReposity.findCategories(filter);
        }

        const [items, count] = await this.categoryReposity.findCategories(filter);
        const hierarchyCategories: CategoryEntity[] = await this._getHierarchyCategory(items);

        return [hierarchyCategories, count];
    }

    async findOneById(categoryId: number): Promise<CategoryEntity> {
        return await this.categoryReposity.findOne({where: {id: categoryId}});
    }

    async create(item: CreateCategoryDto): Promise<CategoryEntity> {

        const slug = this.urlService.createSlug(item.name);
        const parentCategory = await this.findOneById(item.parentId);

        let level = 0;
        if (parentCategory) {
            level = parentCategory.level + 1;
        }

        let data: Partial<CategoryEntity> = {
            ...item,
            slug,
            level
        }
        
        return await this.categoryReposity.save({...data});
    }

    async update(id: number, item: UpdateCategoryDto): Promise<CategoryEntity> {
        const slug = this.urlService.createSlug(item.name);
        const parentCategory = await this.findOneById(item.parentId);

        let level = 0;
        if (parentCategory) {
            level = parentCategory.level + 1;
        }

        let data: Partial<CategoryEntity> = {
            ...item,
            slug,
            level
        }

        const category = await this.categoryReposity.update(id, {...data});
        return await this.findOneById(id);
    }

    async deleteOne(id: number): Promise<void> {
        await this.categoryReposity.delete(id);
    }

    private async _getHierarchyCategory(
        items: CategoryEntity[]
    ): Promise<CategoryEntity[]> {

        const parentIds = items.map(item => item.id);
        
        let [subItems, _] = await this.categoryReposity.findCategories({includedParentIds: parentIds});
        if (!subItems.length) {
            return items;
        }

        subItems = await this._getHierarchyCategory(subItems);

        const itemMap: {[key: number]: CategoryEntity} = {};
        for (const item of items) {
            itemMap[item.id] = item;
        }

        for (const subItem of subItems) {
            itemMap[subItem.parentId].children.push(subItem);
        }

        items = Object.values(itemMap);

        return items
    }
}
