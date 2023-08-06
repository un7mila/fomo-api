import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'fomo' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', nullable: true, length: 15 })
  email: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 20 })
  password: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 20 })
  name: string | null;

  @Column('int', { name: 'status', default: () => "'0'" })
  status: number;

  @Column('varchar', { name: 'password_salt', nullable: true, length: 50 })
  passwordSalt: string | null;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;
}
