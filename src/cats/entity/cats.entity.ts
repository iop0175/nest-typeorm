import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cat{
    @PrimaryColumn()
    id: number
    @Column()
    name:string
    @Column()
    age:number
    @Column()
    breed:string
}