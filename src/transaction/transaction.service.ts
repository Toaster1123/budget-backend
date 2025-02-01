import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TransactionService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createTransactionDto: CreateTransactionDto, id: number) {
		const newTransaction = {
			title: createTransactionDto.title,
			amount: createTransactionDto.amount,
			type: createTransactionDto.type,
			categoryId: createTransactionDto.categoryId,
			userId: id,
		}

		if (newTransaction) throw new BadRequestException('Something went wrong')

		return await this.prisma.transaction.create({ data: newTransaction })
	}

	async findAll() {
		return `This action returns all transaction`
	}

	async findOne(id: number) {
		return `This action returns a #${id} transaction`
	}

	async update(id: number, updateTransactionDto: UpdateTransactionDto) {
		return `This action updates a #${id} transaction`
	}

	async remove(id: number) {
		return `This action removes a #${id} transaction`
	}
}
