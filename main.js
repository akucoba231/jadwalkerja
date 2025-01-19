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
  //let refresh = 0;

let backup = {}
let libur;

for(let el in element){
  backup[el] = element[el].innerHTML;
}

let inputTanggal = document.getElementById('tanggal');
let jenis = document.getElementById('jenis');

let hariLibur = document.getElementById('hariLibur');
let cek = document.getElementById('generate');

cek.setAttribute('disabled','disabled');

cek.classList.add('disabled');
cek.textContent = "Memuat data libur..."

inputTanggal.valueAsDate = new Date();

inputTanggal.onchange = (e) => {
  //generate();
  //console.log(e.target.value)
}

cek.onclick = () => {
 // if(refresh == 0){
  //cek.setAttribute('disabled','');
 // cek.classList.add('disabled');
 // cek.textContent = 'Muat Ulang Halaman';
  
 // refresh = 1;
  reset();
  
  let tmp = inputTanggal.value;
  let skrg = new Date();
  let kapan = new Date(tmp);
  
  let selisih = kapan.getTime() - skrg.getTime();
  let jangka = Math.floor(selisih / (1000*60*60*24));
  
  let balance = selisih % (1000*60*60*24);
  
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
      
      //let t = new Date(skrg.getTime() + (1000*60*60*24*(a)));
      let t = new Date(skrg.getTime() + (1000*60*60*24*(a)));
    
      let tmpMonth = t.getMonth()+1;
      tmpMonth = tmpMonth.toString();
      if(tmpMonth.length == 1){
        tmpMonth = `0${tmpMonth}`;
      }
      
      let tmpDate = t.getDate();
      tmpDate = tmpDate.toString();
      if(tmpDate.length == 1){
        tmpDate = `0${tmpDate}`;
        
      }
      x[a] = `${t.getFullYear()}-${tmpMonth}-${tmpDate}`;
    }
    
    //console.log(x)
    
    auto(x);
  }
  
   // console.log("interval : " + jangka)
   // console.log("jangka : " + jangka)
 // }
 /* else {
    return confirm('Halaman akan dimuat ulang, lanjutkan ?') ? 
    window.location.reload() : "";
  } */
}

function auto(x){
  //console.log(Object.keys(x).length);
  
    //console.log(x);
   
    let b = 0;
    let i = setInterval(function() {
      generateX(x[b]);
      //console.log(b)
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
    if(el == "tanggal"){
      let tmpTanggal = ubahTanggal(data[el]);
      let tmpCek = cekLibur(tmpTanggal);
      
      //console.log(tmpTanggal);
      //console.log(tmpCek);
      if(tmpCek == "false"){
        //do nothing
      }
      else {
        //console.log(tmpCek);
        tambahLibur([data[el],tmpCek[1]]);;
        tmp.classList.add('liburan');
      }
    }
    element[el].appendChild(tmp);
  }
  
  
}

function cekLibur(tgl){
  let hasil = [];
  for(let l = 0; l < libur.length; ++l){
    if(tgl === libur[l]['date']){
      hasil = ['true', libur[l]['name']];
    }
  }
  
  if(hasil.length > 1){
    return hasil;
  }
  else {
    return 'false';
  }
}

function reset(){
   for(let el in element){
    element[el].innerHTML = backup[el];
   }
   hariLibur.innerHTML = "";
}
function generate(){
  //console.log(e.target.value)
  let value = inputTanggal.value;
  let d = new Date(value);
  
  //console.log(d.getDate())
  //console.log(d.getTime())
  
  let tmpMonth = d.getMonth()+1;
  tmpMonth = tmpMonth.toString();
  if(tmpMonth.length == 1){
    tmpMonth = `0${tmpMonth}`;
  }
  let tmpDate = d.getDate();
  tmpDate = tmpDate.toString();
  if(tmpDate.length == 1){
    tmpDate = `0${tmpDate}`;
  }
  data['tanggal'] = tmpDate + '/' +tmpMonth+ '/' +d.getFullYear();
  
  data['hari'] = fullday[d.getDay()];
  
  let tmp = d.getTime();
  cekRegu(tmp);
  update();
}

function generateX(date){
  //console.log(e.target.value)
  
  let d = new Date(date);
  //console.log(d.getDate())
  //console.log(d.getTime())
  
  let tmpMonth = d.getMonth()+1;
  tmpMonth = tmpMonth.toString();
  if(tmpMonth.length == 1){
    tmpMonth = `0${tmpMonth}`;
  }
  let tmpDate = d.getDate();
  tmpDate = tmpDate.toString();
  if(tmpDate.length == 1){
    tmpDate = `0${tmpDate}`;
  }
  data['tanggal'] = tmpDate + '/' +tmpMonth+ '/' +d.getFullYear();
  
  data['hari'] = fullday[d.getDay()];
  
  let tmp = d.getTime();
  
  //let tmp = d.getTime() + (420*1000*60);
  //hanya karena bulannya tidak memiliki 0 di depan jadi beda hasilnya
  cekRegu(tmp);
  update();
}

function getLibur(){
  fetch('https://libur.deno.dev/api')
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data);
    libur = data;
    cek.removeAttribute('disabled');
    cek.classList.remove('disabled');
    cek.textContent = "Cek Jadwal";
  })
  .catch((e)=>{
    console.log(e.toString());
  })
}

getLibur();

function ubahTanggal(tgl){
  tgl = tgl.split('/');
  tgl = `${tgl[2]}-${tgl[1]}-${tgl[0]}`;
  
  return tgl;
}

function tambahLibur([tg, ket]){
  let tmp = document.createElement('p');
  
  //tmp.setAttribute('class','liburan');
  tmp.textContent = tg + " : " + ket;
  
  //console.log(name)
  //console.log(tmp.textContent)
  hariLibur.appendChild(tmp);
}
