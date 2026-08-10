import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        // 1. Contamos cuántos productos existen
        const count = await this.productRepository.count();

        // 2. Concatenamos el prefijo y rellenamos a 3 dígitos (ej: PR-001, PR-002, PR-021)
        const nextNumber = count + 1;
        const generatedCode = `PR-${String(nextNumber).padStart(3, '0')}`;

        // 3. Creamos e insertamos la entidad
        const newProduct = this.productRepository.create({
            ...createProductDto,
            code: generatedCode,
        });
        return this.productRepository.save(newProduct);
    }

    //===========CREATE MANY
    async createMany(createProductDtos: CreateProductDto[]): Promise<Product[]> {
        const currentCount = await this.productRepository.count();

        const productsToCreate = createProductDtos.map((dto, index) => {
            const nextNumber = currentCount + index + 1;
            const generatedCode = `PR-${String(nextNumber).padStart(3, '0')}`;

            return this.productRepository.create({
                ...dto,
                code: generatedCode,
            });
        });

        return await this.productRepository.save(productsToCreate);
    }

    async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
// Cálculo del salto (offset)
    const skip = (page - 1) * limit;

    const [data, total] = await this.productRepository.findAndCount({
    take: limit,
    skip: skip,
    order: {
    code: 'ASC', // Ordenar por código (PR-001, PR-002...)
    },
    
    });
    const lastPage = Math.ceil(total / limit);
    return {
        meta: {
        total,
        page,
        lastPage,
        limit,
        },
        data,
  };
    }

    async findOne(code: string): Promise < Product > {
    const product = await this.productRepository.findOne({ where: { code } });
    if(!product) {
        throw new Error('Product whit code ${code} not found');
    }
        return product;
}
    //update parcial del producto, solo se actualizan los campos que se envían en el DTO
    async update(code: string, updateProductDto: UpdateProductDto): Promise < Product > {

    const product = await this.findOne(code);

    if(!product) {
        throw new Error('Product con ID ${code} not found');
    }
    // merge es un método de TypeORM que combina los datos existentes del producto con los nuevos datos proporcionados en updateProductDto. Esto permite actualizar solo los campos que se han modificado, manteniendo los demás campos sin cambios.
    this.productRepository.merge(product, updateProductDto);
    await this.productRepository.save(product);
    return product;
}
   async remove(code: string): Promise < { message: string } > {
    const product = await this.findOne(code);
    if(!product) {
        throw new Error('Product con ID ${code} not found');
    }
         await this.productRepository.remove(product);
    return { message: `Product con code: ${code} deleted successfully` };

}
}