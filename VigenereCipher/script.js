let matrix;
let Alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
let cypher = "";
let column_marks = [];
let row_marks = [];
let replaced_marks = [];

function generateMatrix() {
    let dom_matrix = document.getElementById("matrix");
    dom_matrix.innerHTML = "";
    matrix = [];
    let temp = 0;
    let i, j;
    for (i = 0; i <= 25; i++) {
        let row = [];
        temp = i;
        for (j = 0; j <= 25; j++) {
            row.push(Alphabets[temp]);
            if (temp >= 25 && j < 25) {
                temp = 0;
            } else {
                temp++;
            }
        }
        matrix.push(row);
    }
    console.log(column_marks, row_marks, replaced_marks);
    let r, c;
    for (r = 0; r < matrix.length; r++) {
        for (c = 0; c < matrix[r].length; c++) {
            if (replaced_marks.includes([c, r])) {
                printCell(matrix[r][c], dom_matrix, "rc");
            } else if (replaced_marks.map(item => JSON.stringify(item)).indexOf(JSON.stringify([r, c])) !== -1) {
                console.log([r, c]);
                printCell(matrix[r][c], dom_matrix, "r");
            } else if (column_marks.includes(c)) {
                printCell(matrix[r][c], dom_matrix, "c");
            } else {
                printCell(matrix[r][c], dom_matrix, "");
            }
        }
    }
}

function encrypttext() {
    row_marks = [];
    column_marks = [];
    if (validateInput()) {
        document.getElementById("cyphertext").innerHTML = "<div class='bg-danger h2'>Inputs Are Not Valid</div>"
        return;
    }
    cypher = "";
    let plaintext = document.getElementById("plaintext").value.toLowerCase();
    let key = document.getElementById("key").value.toLowerCase();
    plaintext = plaintext.split("").filter((item) => item.trim() !== "");
    key = key.split("").filter((item) => item.trim() !== "");
    let keyMapped = mapKeyToPlainText(key, plaintext);
    keyMapped.forEach(element => { getReplaceMent(getIndexofElement(element)); });
    key.forEach(element => { column_marks.push(singleCharacterIndex(element)) });
    plaintext.forEach(element => { row_marks.push(singleCharacterIndex(element)) });
    generateMatrix()
    document.getElementById("cyphertext").innerHTML = cypher;
}

function singleCharacterIndex(element) {
    element = element.toLowerCase();
    return Alphabets.indexOf(element);
}

function mapKeyToPlainText(key, plaintext) {
    let keyMapped = [];
    let key_index = 0;
    plaintext.forEach(element => {
        console.log(element, key_index);
        keyMapped.push([key[key_index], element]);
        key_index++;
        if (key_index > key.length - 1) {
            key_index = 0;
        }
    });
    return keyMapped;
}


function getReplaceMent(index) {
    replaced_marks.push(index)
    let replacement = matrix[index[0]][index[1]];
    cypher += replacement;
    return cypher;
}


function getIndexofElement(element) {
    let index_key_element = Alphabets.indexOf(element[0]);
    let index_plaintext_element = Alphabets.indexOf(element[1]);
    let index_replacement = [index_plaintext_element, index_key_element];
    return index_replacement;
}

function printCell(element, matrix, mark) {
    if (mark === "r") {
        matrix.innerHTML += '<div class = "cell bg-info" > ' + element + "</div>";
    } else if (mark === "c") {
        matrix.innerHTML += '<div class = "cell bg-success" > ' + element + "</div>";
    } else if (mark === "rc") {
        matrix.innerHTML += '<div class = "cell bg-warning" > ' + element + "</div>";
    } else {
        matrix.innerHTML += '<div class = "cell bg-primary" > ' + element + "</div>";
    }
}

function validateInput() {
    const plaintext = document.getElementById("plaintext").value;
    const key = document.getElementById("key").value;
    if (!plaintext.match(/^[a-zA-Z]+$/) || !key.match(/^[a-zA-Z]+$/)) {
        return true;
    } else {
        return false;
    }
}