import { Module } from '@nestjs/common';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';

@Module({
  imports: [],
  providers: [ImageResolver, ImageService],
})
export class ImageModule {}
