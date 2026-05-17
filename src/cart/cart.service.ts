
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './Schemas/cart.schema';
import { log } from 'console';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/Schemas/user.scham';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private cartModel: Model<Cart>,
    @InjectModel('User') private userModel: Model<User>
  ) { }

  ////////////////////////////////////////////////////////////

  // Create new cart or add product to existing cart

  ////////////////////////////////////////////////////////////

  async create(createCartDto: CreateCartDto, id: string) {

    const pId = createCartDto.products[0].productId;

    const q = Number(createCartDto.products[0].quantity);

    const cartuser = await this.cartModel.findOne({
      userName: id,
    });

    if (!cartuser) {

      return this.cartModel.create({

        userName: id,

        products: [
          {
            productId: pId,
            quantity: q,
          },
        ],
      });
    }

    const productFound = cartuser.products.find(
      (item) => item.productId.toString() === pId,
    );

    if (productFound) {

      productFound.quantity += q;

      cartuser.markModified('products');

    } else {

      cartuser.products.push({

        productId: pId,

        quantity: q,
      });
    }

    await cartuser.save();

    return cartuser;
  }

  ////////////////////////////////////////////////////////////

  // Get all carts data

  ////////////////////////////////////////////////////////////

  findAll(word: string) {
    log(word)
    return this.cartModel.find();
  }

  ////////////////////////////////////////////////////////////

  // Get specific user cart details

  ////////////////////////////////////////////////////////////

  findOne(id: string) {
    console.log(id);
    return this.cartModel.findOne({ userName: id });
  }

  ////////////////////////////////////////////////////////////

  // Update quantity of specific product in cart

  ////////////////////////////////////////////////////////////

  async update(id: string, updateCartDto: UpdateCartDto) {

    const product = updateCartDto.products?.[0];

    if (!product) {
      throw new BadRequestException('Products are required');
    }

    const { productId, quantity } = product;

    const q = Number(quantity);

    if (!productId) {
      throw new BadRequestException('ProductId is required');
    }

    if (q <= 0) {
      throw new BadRequestException('Quantity must be bigger than 0');
    }

    const updatedCart = await this.cartModel.findOneAndUpdate(
      {
        userName: id,
        "products.productId": productId
      },
      {
        $set: {
          "products.$.quantity": q
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedCart) {
      throw new NotFoundException('Cart or product not found');
    }

    return updatedCart;
  }

  ////////////////////////////////////////////////////////////

  // Remove specific product from user cart

  ////////////////////////////////////////////////////////////

  async remove(id: string, productId: string) {

    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException("Invalid Id")

    if (!Types.ObjectId.isValid(productId))
      throw new BadRequestException("Invalid productId")

    const deleteProduct = await this.cartModel.findOneAndUpdate(
      {
        userName: id,
        "products.productId": productId
      },
      {
        $pull: {
          products: { productId }
        }
      },
      {
        returnDocument: 'after',
        runValidators: true
      }
    )

    if (!deleteProduct)
      throw new NotFoundException('Product or cart not found')

    return 'Specific Product Deleted Successfully'
  }

  ////////////////////////////////////////////////////////////

  // Remove all products from user cart

  ////////////////////////////////////////////////////////////

  async removeAll(id: string) {

    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException("Invalid Id")

    const deleteAllProduct = await this.cartModel.findOneAndUpdate(
      {
        userName: id
      },
      {
        $set: {
          products: []
        }
      },
      {
        returnDocument: 'after',
        runValidators: true
      }
    )

    if (!deleteAllProduct)
      throw new NotFoundException('Product or cart not found')

    return "All Products Is Deleted Successfully"
  }
}

