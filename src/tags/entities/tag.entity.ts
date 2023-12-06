import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from '../../photos/entities/photo.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Photo, (photo) => photo.tags)
  photos: Array<Photo>;
}
