module.exports = function toReadable (number) {

    const numbers = {
      0: '',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine'
    }

    const numbersDecimal = {
        0: {
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven',
            8: 'eight',
            9: 'nine'
        },
        1: {
            0: 'ten',
            1: 'eleven',
            2: 'twelve',
            3: 'thirteen',
            4: 'fourteen',
            5: 'fifteen',
            6: 'sixteen',
            7: 'seventeen',
            8: 'eighteen',
            9: 'nineteen'
        },
        2: 'twenty',
        3: 'thirty',
        4: 'forty',
        5: 'fifty',
        6: 'sixty',
        7: 'seventy',
        8: 'eighty',
        9: 'ninety'
    }

    const hundred = 'hundred';
    const gap = ' ';
    const digits = number.toString().split('');
    const realDigits = digits.map(Number);
    let result = '';

    for (let i = 0; i < realDigits.length; i++) {
        for (let prop in numbers) {
            if(realDigits[i] == prop) {
                result += numbers[prop] + gap;
            }
        }
    }

    let arrayValues = result.split(gap);

    const findValue = (index) => {
        return Object.keys(numbers).find(key => numbers[key] === arrayValues[index])
    }

    if (arrayValues.length === 4) {
        // find number key from numbers array
        let second = findValue(1);
        let third = findValue(2);

        let afterHundred = (
            typeof(numbersDecimal[second]) !== 'object'
                ? gap + numbersDecimal[second] + (arrayValues[2] ? gap + arrayValues[2] : '')
                : gap + numbersDecimal[second][third] || ''
        );

        result = arrayValues[0] + gap + hundred + (afterHundred !==  gap + 'undefined' ? afterHundred : '');
    } else if (arrayValues.length === 3) {
        let first = findValue(0);
        let second = findValue(1);

        result = typeof(numbersDecimal[first]) !== 'object'
            ? numbersDecimal[first] + (numbers[second] ? (gap + numbers[second]) : '')
            : numbersDecimal[first][second];
    } else if (arrayValues.length === 2) {
        let first = Object.keys(numbers).find(key => numbers[key] === arrayValues[0]);

        result = numbers[first] || 'zero';
    }

    return result;
}
