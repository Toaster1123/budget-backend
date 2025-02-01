import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { PrismaService } from 'src/prisma.service'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createCategoryDto: CreateCategoryDto, id: number) {
		const isExist = await this.prisma.category.findFirst({
			where: {
				userId: id,
				title: createCategoryDto.title,
			},
		})

		if (isExist) {
			throw new BadRequestException('Category already exist')
		}
		const newCategory = {
			title: createCategoryDto.title,
			userId: id,
		}

		return this.prisma.category.create({ data: newCategory })
	}
	async findAll(id: number) {
		return await this.prisma.category.findMany({
			where: {
				userId: id,
			},
			include: {
				transactions: true,
			},
		})
	}

	async findOne(id: number) {
		const category = await this.prisma.category.findFirst({
			where: {
				id,
			},
			include: {
				user: true,
				transactions: true,
			},
		})
		if (!category) throw new NotFoundException('Category not found')

		return category
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		const category = await this.prisma.category.findFirst({
			where: {
				id,
			},
		})

		if (!category) throw new NotFoundException('Category not found')

		return await this.prisma.category.update({
			where: { id },
			data: updateCategoryDto,
		})
	}

	async remove(id: number) {
		const category = await this.prisma.category.findFirst({
			where: {
				id,
			},
		})

		if (!category) throw new NotFoundException('Category not found')

		return await this.prisma.category.delete({
			where: {
				id,
			},
		})
	}
}
