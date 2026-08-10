import { Controller,
    Get,
    Patch,
    Post,
    Delete,
    UseGuards,
    Param,
    Body,
    ParseArrayPipe,
    Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }
    //============RUTA para insertar lista de productos
    // POST masivo
  @UseGuards(JwtAuthGuard)
  @Post('bulk')
  async createMany(
    @Body(new ParseArrayPipe({ items: CreateProductDto }))
    createProductDtos: CreateProductDto[],
  ) {
    return this.productsService.createMany(createProductDtos);
  }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        return this.productsService.findAll(paginationDto);
    }

    @Get(':code')
    async findOne(@Param('code') code: string) {
        return this.productsService.findOne(code);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':code')
    async update(@Param('code') code: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(code, updateProductDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':code')
    async remove(@Param('code') code: string) {
        return this.productsService.remove(code);
    }

}
