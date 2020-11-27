
var riskLevel = 6;

$(() => {
   
    $('#cpf').mask('000.000.000-00');
    $('#adress-cep').mask('00000-000');
    $('#phone1').mask('(00) 0000-0000');
    $('#phone2').mask('(00) 0000-0000');
    
    refreshRiskBoxes();
    
});

function resetForm() {
    riskLevel = 0;
    refreshRiskBoxes();
}

function recalculateRisk() {
    
    
    
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

