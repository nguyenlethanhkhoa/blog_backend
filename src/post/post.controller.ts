import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostEntity } from './entity/post.entity';
import { FilterPostDto } from './dto/filter-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('post')
@Controller('posts')
export class PostController {

    constructor(
        private readonly postService: PostService
    ) {}

    @Get()
    async findAll(
        @Query() filter: FilterPostDto
    ): Promise<[PostEntity[], number]> {
        return await this.postService.findAll(filter);
    }

    @Post()
    async create(
        @Body() post: CreatePostDto
    ): Promise<PostEntity> {
        return await this.postService.create(post);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() post: UpdatePostDto
    ): Promise<PostEntity> {
        return await this.postService.update(id, post);
    }

    @Get(':slug')
    async findOne(@Param('slug') slug: string): Promise<PostEntity> {
        return await this.postService.findOneBySlug(slug);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: number): Promise<void> {
        await this.postService.deleteOne(id);
    }
}
