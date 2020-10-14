import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  socketId: string;

  @Column()
  name: string;

  @Column('uuid')
  session_hash: string;

  @Column()
  monthly_cost: number;

  @Column()
  monthly_profit: number;

  @Column()
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
