const PRIHOD = 'PRIHOD';
const RASHOD = 'RASHOD';

var options = [{
  label: 'Prihod',
  value: PRIHOD,
}, {
  label: 'Rashod',
  value: RASHOD,
}];

//Ispis elementi
const ukupanIznos = document.querySelector('#ukupno')
const ispisPrihodi = document.querySelector('#ispisPrihodi')
const ispisRashodi = document.querySelector('#ispisRashodi')
const listaPrihodi = document.querySelector('#listaPrihodi')
const listaRashodi = document.querySelector('#listaRashodi')
//Unos elementi
const unosForma = document.querySelector('#forma')
const unosSelect = document.querySelector('#select')
const unosOpis = document.querySelector('#inputOpis')
const unosIznos = document.querySelector('#inputIznos')
const unosPotvrda = document.querySelector('#potvrdi')

options.forEach(option => {
    const opcija = document.createElement('option')
    opcija.value = option.value
    opcija.textContent = option.label
    unosSelect.appendChild(opcija)
})

function updateValues(
  inputValue,
  inputType,
) {
  if (inputType === PRIHOD) {
    ukupanPrihod = ukupanPrihod + parseInt(inputValue, 10);
    ukupno = ukupno + parseInt(inputValue, 10);
  } else {
    ukupanRashod = ukupanRashod + parseInt(inputValue, 10);
    ukupno = ukupno - parseInt(inputValue, 10);
  }
  ukupanProcenat = (ukupanRashod / ukupanPrihod) * 100;
  if (isNaN(ukupanProcenat) || ukupanProcenat === Infinity) {
    ukupanProcenat = 0;
  }

  ukupanIznos.textContent = `${ukupno} RSD`;
  ispisPrihodi.textContent = `Prihod: ${ukupanPrihod} RSD`;
  ispisRashodi.textContent = `Rashod: -${ukupanRashod} RSD (${ukupanProcenat.toFixed(0)}%)`;
}

//Funkcionalnosti
var ukupno = 0;
ukupanIznos.textContent = `${ukupno} RSD`;
var ukupanPrihod = 0;
ispisPrihodi.textContent = `Prihod: ${ukupanPrihod} RSD`;
var ukupanRashod = 0;
var ukupanProcenat = (ukupanRashod / ukupanPrihod) * 100;
if (isNaN(ukupanProcenat)) {
  ukupanProcenat = 0;
}
ispisRashodi.textContent = `Rashod: -${ukupanRashod} RSD (${ukupanProcenat}%)`;

function show(element, boolean) {
  element.style.visibility = boolean ? 'visible' : 'hidden';
}

unosForma.addEventListener('submit', (e) => {
    e.preventDefault()
    //uslovi
    if (
      unosOpis.value.trim().length <= 0
      || unosIznos.value.trim() <= 0
      || isNaN(unosIznos.value.trim())
      || unosIznos.value.trim().length <= 0
    ) {
      alert('POGRESAN UNOS');
      return;
    }
    //prihodi
    console.log(unosSelect.value, typeof unosSelect.value);
    if (unosSelect.value === PRIHOD) {
        const itemListe = document.createElement('li');
        itemListe.textContent = `${unosOpis.value}+ ${unosIznos.value} RSD`;
        updateValues(unosIznos.value, PRIHOD);
        const brisanje = document.createElement('button');
        brisanje.textContent = 'Obrisi';
        brisanje.style.visibility = 'hidden';
        brisanje.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            updateValues(-unosIznos.value, PRIHOD);
        })
        itemListe.addEventListener('mouseover', () => show(brisanje, true));
        itemListe.addEventListener('mouseleave', () => show(brisanje, false));
        itemListe.appendChild(brisanje);
        listaPrihodi.appendChild(itemListe);
        return;
    }
    //rashodi
    else if (unosSelect.value === RASHOD) {
        const itemListe = document.createElement('li')
        var procenatItem = (unosIznos.value / ukupanPrihod) * 100
        if (isNaN(procenatItem) || procenatItem === Infinity) {
          procenatItem = 0;
        }
        itemListe.textContent = `${unosOpis.value} - ${unosIznos.value} (${procenatItem.toFixed(0)}%)`
        updateValues(unosIznos.value, RASHOD);
        const brisanje = document.createElement('button')
        brisanje.textContent = 'Obrisi';
        brisanje.style.visibility = 'hidden';
        brisanje.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            updateValues(-unosIznos.value, RASHOD);
        })
        itemListe.addEventListener('mouseover', () => show(brisanje, true));
        itemListe.addEventListener('mouseleave', () => show(brisanje, false));
        itemListe.appendChild(brisanje);
        listaRashodi.appendChild(itemListe);
        return;
    }
    else{
        console.log('WTF');
    }
})