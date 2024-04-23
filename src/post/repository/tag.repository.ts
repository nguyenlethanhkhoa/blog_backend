import { DataSource, In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TagEntity } from "../entity/tag.entity";

@Injectable()
export class TagReposity extends Repository<TagEntity> {

    constructor(private dataSource: DataSource) {
        super(TagEntity, dataSource.createEntityManager());
    }

    async createManyNotExist(tagNames: string[]): Promise<void> {

        if (!tagNames.length) {
            return
        }

        const existedTags = await this.find({where: {name: In([...tagNames])}});
        const existedTagNames = existedTags.map((tag) => tag.name);

        const tags: {name: string}[] = [];
        for (const tagName of tagNames) {
            if (existedTagNames.indexOf(tagName) == -1) {
                tags.push({ name: tagName })
            }
        }

        console.log(tags)

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