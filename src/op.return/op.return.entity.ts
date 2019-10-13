import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, } from 'typeorm';


@Entity()
export class OpReturnEntity {
    @PrimaryGeneratedColumn()
    id: number;



    @Column({ unique: true })
    opReturnData: string;

    @Column({ unique: true })
    transactionHash: string;

    @Column()
    blockHash: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}

