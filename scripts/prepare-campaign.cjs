const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const base = process.argv[2];
if (!base) throw new Error('Pass the source resourse directory as the first argument.');
(async()=>{
 const files = {'hero':'상단1.png','lifestyle-cup':'상단2.png','lifestyle-keyring':'상단3.png','tote':'제품목록 에코백.png','keyring':'제품목록 키링.png','tumbler':'제품목록 텀블러.png','collection':'A20 콜라보 굿즈/색연필 질감의 bLOOM 협업 굿즈.png'};
 for (const [name,file] of Object.entries(files)) await sharp(path.join(base,file)).resize({width:1500,withoutEnlargement:true}).webp({quality:86}).toFile(`public/campaign/${name}.webp`);
 const mascot=path.join(base,'백송이 마스코트 8방향 턴어라운드.png');
 const meta=await sharp(mascot).metadata();
 await sharp(mascot).extract({left:0,top:0,width:Math.floor(meta.width/4),height:Math.floor(meta.height/2)}).webp({quality:95}).toFile('public/campaign/baeksongi.webp');
 console.log('Campaign images prepared');
})();

