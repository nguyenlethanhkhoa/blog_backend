import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'created_at',
        nullable: false,
        type: "timestamp without time zone",
        default: "now()"
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        nullable: false,
        default: "now()",
        onUpdate: "now()"
    })
    updatedAt: Date;
}