import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attribute_groups', { schema: 'fomo' })
export class AttributeGroups {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('int', { name: 'priority', nullable: true })
  priority: number | null;

  @Column('varchar', { name: 'question', nullable: true, length: 150 })
  question: string | null;

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
