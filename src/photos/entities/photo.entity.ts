import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column()
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.photos, { eager: true })
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.photos, { eager: true })
  @JoinTable()
  tags: Array<Tag>;
}
