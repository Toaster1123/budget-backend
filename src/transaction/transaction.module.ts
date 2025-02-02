import { Module } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'
import { PrismaService } from 'src/prisma.service'
import { CategoryService } from 'src/category/category.service'

@Module({
	controllers: [TransactionController],
	providers: [TransactionService, CategoryService, PrismaService],
})
export class TransactionModule {}
