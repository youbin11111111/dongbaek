const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const base = process.argv[2];
if (!base) throw new Error('Pass the source resourse directory.');
const source = path.join(base, 'A20 콜라보 굿즈', '콜라보 굿즈 단독컷');
const products = [
  ['pouch-single', '아이보리 동백 파우치 정면 제품컷.png'],
  ['oil-single', '아이보리 동백 오일 드로퍼-3.png'],
  ['collab-keyring-single', '동백꽃과 라임콩 아크릴 키링-2.png'],
  ['handcream-single', '아이보리 동백 핸드크림 단독 제품컷-4.png'],
  ['cup-single', '동백 로고 아이보리 머그 단독컷-5.png'],
];
(async () => {
  for (const [name, file] of products) {
    await sharp(path.join(source, file)).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 92 }).toFile(`public/campaign/${name}.webp`);
    console.log(name);
  }
})();
