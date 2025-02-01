import { Category, User } from '@prisma/client'
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator'

export class CreateTransactionDto {
	@IsNotEmpty()
	title: string

	@IsNotEmpty()
	@IsNumber()
	amount: number

	@IsString()
	@MinLength(6)
	type: 'expense' | 'income'

	@IsNotEmpty()
	categoryId: number

	@IsNotEmpty()
	userId: number
}
