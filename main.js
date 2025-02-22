/*
  VARIABLES:
var - old variable (avoid using)
let - a variable with a block scope
const - a variable whose value cannot be changed (also block scope)


Scope   var let const
Global  ✅ Available ✅ Available ✅ Available ✅ Available
Functional  ✅ Available ✅ Available ✅ Available ✅ Available
Block (if, for, {})   ❌ Unlimited by block scope ✅ Available ✅ Available
Nested functions (lexical scope)  ✅ Available ✅ Available ✅ Available
*/

/*
  HOISTING:
*/

// ES 5
// Example:
console.log(a)
// == Error

// Example:
console.log(a)
var a;
// == undefined

// Example:
console.log(a)
var a = 5;
// == undefined

// Example:
console.log(a)
var a = 5;
console.log(a)
a = 7;
console.log(a)
// == undefined, 5, 7

// ES 6
// Example:
let b = 99;
console.log(b)
// == 99

// Example:
console.log(c)
let c = 99;
// == Error

/*
  END HOISTING:
*/

/*
  This:
  this. - is a keyword that indicates the context of the function.
  Its value depends on how and where the function is called. 

  this. — це ключове слово, яке вказує на контекст виконання функції.
  Його значення залежить від того, як і де викликається функція.

  1️⃣ this у глобальній області
  У браузері this посилається на window.

  2️⃣ this у функції
  📌 Оголошена звичайним способом (function)
  🔹 Без 'use strict' → this посилається на window (у браузері).
  🔹 З 'use strict' → this буде undefined.
*/

function showThis() {
  console.log(this);
}
showThis(); // 🖥️ Браузер: window

// "use strict";
function showThisStrict() {
  console.log(this);
}
showThisStrict(); // ❌ undefined

/*
  3️⃣ this у методах об'єкта
  📌 Якщо функція викликається як метод об'єкта → this посилається на цей об'єкт.
*/
const person = {
  name: "Іван",
  sayHi() {
    console.log(this.name); // ✅ "Іван"
  }
};
person.sayHi();

/*
4️⃣ this у конструкторах (new)
https://chatgpt.com/c/67b9e59f-0b54-8009-bcd2-19a72c769964
*/
/*
  END This:
*/