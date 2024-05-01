import { DataSource, In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TagEntity } from "../entity/tag.entity";

@Injectable()
export class TagReposity extends Repository<TagEntity> {

    constructor(private dataSource: DataSource) {
        super(TagEntity, dataSource.createEntityManager());
    }

    async createManyNotExist(tagNames: {name: string}[]): Promise<void> {

        const strTagNames: string[] = tagNames.map(tagName => tagName.name);
        if (!strTagNames.length) {
            return
        }

        const existedTags = await this.find({where: {name: In([...strTagNames])}});
        const existedTagNames = existedTags.map((tag) => tag.name);

        const tags: {name: string}[] = [];
        for (const tagName of strTagNames) {
            if (existedTagNames.indexOf(tagName) == -1) {
                tags.push({ name: tagName })
            }
        }

        if (!tags.length) {
            return;
        }

        await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(TagEntity)
            .values(tags)
            .execute()
    }

}