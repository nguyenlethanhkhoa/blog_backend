import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category/category.entity';
import { SharedModule } from './shared/shared.module';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/entity/post.entity';
import { TagEntity } from './post/entity/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        TagEntity,
        PostEntity,
        CategoryEntity
      ],
      synchronize: true
    }),
    SharedModule,
    CategoryModule, 
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
