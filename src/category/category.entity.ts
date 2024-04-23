import { Expose } from "class-transformer";
import { BaseEntity } from "src/shared/base.entity";
import { PostEntity } from "src/post/entity/post.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity extends BaseEntity{
    
    @Column({
        name: 'parent_id',
        nullable: true
    })
    parentId: number

    @Column({
        nullable: false,
        default: 0
    })
    level: number

    @Column({
        nullable: false,
        unique: true
    })
    name: string

    @Column({
        nullable: false,
        unique: true
    })
    slug: string

    @Expose()
    children: CategoryEntity[]

    @OneToMany(() => PostEntity, (post) => post.category)
    posts: PostEntity[]
}