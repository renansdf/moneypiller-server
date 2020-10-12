import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('session')
class Session {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  totalValue: number;

  @Column()
  hash: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Session;
