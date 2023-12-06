import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './photos/photos.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5455,
      username: 'postgresUser',
      password: 'postgresPW',
      database: 'postgresDB',
      // entities: [Photo, User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PhotosModule,
    UsersModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
