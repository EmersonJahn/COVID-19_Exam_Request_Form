'use strict';

var riskLevel = 0;

$(() => {
   
    $('#cpf').mask('000.000.000-00');
    $('#adress-cep').mask('00000-000');
    $('#phone1').mask('(00) 00000-0000');
    $('#phone2').mask('(00) 00000-0000');
    
    refreshRiskBoxes();
    
    $('#main-form').submit((e) => {
        e.preventDefault();
        if (!validateForm()) {
            return true;
        }
        return true;
    });

    // $("#calendario").datepicker();
    
    // $( "#calendario" ).datepicker({
    //     showOn: "button",
    //     buttonImage: "calendario.png",
    //     buttonImageOnly: true,
    //     changeMonth: true,
    //     changeYear: true,
    
    
    //     // TODO para traduzir o calendario
    //     // dateFormat: 'dd/mm/yy',
    //     // dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
    //     // dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
    //     // dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    //     // monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    //     // monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    // });
});

// $(document).ready(function() {

//     $('#calendario').datetimepicker({
//         format: 'dd/mm/yyyy'
//     });
// });

// $(document).ready(function() {   
    
//     var userLang = navigator.language || navigator.userLanguage;   

//     var options = $.extend({}, // empty object     
//         $.datepicker.regional[userLang], {   
//             dateFormat: "mm/dd/yy"   
//         } // your custom options     
//     );   

//     $("#calendario").datepicker(options);   
// }); 


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
    
    const phoneNum1 = $('#phone1').cleanVal();
    if (!phoneNum1 || phoneNum1.length == 0 ) {
        addErrorFeedbackToInput('phone1', 'Campo obrigatório!');
        firstErrorInput = firstErrorInput ?? 'phone1';
        isValid = false;
    } else if (phoneNum1.length !== 11) {
        addErrorFeedbackToInput('phone1', 'Telefone inválido!');
        firstErrorInput = firstErrorInput ?? 'phone1';
        isValid = false;
    }
    
    const phoneNum2 = $('#phone2').cleanVal();
    if (phoneNum2 && phoneNum2.length !== 11) {
        addErrorFeedbackToInput('phone2', 'Telefone inválido!');
        firstErrorInput = firstErrorInput ?? 'phone2';
        isValid = false;
    }
    
    const mail = $('#mail')[0].value;
    if (mail && !validateEmail(mail)) {
        addErrorFeedbackToInput('mail', 'E-mail inválido!');
        firstErrorInput = firstErrorInput ?? 'mail';
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
}

function resetForm() {
    riskLevel = 0;
    refreshRiskBoxes();
}

function calculateRisk() {
    
    let newRiskLevel = 0;
    
    const mainForm = document.forms[0];
    
    if (mainForm['radio-symptoms-15-days'].value === 'yes') {
        ++newRiskLevel;
    }
    
    if (mainForm['radio-contact-15-days'].value === 'yes') {
        ++newRiskLevel;
    }
    
    if (mainForm['radio-health-center-15-days'].value === 'yes') {
        ++newRiskLevel;
    }
    
    if (mainForm['radio-essential-services'].value === 'yes') {
        ++newRiskLevel;
    }
    
    if (mainForm['checkbox-symptom-garganta'].checked) {
        ++newRiskLevel;
    }
    
    if (mainForm['checkbox-symptom-dispneia'].checked) {
        ++newRiskLevel;
    }
    
    if (mainForm['checkbox-symptom-febre'].checked) {
        ++newRiskLevel;
    }
    
    if (mainForm['checkbox-symptom-tosse'].checked) {
        ++newRiskLevel;
    }
    
    riskLevel = newRiskLevel;
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

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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

