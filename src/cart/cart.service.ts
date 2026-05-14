import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
async create(createCartDto: CreateCartDto, id: string) {

  const pId = createCartDto.products[0].productId;

  const q = Number(createCartDto.products[0].quantity);

  const cartuser = await this.cartModel.findOne({
    userName: id,
  });

  // لو الكارت مش موجود
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

  // نشوف المنتج موجود ولا لا
  const productFound = cartuser.products.find(
    (item) => item.productId.toString() === pId,
  );

  // لو موجود نزود الكمية
  if (productFound) {

    productFound.quantity += q;

    cartuser.markModified('products');

  } else {

    // لو مش موجود نضيفه
    cartuser.products.push({

      productId: pId,

      quantity: q,
    });
  }

  await cartuser.save();

  return cartuser;
}

  findAll() {
    return this.cartModel.find();
  }

  findOne(id: string) {
    console.log(id);
    return this.cartModel.findOne({ userName: id });
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true });
  }

  remove(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }
}
