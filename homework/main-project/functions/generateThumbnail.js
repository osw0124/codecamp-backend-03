/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
 const { Storage } = require("@google-cloud/storage");
 const sharp = require("sharp");
 
 exports.ThumbnailTrigger = async (event, context) => {
   // event: 데이터에 대한 정보, 연결 링크(selfLink, mediaLink) 등
   // context: 실행 환경 정보
 
   if (event.name.includes("thumb/")) return;
   // 클라우드 펑션으로 만든 썸네일 이미지가 버킷에 추가될 경우 트리거로 인해 펑션이 다시 실행된다.
   // 한번 사이즈가 조정된 파일을 이름에 thumb/를 포함하고 있다. 조건에 맞는 파일이 들어오면 함수를 종료한다.
 
   const option = [ // [size, dir이름] size는 width 크기다.
     [320, "s"],
     [640, "m"],
     [1280, "l"],
   ];
   const name = event.name; //파일 이름
   const storage = new Storage().bucket(event.bucket); // 버킷이름은 event에서 가저다 사용한다
 
   await Promise.all( //Promise All을 이용한 병렬 저장
     option.map(([size, dir]) => {
       return new Promise((resolve, reject) => {
         storage
           .file(name) // 파일은 클라우드 스토리지에서 이름으로 읽어올 수 있는 듯 확인 필요
           .createReadStream()
           .pipe(sharp().resize({ width: size })) // 리사이징 npmjs에서 Promise 케이스 참조
           .pipe(storage.file(`thumb/${dir}/${name}`).createWriteStream())
           .on("finish", () => resolve())
           .on("error", () => reject());
       });
     })
   );
 };
 
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// package.json

 {
    "name": "sample-cloud-storage",
    "version": "0.0.1",
    "dependencies": {
      "@google-cloud/storage": "^5.0.0", // 버전이 낮으면 import를 못해온다.
      "sharp": "^0.30.1"
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 