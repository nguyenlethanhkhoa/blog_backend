import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostEntity } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UrlService } from 'src/shared/url/url.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostReposity } from './repository/post.repository';
import { CategoryReposity } from 'src/category/category.repository';
import { FilterPostDto } from './dto/filter-post.dto';
import { TagReposity } from './repository/tag.repository';
import { In } from 'typeorm';

@Injectable()
export class PostService {

    constructor(
        private readonly urlService: UrlService,
        private readonly tagRepository: TagReposity,
        private readonly postRepository: PostReposity,
        private readonly categoryReposity: CategoryReposity,
    ) { }

    async findAll(filter: FilterPostDto): Promise<[PostEntity[], number]> {

        return await this.postRepository.findAndCount({
            relations: ['tags']
        });
    }

    async findOneById(postId: number): Promise<PostEntity> {
        return await this.postRepository.findOne({
            relations: ['category', 'tags'],
            where: { id: postId }
        });
    }

    async findOneBySlug(slug: string): Promise<PostEntity> {
        const post = await this.postRepository.findOne({
            relations: ['category', 'tags'],
            where: { slug: slug }
        });

        return post
    }

    async create(item: CreatePostDto): Promise<PostEntity> {
        const slug = this.urlService.createSlug(item.title);

        let category = null;
        if (item.categoryId) {
            category = await this.categoryReposity.findOne({ where: { id: item.categoryId } });
            if (!category) {
                throw new HttpException('Category is not found', HttpStatus.BAD_REQUEST)
            }
        }

        let tags = []
        if (item.tags.length) {
            await this.tagRepository.createManyNotExist(item.tags);
            tags = await this.tagRepository.find({ where: { name: In([...item.tags]) } });
        }

        let data: Partial<PostEntity> = {
            ...item,
            slug,
            category,
            tags
        }

        return await this.postRepository.save({ ...data });
    }

    async update(id: number, item: UpdatePostDto): Promise<PostEntity> {
        const post = await this.findOneById(id);
        if (!post) {
            throw new HttpException('Notfound', 404)
        }

        let category = null;
        if (item.categoryId) {
            category = await this.categoryReposity.findOne({ where: { id: item.categoryId } });
            if (!category) {
                throw new HttpException('Category is not found', HttpStatus.BAD_REQUEST)
            }
        }

        let tags = []
        if (item.tags.length) {
            await this.tagRepository.createManyNotExist(item.tags);
            tags = await this.tagRepository.find({where: {name: In([...item.tags.map(tag => tag.name)])}});
        }

        post.title = item.title;
        post.content = item.content;
        post.slug = this.urlService.createSlug(item.title);
        post.category = category;
        post.summary = item.summary;
        post.thumbnail = item.thumbnail;
        post.tags = tags;
    
        return await this.postRepository.save(post);
    }

    async deleteOne(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}
