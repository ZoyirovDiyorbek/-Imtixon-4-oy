import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CheckFileSizePipe implements PipeTransform {
  limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  transform(value: Express.Multer.File[], metadata: ArgumentMetadata) {
    if (!value || value.length === 0) {
      throw new ConflictException('Rasm yuborishda xatolik⚠️!');
    }

    for (const file of value) {
      if (file.size > this.limit) {
        throw new ConflictException(
          `File hajmi ${this.limit / 1024 / 1024}MB dan kichik bo'lsin iltimosaks holda ishlamaydi!`,
        );
      }
    }

    return value;
  }
}
