import { IsString } from 'class-validator';

export class ValidateAddressDto {
  @IsString()
  public postalCode: string;

  @IsString()
  public street: string;

  @IsString()
  public streetNumber: string;

  @IsString()
  public country: string;

  @IsString()
  public town: string;
}
