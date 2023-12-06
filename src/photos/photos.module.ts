import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { UsersModule } from '../users/users.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), UsersModule, TagsModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
