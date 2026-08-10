import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

export enum ProductCategory {
  Lácteos = 'Lácteos',
  Bebidas = 'Bebidas',
  Carnes = 'Carnes',
  PescadosMariscos = 'Pescados y Mariscos',
  Panadería = 'Panadería',
  FrutasVerduras = 'Frutas y Verduras',
  Congelados = 'Congelados',
  Snacks = 'Snacks',
  Dulces = 'Dulces',
  Cereales = 'Cereales',
  ArrozLegumbres = 'Arroz y Legumbres',
  Pastas = 'Pastas',
  AceitesVinagres = 'Aceites y Vinagres',
  EspeciasCondimentos = 'Especias y Condimentos',
  ProductosHigiene = 'Productos de Higiene',
  Limpieza = 'Limpieza',
  Bebés = 'Bebés',
  Mascotas = 'Mascotas',
  Conservas = 'Conservas',
  BebidasAlcohólicas = 'Bebidas Alcohólicas',
  BebidasSinAlcohol = 'Bebidas Sin Alcohol',
  ProductosDietéticos = 'Productos Dietéticos',
  ElectrodomésticosPequeños = 'Electrodomésticos Pequeños',
  VinosYLicores = 'Vinos y Licores',
  Otros = 'Otros'
}
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column({type: 'varchar', length: 150})
  product_name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2,default: 0.00 })
  price: number;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;
  
  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // método para concatenar código del producto, pero use la forma básica dentro del 
  // metodo creeate()
 /* @BeforeInsert()
  generateCode() {
    if (!this.code) {
      // Genera un código aleatorio único de 4 dígitos si no se envía uno
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      this.code = `PR-${randomNum}`;
    }
  }
*/
}