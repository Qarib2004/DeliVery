import { Module } from '@nestjs/common'
import { CategoryModule } from '../category/category.module'
import { PrismaService } from '../prisma.service'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { CategoryService } from '../category/category.service'

@Module({
	controllers: [ProductController],
	imports: [CategoryModule],
	providers: [ProductService, PrismaService,CategoryService]
})
export class ProductModule {}