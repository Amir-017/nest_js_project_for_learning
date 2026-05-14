import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './Scheams/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel:Model<Product>) {}
 async create(createProductDto: CreateProductDto) {
    const user = await this.productModel.create(createProductDto);
    return user;
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: string) {
    return this.productModel.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
