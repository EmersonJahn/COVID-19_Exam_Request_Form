'use strict';

var riskLevel = 6;

$(() => {
   
    $('#cpf').mask('000.000.000-00');
    $('#adress-cep').mask('00000-000');
    $('#phone1').mask('(00) 0000-0000');
    $('#phone2').mask('(00) 0000-0000');
    
    refreshRiskBoxes();
    
    $('#main-form').submit((e) => {
        e.preventDefault();
        if (!validateForm()) {
            return true;
        }
        return true;
    });
    
});

function validateForm() {
    
    $('.is-invalid').removeClass('is-invalid');
    
    let error = '';
    if (error = verifyTextInput('name', 'nome do paciente', 10)) {
        showErrorInInput(error, 'name');
        return false;
    }
    
    return true;
}

function verifyTextInput(elementId, name, minLength = 0) {
    const element = $('#' + elementId)[0];
    if (!element || !element.value) {
        return 'O campo ' + name + ' deve ser preenchido!';
    }
    if (element.value.length < minLength) {
        return 'O campo ' + name + ' deve ter no mínimo ' + minLength + ' caracteres!';
    }
    return '';
}

function showErrorInInput(error, elementId) {
    const element = $("#" + elementId);
    element.addClass('is-invalid');
    alert(error);
    element.focus();
}

function resetForm() {
    riskLevel = 0;
    refreshRiskBoxes();
}

function refreshRiskBoxes() {
    
    for (let i = 1; i <= 9; i++) {
        
        const elem = $('#risk-box-' + i);
        
        if (riskLevel >= i) {
            elem.addClass('active');
        } else {
            elem.removeClass('active');
        }
        
    }
    
}

