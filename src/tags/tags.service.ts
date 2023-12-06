import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  create(createTagDto: CreateTagDto) {
    return this.tagsRepository.save(createTagDto);
  }

  findAll() {
    return this.tagsRepository.find();
  }

  findOne(id: number) {
    return this.tagsRepository.findBy({ id });
  }

  findMany(ids: Array<number>) {
    return this.tagsRepository.find({ where: { id: In(ids) } });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.tagsRepository.update({ id }, updateTagDto);
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
