import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { TransactionService } from 'src/transaction/transaction.service'

interface RequestParams {
	params: {
		id: number
		type: string
	}
	user: {
		id: number
	}
}

@Injectable()
export class AuthorGuard implements CanActivate {
	constructor(
		private readonly transactionService: TransactionService,
		private readonly categoryService: CategoryService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: RequestParams = context.switchToHttp().getRequest()
		const { id, type } = request.params

		let entity: { userId: number } | null = null

		switch (type) {
			case 'transaction':
				entity = await this.transactionService.findOne(+id)
				break
			case 'categories':
				entity = await this.categoryService.findOne(+id)
				break
			default:
				throw new NotFoundException('Something went wrong')
		}
		const user = request.user as { id: number }

		if (entity && user && entity.userId == user.id) {
			return true
		}
		throw new BadRequestException('Something went wrong')
	}
}
