import { CategoryEntity } from "src/category/category.entity";
import { BaseEntity } from "src/shared/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tag')
export class TagEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true
    })
    name: string
}