import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chats', { schema: 'fomo' })
export class Chats {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('int', { name: 'to_user_id', nullable: true })
  toUserId: number | null;

  @Column('varchar', { name: 'message', nullable: true, length: 200 })
  message: string | null;

  @Column('tinyint', { name: 'read', nullable: true, width: 1 })
  read: boolean | null;

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
