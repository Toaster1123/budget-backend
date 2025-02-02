import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { PrismaService } from 'src/prisma.service'
import { TransactionService } from 'src/transaction/transaction.service'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, TransactionService, PrismaService],
})
export class CategoryModule {}
