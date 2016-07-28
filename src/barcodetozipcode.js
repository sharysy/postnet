/**
 * Created by shiyue on 16-7-28.
 */
'use strict';
let table = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];

function isLegalBarcode(barcode) {
    let arr = [];
    let barcodeArr = barcode.split("");
    let includedOtherChar = barcodeArr.find((item)=>item !== '|' && item !== ':' && item !== ' ');
    if (includedOtherChar) {
        return false;
    } else {
        if (barcode.startsWith('| ') && barcode.endsWith(' |')) {
            arr = barcode.split(' ').slice(1, arr.length - 1);
            if (arr.find((item)=>item.length !== 5)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}

function formatBarcode(barcode) {
    let arr = barcode.split(' ');
    return arr.slice(1, arr.length - 1);
}

function checkCheckcode(barcodeArr) {
    let zipcodeArr = barcodeArr.map((item)=>table.indexOf(item));
    let sum = zipcodeArr.reduce((pre, cur)=>pre + cur);
    if (!(sum % 10)) {
        return true;
    } else {
        return false;
    }
}

function getZipcode(barcode) {
    let arr = barcode.map((item)=>table.indexOf(item));
    let newArr = arr.slice(0, arr.length);
    newArr.splice(5, 0, '-');
    return newArr.join('').toLocaleString();
}

function barcodeTraZipcode(barcode) {
    let legal = isLegalBarcode(barcode);
    if (legal) {
        let formatedBarcode = formatBarcode(barcode);
        let checked = checkCheckcode(formatedBarcode);
        if (checked) {
            return getZipcode(formatedBarcode);
        }
    }
    else {
        return undefined;
    }
}
let barcodeToZipcode = {
    isLegalBarcode: isLegalBarcode,
    formatBarcode: formatBarcode,
    checkCheckcode: checkCheckcode,
    getZipcode: getZipcode,
    barcodeTraZipcode: barcodeTraZipcode
};
module.exports = barcodeToZipcode;