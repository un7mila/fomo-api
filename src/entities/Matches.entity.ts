import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("matches", { schema: "fomo" })
export class Matches {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "first_user_id", nullable: true })
  firstUserId: number | null;

  @Column("int", { name: "second_user_id", nullable: true })
  secondUserId: number | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("varchar", { name: "status", nullable: true, length: 10 })
  status: string | null;
}
