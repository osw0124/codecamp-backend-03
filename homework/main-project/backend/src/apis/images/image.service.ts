import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  async upload({ files }) {
    const waitedImages = await Promise.all(files);
    console.log(waitedImages);

    const storage = new Storage({
      projectId: 'codecamp-main-project',
      keyFilename: 'codecamp-main-project-47de57a4f8db.json',
    }).bucket('codecamp-mainproject-bucket');

    const results = await Promise.all(
      waitedImages.map((el) => {
        return new Promise((resolve, reject) => {
          // createReadStream은 Promise가 아니기 때문에 await을 걸 수 없다.
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () =>
              resolve(`codecamp-mainproject-bucket/${el.filename}`),
            )
            .on('error', () => reject());
        });
      }),
    );

    return results;
  }
}
