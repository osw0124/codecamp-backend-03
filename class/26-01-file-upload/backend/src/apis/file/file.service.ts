import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import 'dotenv/config';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);
    // console.log(waitedFiles);

    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEYFILE,
    }).bucket('codecamp-mainproject-bucket');

    // 구글 스토리지에 파일 업로드하기

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          // createReadStream은 Promise가 아니기 때문에 await을 걸 수 없다.
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`codecamp-mainproject-bucket/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );

    return results;
  }
}
