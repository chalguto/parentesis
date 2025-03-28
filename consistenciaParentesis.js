//let lstDatos = '({{[]})}';
//let lstDatos = '({)}';
//let lstDatos = '}(){';
//let lstDatos = '[(){}]';
let lstDatos = '[{()}]';

var arrDatos = Array.from(lstDatos);
var arrAbre = ['(', '{', '['];
var arrCierra = [')', '}', ']'];

// The array length must be Even
let isPar = Condition(() => arrDatos.length % 2 == 0);
if (!isPar) console.log('The list does not have an even length');

// The number of Opening characters must equal the number of Closing characters
let isEqual = Condition(() => {
  let countAbre = 0;
  let countCierra = 0;

  for (const key in arrAbre) {
    countAbre = arrDatos.filter(f => f == arrAbre[key]).length;
    countCierra = arrDatos.filter(f => f == arrCierra[key]).length;
    if (countAbre != countCierra) return false;
  }

  return true;
});
if (!isEqual)
  console.log('There is not an equal number of Opening and Closing characters');

// Validates the basic conditions of the array
if (isPar && isEqual) {
  // Validates consistency
  if (Condition(() => isConsistente(lstDatos))) console.log('It is consistent');
  else console.log('There is no consistency');
}

// Validates the consistency of the array
function isConsistente(listado) {
  let valBef = '';
  let valCur = '';
  let pos = 0;
  let arrLimite = [];
  let arrListado = [];
  let arrPos = [];

  // Converts the list to an Array
  arrListado = Array.from(listado);

  // Gets the indexes of the Closing characters in the array
  for (const iterator of arrCierra) {
    pos = arrListado.indexOf(iterator);
    if (pos > -1) arrPos.push(pos);
  }

  // Gets the array up to the index of the first Closing character
  arrLimite =
    arrListado[Math.min(...arrPos) + 1] == undefined
      ? arrListado
      : Array.from(
          listado.substring(
            0,
            listado.indexOf(arrListado[Math.min(...arrPos) + 1])
          )
        );

  // Iterates through the character array
  for (const key in arrLimite) {
    if (arrLimite.hasOwnProperty(key)) {
      let element = arrLimite[key];
      
      if (Abre(element)) valBef = element; // Previous character that should be an Opening one
      else if (Cierra(element)) {
        valCur = element; // Current character that should be a Closing one

        // Validates that the previous character is assigned or that the characters match in opening and closing
        if (valBef == '' || !isMatch(valBef, valCur)) return false;
        else {
          // Removes the matching characters
          arrListado.splice(key, 1);
          arrListado.splice(key - 1, 1);

          if (arrListado.length > 0) {
            // Recursion. New set of characters
            return Condition(() => isConsistente(arrListado.join('')));
          } else return true;
        }
      } else return false;
    }
  }
}

// Validates if the characters open and close properly
function isMatch(carAbre, carCierra) {
  return arrAbre.indexOf(carAbre) == arrCierra.indexOf(carCierra);
}

// Looks for an Opening character
function Abre(carAbre) {
  return arrAbre.indexOf(carAbre) > -1;
}

// Looks for a Closing character
function Cierra(carCierra) {
  return arrCierra.indexOf(carCierra) > -1;
}

// Executes the function
function Condition(fn) {
  return fn();
}