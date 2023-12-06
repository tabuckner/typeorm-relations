import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { TagsService } from '../tags/tags.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    private usersService: UsersService,
    private tagsService: TagsService,
  ) {}

  async create(createPhotoDto: CreatePhotoDto) {
    console.warn({ createPhotoDto });
    const { userID, tagIDs, ...rest } = createPhotoDto;

    const user = await this.expandUserID(userID);
    const tags = await this.expandTagIDs(tagIDs);

    const newPhoto = this.photoRepository.create({ ...rest, user, tags });

    return this.photoRepository.save(newPhoto);
  }

  findAll() {
    return this.photoRepository.find();
  }

  findOne(id: number) {
    return this.photoRepository.findOneBy({ id });
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    console.warn({ id, updatePhotoDto });

    const { userID, tagIDs, ...rest } = updatePhotoDto;

    const user = await this.expandUserID(userID);
    const tags = await this.expandTagIDs(tagIDs);

    const photoPatch: Partial<Photo> = { id, ...rest };

    if (user) {
      photoPatch.user = user;
    }

    if (tags) {
      photoPatch.tags = tags;
    }

    return this.photoRepository.save(photoPatch);
  }

  remove(id: number) {
    return this.photoRepository.delete({ id });
  }

  private async expandUserID(userID: string) {
    if (!userID || userID?.length < 1) {
      return null;
    }

    return this.usersService.findOne(parseInt(userID, 10));
  }

  private async expandTagIDs(tagIDs: Array<number>) {
    if (!tagIDs || tagIDs?.length < 1) {
      return null;
    }

    return await this.tagsService.findMany(tagIDs);
  }
}
