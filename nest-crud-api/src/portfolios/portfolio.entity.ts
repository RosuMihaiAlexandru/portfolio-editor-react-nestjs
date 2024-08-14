import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('portfolios')
export class Portfolio {
  @ObjectIdColumn() id: ObjectId;
  @Column() title: string;
  @Column('text') description: string;
  @Column() skills?: string[];
  @Column() livelink?: string;
  @Column() status?: boolean;
  @Column() image?: string;  // Add this line to store image filename

  constructor(portfolio?: Partial<Portfolio>) {
    Object.assign(this, portfolio);
  }
}
