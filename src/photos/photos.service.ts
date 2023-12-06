import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto) {
    console.warn({ createPhotoDto });
    const { userID, ...rest } = createPhotoDto;

    const user = await this.usersRepository.findOneBy({
      id: parseInt(userID, 10),
    });

    const newPhoto = this.photoRepository.create({ ...rest, user });

    return this.photoRepository.save(newPhoto);
  }

  findAll() {
    return this.photoRepository.find();
  }

  findOne(id: number) {
    return this.photoRepository.findOneBy({ id });
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    console.warn({ id, updatePhotoDto });

    return this.photoRepository.update({ id }, updatePhotoDto);
  }

  remove(id: number) {
    return this.photoRepository.delete({ id });
  }
}
