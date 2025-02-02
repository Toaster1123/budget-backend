import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Req,
	Query,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { IUser } from 'src/types/types'
import { AuthorGuard } from 'src/guard/author.guard'
import { TransactionType } from '@prisma/client'

@Controller('transactions')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Get(':type/find')
	@UseGuards(JwtAuthGuard)
	findAllByType(
		@Req() req: { user: IUser },
		@Param('type') type: TransactionType,
	) {
		return this.transactionService.findAllByType(+req.user.id, type)
	}

	@Get('pagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Req() req: { user: IUser },
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 5,
	) {
		return this.transactionService.findAllWithPagination(
			+req.user.id,
			+page,
			+limit,
		)
	}

	@Post()
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	create(@Body() createTransactionDto: CreateTransactionDto) {
		return this.transactionService.create(createTransactionDto)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req: { user: IUser }) {
		return this.transactionService.findAll(+req.user.id)
	}
	// url/transactions/:transaction/:id
	@Get(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	findOne(@Param('id') id: string) {
		return this.transactionService.findOne(+id)
	}

	@Patch(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	update(
		@Param('id') id: string,
		@Body() updateTransactionDto: UpdateTransactionDto,
	) {
		return this.transactionService.update(+id, updateTransactionDto)
	}

	@Delete(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	remove(@Param('id') id: string) {
		return this.transactionService.remove(+id)
	}
}
