import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotosModule } from './photos/photos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photos/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5455,
      username: 'postgresUser',
      password: 'postgresPW',
      database: 'postgresDB',
      entities: [Photo],
      synchronize: true,
    }),
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
