import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attributes', { schema: 'fomo' })
export class Attributes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('int', { name: 'priority', nullable: true })
  priority: number | null;
}
