import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async getAccessToken(userData: CreateUserDto): Promise<{ token: string; expiresIn: number }> {
    const foundUser = await this.validateCredentials(userData);

    const { token, expiresIn } = this.createToken(foundUser);

    return { token, expiresIn };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = config.get('jwt.secretKey');
    const expiresIn: number = config.get('jwt.expiresIn');

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  private async validateCredentials(userData: CreateUserDto): Promise<User> {
    const foundUser: User = await this.users.findOne({ email: userData.email });
    if (!foundUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, foundUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    return foundUser;
  }
}

export default AuthService;
