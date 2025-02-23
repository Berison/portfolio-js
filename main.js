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
  📌 this у функції-конструкторі вказує на новий об'єкт.
*/
class User {
  constructor(name) {
    this.name = name;
  }
}
const user1 = new User("Оля");
console.log(user1.name); // ✅ "Оля"

/*
5️⃣ this у стрілкових функціях (=>)
📌 У стрілкових функціях this береться з зовнішнього контексту (лексичний this).
*/
const personT = {
  name: "Іван",
  sayHi: () => {
    console.log(this.name); // ❌ undefined (this = window або global)
  }
};
personT.sayHi();

const person2 = {
  name: "Оля",
  sayHi() {
    const arrow = () => console.log(this.name); // ✅ "Оля" (this від person2)
    arrow();
  }
};
person2.sayHi();

/*
6️⃣ this у setTimeout/setInterval
📌 У setTimeout звичайна функція має this = window, а стрілкова бере this з оточення.
*/
const obj = {
  name: "Аня",
  sayHi: function () {
    setTimeout(function () {
      console.log(this.name); // ❌ undefined (this = window)
    }, 1000);
  }
};
obj.sayHi();
// ✅ Як виправити? Використати стрілкову функцію або .bind(this):
const objT = {
  name: "Аня",
  sayHi: function () {
    setTimeout(() => {
      console.log(this.name); // ✅ "Аня"
    }, 1000);
  }
};
objT.sayHi();

/*
7️⃣ this з call, apply, bind
📌 call та apply змінюють this і одразу викликають функцію.
*/
function greet() {
  console.log(`Привіт, ${this.name}!`);
}

const user = { name: "Іван" };
greet.call(user); // ✅ "Привіт, Іван!"
greet.apply(user); // ✅ "Привіт, Іван!"

//📌 bind створює нову функцію з прив'язаним this, але не викликає її одразу.

const boundGreet = greet.bind(user);
boundGreet(); // ✅ "Привіт, Іван!"

/*
8️⃣ this у класах
📌 У методах класу this вказує на екземпляр класу.
*/
class Car {
  constructor(model) {
    this.model = model;
  }
  showModel() {
    console.log(this.model);
  }
}
const car = new Car("Tesla");
car.showModel(); // ✅ "Tesla"
/*
  END This:
*/
/*
  Functions:
  1️⃣ Оголошені (Function Declaration)
  Ці функції визначаються за допомогою ключового слова function без збереження в змінну.
  ✅ Можна викликати ДО оголошення (hoisting працює)
  ✅ this залежить від контексту виклику

  📝 Особливості:

  Піднімаються (hoisting) і можуть викликатися до визначення
  Використовують this залежно від місця виклику
*/
sayHello(); // ✅ Працює, бо hoisting

function sayHello() {
  console.log("Привіт!");
}

sayHello(); // ✅ "Привіт!"

/*
  2️⃣ Функціональний вираз (Function Expression)
  Ці функції створюються і записуються у змінну.
  ❌ НЕ піднімаються (hoisting не працює)
  ✅ Можна передавати в інші функції
  📝 Особливості:

  НЕ піднімаються
  Використовують this залежно від контексту
  Часто використовуються для замикань (closures)
*/
// sayHello(); // ❌ Помилка! Hoisting не працює

const sayHello = function () {
  console.log("Привіт!");
};

sayHello(); // ✅ "Привіт!"

/*
  3️⃣ Стрілкові функції (Arrow Functions)
  Це коротший синтаксис функцій, які:
  ✅ Автоматично беруть this з батьківського контексту
  ✅ Мають коротший запис
  ❌ НЕ можна використовувати arguments
  ❌ НЕ можна використовувати як конструктор (new ArrowFunction())

  📝 Особливості:

  НЕ мають власного this, а беруть його з оточення
  НЕ підтримують arguments
  НЕ можна використовувати як конструктор (new)

  ** arguments — це спеціальний об'єкт, доступний всередині традиційних функцій (function), який містить усі передані аргументи. Це схоже на масив, але насправді ним не є.
  function showArguments() {
    console.log(arguments);
  }

  showArguments(1, 2, 3, 4);
  // ✅ Output: { '0': 1, '1': 2, '2': 3, '3': 4 }
*/
const sayHello = () => console.log("Привіт!");
sayHello(); // ✅ "Привіт!"

const add = (a, b) => a + b;
console.log(add(2, 3)); // ✅ 5

/*
  4️⃣ Анонімні функції (Anonymous Functions)
  Це функції без імені, які зазвичай передаються в інші функції.
  ✅ Часто використовуються в setTimeout, setInterval, map, filter, forEach.
*/
setTimeout(function () {
  console.log("Привіт через 2 секунди!");
}, 2000);

/*
  5️⃣ Самовикликаючі функції (IIFE - Immediately Invoked Function Expression)
  Це функції, які викликаються одразу після оголошення.

  ✅ Використовуються для ізоляції змінних
  ✅ Часто застосовувалися в старих JS проєктах

  ** Самовикликаюча функція (IIFE — Immediately Invoked Function Expression) виконується одразу після оголошення, створюючи локальну область видимості для змінних. Це означає, що змінні, оголошені всередині IIFE, не потрапляють у глобальну область видимості й не заважають іншим частинам коду.
  🔹 1. Запобігання конфліктам між змінними
  var message = "Hello!";

  (function() {
    var message = "Привіт!"; // Локальна змінна
    console.log(message); // "Привіт!"
  })();

  console.log(message); // "Hello!" (Глобальна не змінилася)
  🔹 2. Модулі (імітація private змінних)
  var Counter = (function() {
  var count = 0; // Приватна змінна

    return {
      increment: function() { count++; },
      getCount: function() { return count; }
    };
  })();

  Counter.increment();
  Counter.increment();
  console.log(Counter.getCount()); // ✅ 2

  console.log(typeof count); // ❌ ReferenceError: count is not defined
*/
(function () {
  console.log("Я виконався одразу!");
})(); // ✅ "Я виконався одразу!"

(function (name) {
  console.log(`Привіт, ${name}!`);
})("Іван");


/*
  6️⃣ Функції-конструктори
  Використовуються для створення об'єктів за допомогою new.
  📝 Особливості:

  Використовують this, який вказує на новий об'єкт
  Обов’язково викликаються через new
  Використовуються для створення однотипних об'єктів
  ⚠️ Не працюють з => функціями!
*/
function User(name, age) {
  this.name = name;
  this.age = age;
}
const user2 = new User("Марія", 25);
console.log(user2.name); // ✅ "Марія"

/*
  7️⃣ Замикання (Closures)
  Замикання — це функція, яка "запам’ятовує" зовнішні змінні.
  📝 Застосування:

  Лічильники
  Інкапсуляція даних
  Функції з пам'яттю (memoization)
*/
function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const increment = counter();
increment(); // ✅ 1
increment(); // ✅ 2
increment(); // ✅ 3

/*
  8️⃣ Рекурсивні функції
  Функція, яка викликає сама себе.
  ✅ Використовується для:

  Факторіалу
  Обходу деревоподібних структур
  Роботи з DOM
*/
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // ✅ 120
/*
  END Functions:
*/