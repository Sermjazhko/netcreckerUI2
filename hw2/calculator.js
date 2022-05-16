var countLines = 0;

function changeTable() {
    var a = document.getElementById('text1').value;
    var b = document.getElementById('text2').value;
    var c = document.getElementById('text3').value;

    document.getElementById("error").innerText = "";

    if (!(isNumeric(a) && isNumeric(b) && isNumeric(c))) {
        document.getElementById("error").innerText = "Данные некорректны!";
    } else if (parseFloat(a) == 0) {
        document.getElementById("error").innerText = "A=0, не квадратное уравнение!";
    } else {
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);

        var result = equationSolution(a, b, c);

        var x1 = equationRoots(result).x1;
        var x2 = equationRoots(result).x2;
        /*if (!result.complex) {
            x1 = x1.toFixed(2);
            x2 = x2.toFixed(2);
        }*/

        var pNode = document.getElementById('table');
        var newLine = document.createElement('tr');
        var newFirstColumn = document.createElement('td');
        var newSecondColumn = document.createElement('td');
        var newThirdColumn = document.createElement('td');

        var newCol1 = document.createTextNode(++countLines);
        var newCol2 = document.createTextNode(equation(a, b, c));
        var newCol3 = document.createTextNode("x1=" + x1 + ", x2=" + x2);

        newFirstColumn.appendChild(newCol1);
        newSecondColumn.appendChild(newCol2);
        newThirdColumn.appendChild(newCol3);
        newLine.appendChild(newFirstColumn);
        newLine.appendChild(newSecondColumn);
        newLine.appendChild(newThirdColumn);
        pNode.parentNode.insertBefore(newLine, pNode.nextSibling);

        newLine.addEventListener('click', e => {
            newLine.remove();
        })

    }
}

function equationRoots(result) {
    var complex = result.complex;
    var x1, x2;
    if (complex) {
        x1 = result.xR + sign(result.x1I) + "i";
        x2 = result.xR + sign(result.x2I) + "i";
    } else {
        x1 = result.xR + result.x1I;
        x2 = result.xR + result.x2I;
    }

    return {
        x1: x1, x2: x2
    }
}

function equationSolution(a, b, c) {
    var discriminant;
    var xR, x1I,  x2I;
    var complex = false;
    discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        complex = true;
        discriminant = -discriminant;
    }
    xR = 0.5 * (-b) / a;
    x1I = 0.5 * (Math.sqrt(discriminant)) / a;
    x2I = 0.5 * (-Math.sqrt(discriminant)) / a;
    return {
        xR: xR, x1I: x1I, x2I: x2I, complex: complex
    }
}

function sign(num) {
    if (coeffOne(num))
        return (num < 0) ? "-" : "+";
    return (num < 0) ? "" + num : "+" + num;
}

function signFirst(a){
    if (coeffOne(a))
        return (a < 0) ? "-" : "";
    return a;
}

function coeffOne(num){
    return Math.abs(num) == 1;
}

function equation(a, b, c) {
    var result = "0";
    if (isNumeric(a) && a != 0) result = signFirst(a)  + "x^2";
    if (isNumeric(b) && b != 0) result += sign(b) + "x";
    if (isNumeric(c) && c != 0) result += sign(c) + (coeffOne(c) ? Math.abs(c) : "");
    return result;
}

function showEquation() {
    var a = parseFloat(document.getElementById('text1').value);
    var b = parseFloat(document.getElementById('text2').value);
    var c = parseFloat(document.getElementById('text3').value);
    document.getElementById("array").innerText = equation(a, b, c);
}

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str)) && str != "string";
}