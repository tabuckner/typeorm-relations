import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  create(createPhotoDto: CreatePhotoDto) {
    console.warn({ createPhotoDto });

    return this.photoRepository.save(createPhotoDto);
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
