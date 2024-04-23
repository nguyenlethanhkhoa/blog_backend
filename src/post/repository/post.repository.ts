import { DataSource, Repository } from "typeorm";
import { PostEntity } from "../entity/post.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostReposity extends Repository<PostEntity> {

    constructor(private dataSource: DataSource) {
        super(PostEntity, dataSource.createEntityManager());
    }

}