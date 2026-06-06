const $ = sel => document.querySelector(sel);

const home = $('#home');
const calc = $('#calculator');
const startBtn = $('#startBtn');
const backBtn = $('#backBtn');
const imcForm = $('#imcForm');
const pesoInput = $('#peso');
const alturaInput = $('#altura');
const resultBox = $('#result');
const imcValueEl = $('#imcValue');
const imcClassEl = $('#imcClass');
const errorEl = $('#error');
const resetBtn = $('#resetBtn');

function showScreen(screenEl){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screenEl.classList.add('active');
  // reset messages when switching
  hideError();
  hideResult();
}

startBtn.addEventListener('click', () => showScreen(calc));
backBtn.addEventListener('click', () => showScreen(home));

function showError(message){
  errorEl.hidden = false;
  errorEl.textContent = message;
}

function hideError(){
  errorEl.hidden = true;
  errorEl.textContent = '';
}

function showResult(imc, classification){
  imcValueEl.textContent = `IMC: ${imc.toFixed(2)}`;
  imcClassEl.textContent = classification;
  resultBox.hidden = false;
}

function hideResult(){
  resultBox.hidden = true;
  imcValueEl.textContent = '';
  imcClassEl.textContent = '';
}

function classifyIMC(imc){
  // Standard WHO-like categories simplified as requested
  if(imc < 18.5) return 'Abaixo do peso';
  if(imc < 25) return 'Peso normal';
  if(imc < 30) return 'Sobrepeso';
  return 'Obesidade';
}

imcForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  hideError();
  hideResult();

  const peso = parseFloat(pesoInput.value.replace(',', '.'));
  const altura = parseFloat(alturaInput.value.replace(',', '.'));

  if (!pesoInput.value || !alturaInput.value) {
    showError('Preencha o peso e a altura para calcular o IMC.');
    return;
  }

  if (Number.isNaN(peso) || Number.isNaN(altura) || peso <= 0 || altura <= 0) {
    showError('Valores inválidos. Informe números maiores que zero.');
    return;
  }

  // calculate
  const imc = peso / (altura * altura);
  const classification = classifyIMC(imc);

  showResult(imc, classification);
});

// limpar campos
resetBtn.addEventListener('click', () => {
  pesoInput.value = '';
  alturaInput.value = '';
  hideError();
  hideResult();
});

// Start on home screen (already default). Ensure accessible keyboard flow
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    // voltar para tela inicial se estiver no cálculo
    if(calc.classList.contains('active')) showScreen(home);
  }
});