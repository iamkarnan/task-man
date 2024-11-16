import {Injectable, BadRequestException, PipeTransform } from '@nestjs/common';
import {Types} from 'mongoose';

@Injectable()
export class ValidateObjectID implements PipeTransform {
  transform(value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Please enter a valid ID');
    }
    return value;
  }
}