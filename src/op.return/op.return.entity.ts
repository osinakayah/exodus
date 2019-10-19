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

    @Column()
    blockHeight: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}

