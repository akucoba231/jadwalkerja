let start = {
  'A' : '2024-12-27',
  'B' : '2024-12-24',
  'C' : '2024-12-21',
  'D' : '2024-12-18',
}
let base = [
  '2024-12-27', '2024-12-24', '2024-12-21', '2024-12-18',
];
let regu = ['A','B','C','D'];
let data = {
    'shift1' : [],
    'shift2' : [],
    'shift3' : [],
    'libur' : [],
    'hari' : [],
    'tanggal' : [],
  };
let element = {
  'tanggal' : document.getElementById('tgl'),
  'hari' : document.getElementById('hari'),
  'shift1' : document.getElementById('sif1'),
  'shift2' : document.getElementById('sif2'),
  'shift3' : document.getElementById('sif3'),
   'libur' : document.getElementById('libur'),
}
let fullday = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ]
  let refresh = 0;

let inputTanggal = document.getElementById('tanggal');
let jenis = document.getElementById('jenis');

let cek = document.getElementById('generate');

inputTanggal.valueAsDate = new Date();

inputTanggal.onchange = (e) => {
  //generate();
  //console.log(e.target.value)
}

cek.onclick = () => {
  if(refresh == 0){
  //cek.setAttribute('disabled','');
  cek.classList.add('disabled');
  cek.textContent = 'Muat Ulang Halaman';
  
  refresh = 1;
  
  let tmp = inputTanggal.value;
  let skrg = new Date();
  let kapan = new Date(tmp);
  
  let jangka = Math.floor((kapan.getTime() - skrg.getTime()) / (1000*60*60*24));
  let x = {};
  
  if(jangka < 1 && jenis.value == "satu"){
  
    generate();
  }
  else if(jangka > 1 && jenis.value == "satu"){
    generate();
  }
  else //if(jangka > 1 && jenis == "all") 
  {
    
    for(let a = 0; a < ( jangka + 2); ++a)
    {
      let t = new Date(skrg.getTime() + (1000*60*60*24*(a)));
    
      let tmpMonth = t.getMonth()+1;
      tmpMonth = tmpMonth.toString();
      if(tmpMonth.length == 1){
        tmpMonth = `0${tmpMonth}`;
      }
    
      x[a] = `${t.getFullYear()}-${tmpMonth}-${t.getDate()}`;
    }
    
    auto(x);
  }
  
   // console.log("interval : " + jangka)
   // console.log("jangka : " + jangka)
  }
  else {
    return confirm('Halaman akan dimuat ulang, lanjutkan ?') ? 
    window.location.reload() : "";
  }
}

function auto(x){
  //console.log(Object.keys(x).length);
  
    console.log(x);
   
    let b = 0;
    let i = setInterval(function() {
      generateX(x[b]);
      console.log(b)
      ++b;
      if(b >= (Object.keys(x).length)){
        clearInterval(i);
      }
    }, 600);
    
}

function cekTgl(v){
  if( v%12 > 0 && v%12 < 4){
    return 'shift3';
  }
  else if( v%12 > 4 && v%12 < 8 ){
    return 'shift2';
  }
  else if( v%12 > 8 && v%12 < 12){
    return 'shift1';
  }
  else {
    return 'libur';
  }
}

function cekRegu(waktu){
  
  
  for(let i = 0; i < regu.length; ++i){
    let tmp = new Date(base[i]);
    tmp = tmp.getTime();
    let int = Math.floor((waktu - tmp)/(1000*60*60*24));
    
    data[cekTgl(int)] = regu[i];
  }
  
  //console.log(data);
}

function update(){
  
  for(let el in data){
    let tmp = document.createElement('td');
    tmp.textContent = data[el];
    tmp.setAttribute('class', data[el]);
    if(el == "libur"){
      tmp.removeAttribute('class');
    }
    element[el].appendChild(tmp);
  }
  
  
}

function generate(){
  //console.log(e.target.value)
  let value = inputTanggal.value;
  let d = new Date(value);
  
  data['tanggal'] = d.getDate()+ '/' +(d.getMonth()+1)+ '/' +d.getFullYear();
  
  data['hari'] = fullday[d.getDay()];
  
  let tmp = d.getTime();
  cekRegu(tmp);
  update();
}

function generateX(date){
  //console.log(e.target.value)
  
  let d = new Date(date);
  
  data['tanggal'] = d.getDate()+ '/' +(d.getMonth()+1)+ '/' +d.getFullYear();
  
  data['hari'] = fullday[d.getDay()];
  
  let tmp = d.getTime();
  
  //let tmp = d.getTime() + (420*1000*60);
  //hanya karena bulannya tidak memiliki 0 di depan jadi beda hasilnya
  cekRegu(tmp);
  update();
}
