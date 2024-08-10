import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('portfolios')
export class Portfolio {
  @ObjectIdColumn() id: ObjectId;
  @Column() title: string;
  @Column('text') description: string;
  @Column() skills?: string[];
  @Column() livelink?: string;
  @Column() status?: boolean;

  constructor(portfolio?: Partial<Portfolio>) {
    Object.assign(this, portfolio);
  }
}