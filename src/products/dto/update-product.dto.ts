//=============================
//   UPDATE PARCIAL
//=============================
import { PartialType } from '@nestjs/mapped-types';
import { ProductCategory } from '../entities/product.entity';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto){}