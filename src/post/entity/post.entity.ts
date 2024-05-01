import { Expose } from "class-transformer";
import { CategoryEntity } from "src/category/category.entity";
import { BaseEntity } from "src/shared/base.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { TagEntity } from "./tag.entity";

@Entity('post')
export class PostEntity extends BaseEntity{
    
    @ManyToOne(() => CategoryEntity, (category) => category.posts)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @ManyToMany(() => TagEntity)
    @JoinTable({ 
        name: 'post_tags',
        joinColumn: { name: 'post_id' },
        inverseJoinColumn: { name: 'tag_id' }
    })
    tags: TagEntity[];

    @Column({
        nullable: false,
        unique: true
    })
    title: string;

    @Column({
        nullable: true
    })
    summary: string;

    @Column({
        nullable: true
    })
    thumbnail: string;

    @Column({
        nullable: false,
        unique: true
    })
    slug: string;

    @Column({
        nullable: false,
        type: 'text'
    })
    content: string;
}