let printed_cell = new Array();
let matrix_array = new Array();
let cypher = "";

function encrypttext() {
    cypher = "";
    matrix_array = new Array();
    printed_cell = [];
    if (validateInput()) {
        return;
    }
    let matrix = document.getElementById("matrix");
    matrix.innerHTML = "";
    printed_cell = new Array();
    let plaintext = document.getElementById("plaintext").value.toLowerCase();
    let key = document.getElementById("key").value.toLowerCase();
    console.log(plaintext + " " + key);
    let key_for_matrix = key.split("").filter((item) => item.trim() !== "");
    key_for_matrix.forEach((element) => {
        printCell(element, matrix)
    });
    let abcd = "abcdefghijklmnopqrstuvwxyz".split("");
    abcd.forEach((element) => {
        printCell(element, matrix)
    });
    getMatrix();
    plaintext = plaintext.split("").filter((item) => item.trim() !== "")
    for (x = 0; x < plaintext.length; x++) {
        if (x === plaintext.length - 1) {
            console.log(plaintext[x], "x")
            getReplaceMent(getIndexofElement(plaintext[x]), getIndexofElement("x"));
            break;
        } else if (plaintext[x] === plaintext[x + 1]) {
            console.log(plaintext[x], "x")
            getReplaceMent(getIndexofElement(plaintext[x]), getIndexofElement("x"));
        } else {
            console.log(plaintext[x], plaintext[x + 1])
            getReplaceMent(getIndexofElement(plaintext[x]), getIndexofElement(plaintext[x + 1]))
            x++;
        }
    }
    document.getElementById("cyphertext").innerHTML = cypher;
}

function getReplaceMent(first_element_index, secound_element_index) {
    let first_replacement_index;
    let secound_replacement_index;
    if (first_element_index[0] === secound_element_index[0]) {
        if ((first_element_index[1] + 1) >= 5) {
            first_element_index[1] = -1;
        }
        if ((secound_element_index[1] + 1) >= 5) {
            secound_element_index[1] = -1;
        }
        first_replacement_index = [first_element_index[0], first_element_index[1] + 1];
        secound_replacement_index = [secound_element_index[0], secound_element_index[1] + 1];
    } else if (first_element_index[1] === secound_element_index[1]) {
        if ((secound_element_index[0] + 1) >= 5) {
            secound_element_index[0] = -1;
        }
        if ((first_element_index[0] + 1) >= 5) {
            first_element_index[0] = -1;
        }
        first_replacement_index = [first_element_index[0] + 1, first_element_index[1]];
        secound_replacement_index = [secound_element_index[0] + 1, secound_element_index[1]];
    } else {
        first_replacement_index = [first_element_index[0], secound_element_index[1]];
        secound_replacement_index = [secound_element_index[0], first_element_index[1]];
    }
    let first_replacement = matrix_array[first_replacement_index[0]][first_replacement_index[1]];
    let secound_replacement = matrix_array[secound_replacement_index[0]][secound_replacement_index[1]]
    cypher += first_replacement + secound_replacement;
    return cypher;
}


function getIndexofElement(element) {
    let index;
    for (i = 0; i < matrix_array.length; i++) {
        let temp = matrix_array[i].indexOf(element);
        if (temp !== -1) {
            index = [i, temp];
            break;
        }
    }
    if (index === null) {
        alert("something went wrong");
    } else {
        return index;
    }
}

function getMatrix() {
    let matrix = new Array();
    let row = new Array();
    printed_cell.forEach(element => {
        if (row.length === 5) {
            matrix.push(row);
            row = new Array();
        }
        if (element !== "j") {
            row.push(element);
        }
    });
    matrix.push(row);
    matrix_array = matrix;
    return matrix;
}

function printCell(element, matrix) {
    if (printed_cell.indexOf(element) < 0) {
        if (element === "i" || element === "j") {
            matrix.innerHTML += '<div class="cell bg-primary">I/J</div>';
            printed_cell.push("i");
            printed_cell.push("j");
        } else {
            matrix.innerHTML +=
                '<div class="cell bg-primary">' + element + "</div>";
            printed_cell.push(element);
        }
    }
}

function validateInput() {
    const plaintext = document.getElementById("plaintext").value;
    const key = document.getElementById("key").value;
    const regex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    if (!regex.test(plaintext) || !regex.test(key)) {
        alert("please enter only Alphabets");
        return true;
    } else {
        return false;
    }
}