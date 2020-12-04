'use strict';

var riskLevel = 7;

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
    
    let isValid = true;
    let firstErrorInput;
    
    let error = '';
    if (error = verifyTextInput('name', 10)) {
        addErrorFeedbackToInput('name', error);
        firstErrorInput = firstErrorInput ?? 'name';
        isValid = false;
    }
    
    if (error = verifyTextInput('cpf')) {
        addErrorFeedbackToInput('cpf', error);
        firstErrorInput = firstErrorInput ?? 'cpf';
        isValid = false;
    }
    
    const cpf = $('#cpf').cleanVal();
    
    if (!validateCPF(cpf)) {
        addErrorFeedbackToInput('cpf', 'CPF inválido!');
        firstErrorInput = firstErrorInput ?? 'cpf';
        isValid = false;
    }
    
    if (error = verifyTextInput('adress')) {
        addErrorFeedbackToInput('adress', error);
        firstErrorInput = firstErrorInput ?? 'adress';
        isValid = false;
    }
    
    if (error = verifyTextInput('adress-number')) {
        addErrorFeedbackToInput('adress-number', error);
        firstErrorInput = firstErrorInput ?? 'adress-number';
        isValid = false;
    }
    
    if (error = verifyTextInput('adress-complement')) {
        addErrorFeedbackToInput('adress-complement', error);
        firstErrorInput = firstErrorInput ?? 'adress-complement';
        isValid = false;
    }
    
    if (error = verifyTextInput('adress-city')) {
        addErrorFeedbackToInput('adress-city', error);
        firstErrorInput = firstErrorInput ?? 'adress-city';
        isValid = false;
    }
    
    if (error = verifyTextInput('adress-city')) {
        addErrorFeedbackToInput('adress-city', error);
        firstErrorInput = firstErrorInput ?? 'adress-city';
        isValid = false;
    }
    
    if (error = verifyTextInput('adress-state')) {
        addErrorFeedbackToInput('adress-state', error);
        firstErrorInput = firstErrorInput ?? 'adress-state';
        isValid = false;
    }
    
    if (error = verifyTextInput('adress-cep')) {
        addErrorFeedbackToInput('adress-cep', error);
        firstErrorInput = firstErrorInput ?? 'adress-cep';
        isValid = false;
    }
    
    
    
    if (isValid) {
        alert('formulário válido!');
        return true;
    }
    
    alert('Foram encontrados erros no formulário!');
    $('#' + firstErrorInput).focus();
    
    return false;
}

function verifyTextInput(elementId, minLength = 0) {
    const element = $('#' + elementId)[0];
    if (!element || !element.value) {
        return 'Campo obrigatório!';
    }
    if (element.value.length < minLength) {
        return 'Campo deve ter no mínimo ' + minLength + ' caracteres!';
    }
    return '';
}

function addErrorFeedbackToInput(elementId, error) {
    const element = $("#" + elementId);
    element.addClass('is-invalid');
    $('#invalid-feedback-' + elementId).html(error);
    // alert(error);
    // element.focus();
}

function resetForm() {
    riskLevel = 0;
    refreshRiskBoxes();
}

function validateCPF(c){
    
    if (c.length != 11) {
        return false;
    }
    
    var i;
    var s = c;
    var c = s.substr(0,9);
    var dv = s.substr(9,2);
    var d1 = 0;
    var v = false;
 
    for (i = 0; i < 9; i++){
        d1 += c.charAt(i)*(10-i);
    }
    if (d1 == 0){
        return false;
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(0) != d1){
        return false;
    }
 
    d1 *= 2;
    for (i = 0; i < 9; i++){
        d1 += c.charAt(i)*(11-i);
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(1) != d1){
        return false;
    }
    if (!v) {
        return true;
    }
    return false;
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

