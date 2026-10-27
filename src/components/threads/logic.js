export function classify(a) {
 if(!Array.isArray(a)||a.length!==6||!a.every(x=>Number.isInteger(x)&&x>=0&&x<=3)) throw new Error('請完成所有題目');
 if(a[3]===3)return 'D';
 if(a[2]===0)return 'A';
 if(a[2]===1)return 'B';
 return 'C';
}
