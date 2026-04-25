import { CreateUserDto } from '../../../users/_utils/dto/create-user.dto';

export class AppleLoginDto extends CreateUserDto {
  identityToken: string;
}
