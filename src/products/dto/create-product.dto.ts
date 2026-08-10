import { IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { ProductCategory } from '../entities/product.entity';

export class CreateProductDto {
  @IsOptional()
    code: string;

  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    product_name: string;

  @IsNumber()
    price: number;

  @IsNotEmpty({ message: 'La categoría del producto es obligatoria' })
  @IsEnum(ProductCategory, { message: 'La categoría enviada no es válida' })
  category: ProductCategory;

    @IsOptional()
    @IsNumber()
    stock?: number;

    @IsOptional()
    @IsString({message: 'Descripción del producto'})
    description?: string;
}

/*
[
  {
    "product_name": "Leche Entera 1L",
    "price": 4.50,
    "category": "Lácteos",
    "stock": 100,
    "description": "Leche de vaca pasteurizada rica en calcio"
  },
  {
    "product_name": "Jugo de Naranja Natural 1L",
    "price": 3.80,
    "category": "Bebidas",
    "stock": 60,
    "description": "Jugo exprimido 100% natural sin azúcar añadida"
  },
  {
    "product_name": "Pechuga de Pollo 1kg",
    "price": 8.90,
    "category": "Carnes",
    "stock": 40,
    "description": "Pechuga deshuesada limpia y fresca"
  },
  {
    "product_name": "Filete de Salmón 500g",
    "price": 14.50,
    "category": "Pescados y Mariscos",
    "stock": 25,
    "description": "Corte de salmón fresco rico en Omega 3"
  },
  {
    "product_name": "Pan Integral de Masa Madre",
    "price": 3.20,
    "category": "Panadería",
    "stock": 30,
    "description": "Pan artesanal elaborado con harinas integrales"
  },
  {
    "product_name": "Manzana Red Delicious 1kg",
    "price": 2.90,
    "category": "Frutas y Verduras",
    "stock": 80,
    "description": "Manzanas rojas frescas y crujientes"
  },
  {
    "product_name": "Pizza Mozzarella Congelada",
    "price": 6.50,
    "category": "Congelados",
    "stock": 45,
    "description": "Pizza de masa delgada lista para hornear"
  },
  {
    "product_name": "Papas Fritas Onduladas 150g",
    "price": 2.10,
    "category": "Snacks",
    "stock": 120,
    "description": "Snack salado sabor a queso y cebolla"
  },
  {
    "product_name": "Chocolate Negro 70% Cacao",
    "price": 3.50,
    "category": "Dulces",
    "stock": 70,
    "description": "Barra de chocolate amargo artesanal"
  },
  {
    "product_name": "Avena en Hojuelas 500g",
    "price": 2.40,
    "category": "Cereales",
    "stock": 90,
    "description": "Avena en hojuelas integrales para desayuno"
  },
  {
    "product_name": "Lentejas Verdes 1kg",
    "price": 2.80,
    "category": "Arroz y Legumbres",
    "stock": 110,
    "description": "Lentejas seleccionadas de rápida cocción"
  },
  {
    "product_name": "Spaghetti de Trigo 500g",
    "price": 1.90,
    "category": "Pastas",
    "stock": 150,
    "description": "Pasta de sémola de trigo duro italiana"
  },
  {
    "product_name": "Aceite de Oliva Extra Virgen 500ml",
    "price": 9.20,
    "category": "Aceites y Vinagres",
    "stock": 50,
    "description": "Aceite prensado en frío de primera calidad"
  },
  {
    "product_name": "Pimienta Negra Molida 100g",
    "price": 2.30,
    "category": "Especias y Condimentos",
    "stock": 85,
    "description": "Condimento puro sin añadidos"
  },
  {
    "product_name": "Jabón Líquido Corporal 400ml",
    "price": 4.80,
    "category": "Productos de Higiene",
    "stock": 65,
    "description": "Jabón neutro hidratante con aloe vera"
  },
  {
    "product_name": "Detergente Multiusos 1L",
    "price": 5.10,
    "category": "Limpieza",
    "stock": 75,
    "description": "Limpiador desinfectante para todo tipo de superficies"
  },
  {
    "product_name": "Pañales Etapa 3 x40",
    "price": 18.50,
    "category": "Bebés",
    "stock": 35,
    "description": "Pañales ultra absorbentes con ajuste anatómico"
  },
  {
    "product_name": "Comida para Perro Adulto 3kg",
    "price": 15.90,
    "category": "Mascotas",
    "stock": 40,
    "description": "Alimento balanceado sabor carne y vegetales"
  },
  {
    "product_name": "Atún en Agua Enlatado 160g",
    "price": 2.20,
    "category": "Conservas",
    "stock": 130,
    "description": "Lomo de atún claro en agua de manantial"
  },
  {
    "product_name": "Vino Tinto Cabernet 750ml",
    "price": 16.00,
    "category": "Vinos y Licores",
    "stock": 30,
    "description": "Vino tinto de reserva con notas amaderadas"
  }
]
*/