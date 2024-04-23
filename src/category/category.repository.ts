import { DataSource, Repository } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { FilterCategoryDto, FilterCategoryHierarchyDto } from "./dto/filter-category.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryReposity extends Repository<CategoryEntity> {

    constructor(private dataSource: DataSource) {
        super(CategoryEntity, dataSource.createEntityManager());
    }

    async findCategories(filter: FilterCategoryDto): Promise<[CategoryEntity[], number]> {
        const qb = await this.createQueryBuilder()

        if (filter?.parentId) {
            qb.andWhere(
                "parent_id = :parentId", 
                {parentId: filter.parentId}
            )
        }   

        if (filter?.includedParentIds) {
            qb.andWhere(
                "parent_id in (:...includedParentIds)", 
                {includedParentIds: filter.includedParentIds}
            )
        }

        const [items, count] = await qb.getManyAndCount();
        const categories: CategoryEntity[] = items.map((item: CategoryEntity) => {
            item.children = [];
            return item;
        });

        return [categories, count]
    }
}