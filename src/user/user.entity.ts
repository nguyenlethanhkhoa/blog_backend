import { Exclude } from "class-transformer";
import { BaseEntity } from "src/shared/base.entity";
import { Column, Entity } from "typeorm";

@Entity('user')
export class UserEntity extends BaseEntity{

    @Column({
        nullable: false,
        unique: true
    })
    username: string;

    
    @Column({
        nullable: false,
        select: false
    })
    password: string;

    
    @Column({
        nullable: false,
        select: false
    })
    secret: string;
}