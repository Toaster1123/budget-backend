import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { PrismaService } from 'src/prisma.service'
import { TransactionType } from '@prisma/client'

@Injectable()
export class TransactionService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createTransactionDto: CreateTransactionDto) {
		const newTransaction = {
			title: createTransactionDto.title,
			amount: createTransactionDto.amount,
			type: createTransactionDto.type,
			categoryId: createTransactionDto.categoryId,
			userId: createTransactionDto.userId,
		}
		console.log(newTransaction)
		if (!newTransaction) throw new BadRequestException('Something went wrong')

		return await this.prisma.transaction.create({ data: newTransaction })
	}

	async findAll(id: number) {
		const transactions = await this.prisma.transaction.findMany({
			where: {
				userId: id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return transactions
	}

	async findOne(id: number) {
		const transaction = await this.prisma.transaction.findFirst({
			where: {
				id,
			},
			include: {
				category: true,
				user: true,
			},
		})
		if (!transaction) throw new NotFoundException('Transaction not found')
		return transaction
	}

	async update(id: number, updateTransactionDto: UpdateTransactionDto) {
		const transaction = await this.prisma.transaction.findFirst({
			where: {
				id,
			},
		})

		if (!transaction) throw new NotFoundException('Transaction not found')

		return await this.prisma.transaction.update({
			where: {
				id,
			},
			data: updateTransactionDto,
		})
	}

	async remove(id: number) {
		const transaction = await this.prisma.transaction.findFirst({
			where: {
				id,
			},
		})

		if (!transaction) throw new NotFoundException('Transaction not found')

		return await this.prisma.transaction.delete({
			where: {
				id,
			},
		})
	}

	async findAllWithPagination(id: number, page: number, limit: number) {
		const transactions = await this.prisma.transaction.findMany({
			where: {
				userId: id,
			},
			include: {
				category: true,
				user: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: limit,
			skip: (page - 1) * limit,
		})
		return transactions
	}

	async findAllByType(userId: number, type: TransactionType) {
		const transactions = await this.prisma.transaction.findMany({
			where: {
				userId,
				type,
			},
		})

		const total = transactions.reduce((acc, curr) => acc + curr.amount, 0)

		return total
	}
}
