const amount = document.querySelector('#amount');
const total = document.querySelector('#total');
const bill = document.querySelector('#bill');
const peopleNum = document.querySelector('#people-num');

const tipSelection = document.querySelectorAll('.tip-box'); //select all radios, but custom
const tipCustom = document.querySelector('.tip-custom'); //custom tip selection

const reset = document.querySelector('.cheque-button');
const allInputs = document.querySelectorAll('input');

const getBill = function () {
    return document.querySelector('#bill').value;
};

const getTip = function () {

    if (tipCustom.value !== '') {
        return tipCustom.value / 100;
    }

    const box = Array.from(tipSelection).find((select) => select.checked);

    return (
        document
            .querySelector(`label[for="${box.getAttribute('id')}"]`)
            .textContent.slice(0, -1) / 100
    );
};

const getPeople = function() {
    return document.querySelector('#people-num').value
}

//validation 
function validBill() {
    if (bill.value === '' || bill.value <= 0) {
        setError(bill);
        return false;
    } else {
        setSuccess(bill);
        return true;
    }
}

function validPeople () {
    if (peopleNum.value === '' || peopleNum <= 0) {
        setError(peopleNum) 
        return false;
    } else {
        setSuccess(peopleNum);
        return true;
    }
}

//calculation of tip 
function calculateTip(billS, tipPercent, people) {

    amount.innerHTML = '$' + (billS * tipPercent / people).toFixed(2);
    total.innerHTML = '$' + (billS * (1 + tipPercent) / people).toFixed(2);

    reset.addEventListener('click', e => {
        amount.innerHTML = '$0.00';
        total.innerHTML = '$0.00';
        allInputs.forEach(values => {
            values.value = '';
            values.checked = false;
        })
    })
}

//makiing changes 
allInputs.forEach(function (input) {
    input.addEventListener('change', function () {
        if (this.classList.contains('tip-box')) {
            tipCustom.value = '';
        }

        if (this.classList.contains('tip-custom')) {
            tipSelection.forEach(select => select.checked = false)
        }

        if (!validBill()) return;
        if (!validPeople()) return;

        calculateTip(getBill(), getTip(), getPeople());
    })
})

function setError(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    input.classList.remove('success');
    input.classList.add('error');
    small.style.visibility = 'visible';
}

function setSuccess(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.style.visibility = 'hidden';
    input.classList.remove('error');
    input.classList.add('success');
}