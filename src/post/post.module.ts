import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { SharedModule } from 'src/shared/shared.module';
import { CategoryModule } from 'src/category/category.module';
import { PostReposity } from './repository/post.repository';
import { TagEntity } from './entity/tag.entity';
import { TagReposity } from './repository/tag.repository';

@Module({
  imports: [
    SharedModule,
    CategoryModule,
    TypeOrmModule.forFeature([PostEntity, TagEntity])
  ],
  controllers: [PostController],
  providers: [PostService, PostReposity, TagReposity]
})
export class PostModule {}
