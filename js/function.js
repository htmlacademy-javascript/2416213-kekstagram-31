// 1. Функция для проверки длины строки.

function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

checkStringLength("проверяемая строка", 10);
checkStringLength("проверяемая строка", 18);
checkStringLength("проверяемая строка", 20);

// 2. Функция для проверки, является ли строка палиндромом.

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(" ", "").toLowerCase();
  let reversedStr = "";
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }
  return normalizedStr === reversedStr;
}

isPalindrome("топот");
isPalindrome("ДовОд");
isPalindrome("Кекс");
isPalindrome("Лёша на полке клопа нашёл ");

// 3. Дополнительное задание.

const exctractNumber = (arg) => {
  const string = arg.toString();
  let result = "";
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }

  return parseInt(result, 10);
};

exctractNumber("2023 год");
exctractNumber("ECMAScript 2022");
exctractNumber("1 кефир, 0.5 батона");
exctractNumber("агент 007");
exctractNumber("а я томат");
