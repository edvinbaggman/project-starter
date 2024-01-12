import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Yup from 'yup';

@Injectable()
export class YupValidation implements PipeTransform {
  constructor(private readonly schema: Yup.ObjectSchema<any>) {}

  async transform(value: any): Promise<any> {
    try {
      await this.schema.validate(value, { abortEarly: false });
      return value;
    } catch (error) {
      throw new BadRequestException(error.errors);
    }
  }
}
