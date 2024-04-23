import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { SharedModule } from 'src/shared/shared.module';
import { CategoryReposity } from './category.repository';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([CategoryEntity])
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryReposity],
  exports: [CategoryService, CategoryReposity]
})
export class CategoryModule {}
