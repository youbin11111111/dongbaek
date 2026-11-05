const sharp=require('sharp');const fs=require('fs');
const green='#173f30',cream='#f7f4eb',red='#d94d3c';
const flower=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-20" rx="20" ry="27" fill="${red}" transform="rotate(${a})"/>`).join('')}<ellipse cx="0" cy="0" rx="8" ry="12" fill="#efb93f"/></g>`;
const text=(x,y,content,size=64,color=green,extra='')=>`<text x="${x}" y="${y}" font-family="Malgun Gothic, sans-serif" font-size="${size}" fill="${color}" ${extra}>${content}</text>`;
const pngs={};
const image=(name,x,y,w,h)=>`<image x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,${pngs[name]}"/>`;
(async()=>{for(const name of ['hero','collection','baeksongi','lifestyle-keyring']){pngs[name]=(await sharp('public/campaign/'+name+'.webp').png().toBuffer()).toString('base64');}fs.mkdirSync('public/campaign/cards',{recursive:true});for(let i=1;i<=5;i++){
let body='';
if(i===1)body=text(75,220,'동백숲에서 온,',76)+text(75,325,'작은 설렘.',76,red)+image('hero',0,400,1080,850)+text(75,370,'당신의 일상에 동백이 피어납니다.',25)+`<rect x="55" y="1140" width="970" height="105" fill="${cream}"/>`+text(85,1205,'동백마을 × A2O Lite · COMING SOON',27);
if(i===2)body=text(75,220,'마을의 아름다움을',68)+text(75,315,'일상에 담는다면?',68,red)+image('collection',65,390,950,800)+text(75,1250,'동백을 닮은 색과 결, bLOOM 콜라보 컬렉션',27);
if(i===3)body=text(75,220,'안녕, 나는',72)+text(75,315,'백송이야!',80,red)+`<circle cx="540" cy="760" r="330" fill="#e7e9da"/>`+image('baeksongi',300,405,480,740)+text(540,1210,'마을의 색을 찾는 여행, 나와 함께할래?',29,green,'text-anchor="middle"')+text(540,1270,'동백마을 이야기 · 체험 콘텐츠 공개 예정',22,green,'text-anchor="middle"');
if(i===4)body=text(75,220,'작은 표식 속,',72)+text(75,315,'숲의 이야기.',72,red)+flower(160,500,.8)+flower(870,620,.5)+flower(290,1030,.6)+flower(810,1050,.9)+text(150,825,'bL',180,green,'font-weight="bold"')+flower(530,765,1.7)+text(620,825,'OM',180,green,'font-weight="bold"')+text(540,1150,'동백요정이 모여 피어나는 이름, bLOOM.',28,green,'text-anchor="middle"')+text(540,1215,'웹사이트에서 그 순간을 만나보세요.',25,green,'text-anchor="middle"');
if(i===5)body=text(75,220,'곧 피어날 콜라보,',70)+text(75,315,'먼저 만나보세요.',70,red)+image('lifestyle-keyring',75,390,930,650)+`<rect x="75" y="1100" width="930" height="100" fill="${green}"/>`+text(540,1165,'콜라보 더 알아보기  ↗',33,cream,'text-anchor="middle"')+text(540,1260,'출시 알림은 카카오톡으로 · 채널 오픈 준비 중',24,green,'text-anchor="middle"');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1080" height="1350"><rect width="1080" height="1350" fill="${cream}"/>${text(75,80,'동백마을 × A2O Lite',23)}${text(1005,80,`0${i} / 05`,22,green,'text-anchor="end"')}<line x1="75" y1="112" x2="1005" y2="112" stroke="#ccd1c1"/>${body}</svg>`;
await sharp(Buffer.from(svg)).png().toFile(`public/campaign/cards/0${i}.png`);
}console.log('5 SNS cards exported: 1080 x 1350 PNG');})();


