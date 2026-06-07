import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './Scheams/product.schema';
import { Role } from 'src/users/Decorectors/role/role.decorator';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel:Model<Product>) {}
  ////////////////////////////////////////////////////////////

  // Create a new product (admin only)

  ////////////////////////////////////////////////////////////
  async create(createProductDto: CreateProductDto) {
    const user = await this.productModel.create(createProductDto);
    return user;
  }

  ////////////////////////////////////////////////////////////

  // Retrieve all products
 
  ////////////////////////////////////////////////////////////
  findAll() {
    return this.productModel.find();
  }

  ////////////////////////////////////////////////////////////

  // Retrieve a product by ID

  ////////////////////////////////////////////////////////////
  findOne(id: string) {
    return this.productModel.findById(id);
  }

  ////////////////////////////////////////////////////////////

  // Update a product (admin only)

  ////////////////////////////////////////////////////////////
  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  ////////////////////////////////////////////////////////////

  // Delete a product (admin only)

  ////////////////////////////////////////////////////////////
  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
