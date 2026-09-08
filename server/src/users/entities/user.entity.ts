import { UserRoles } from "@project/shared-types";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'email', type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;

    @Column({ name: 'password_hash', type: 'varchar', length: 250, nullable: false })
    passwordHash: string;

    @Column({
        name: 'role',
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.USER,
    })
    role: UserRoles;

    @Column({ name: 'reset_token', type: 'varchar', length: 255, nullable: true })
    resetToken: string | null;

    @Column({ name: 'reset_token_expires_at', type: 'timestamp', nullable: true })
    resetTokenExpiresAt: Date | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
