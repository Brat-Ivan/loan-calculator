const amoutInput = document.querySelector('#amount-input') as HTMLInputElement;
const durationInput = document.querySelector('#duration-input') as HTMLInputElement;
const rateInput = document.querySelector('#rate-input') as HTMLInputElement;
const checkboxInput = document.querySelector('#checkbox-input') as HTMLInputElement;

const calculateBtn = document.querySelector('#calculate-button') as HTMLButtonElement;
const resetBtn = document.querySelector('#reset-button') as HTMLButtonElement;

const monthlyPaymentElement = document.querySelector('#monthly-payment') as HTMLSpanElement;
const totalAmountElement = document.querySelector('#total-amount') as HTMLSpanElement;

function calc(): void {
  const amoutInputValue: number = Number(amoutInput.value);
  const durationInputValue: number = Number(durationInput.value);
  const rateInputValue: number = Number(rateInput.value);

  let isValid: boolean = true;
  
  function validate(inputElement: HTMLInputElement, inputValue: number): void {
    if (isFinite(inputValue)) {
      inputElement.classList.remove('field__control--error');
    } else {
      inputElement.classList.add('field__control--error');
      isValid = false;
    }
  }

  validate(amoutInput, amoutInputValue);
  validate(durationInput, durationInputValue);
  validate(rateInput, rateInputValue);

  if (!isValid) return;
  
  const monthlyPayment: number = (amoutInputValue * rateInputValue / 100 / 12) / (1 - (1 + rateInputValue / 100 / 12)**(-durationInputValue));
  const totalAmount: number = monthlyPayment * durationInputValue;
  
  if (monthlyPayment && totalAmount) {
    monthlyPaymentElement.textContent = String(monthlyPayment.toFixed(2));
    totalAmountElement.textContent = String(totalAmount.toFixed(2));
  }
}

calculateBtn.addEventListener('click', e => {
  e.preventDefault();
  calc();
});

resetBtn.addEventListener('click', e => {
  e.preventDefault();
  
  amoutInput.value = '';
  durationInput.value = '';
  rateInput.value = '';

  amoutInput.classList.remove('field__control--error');
  durationInput.classList.remove('field__control--error');
  rateInput.classList.remove('field__control--error');

  monthlyPaymentElement.textContent = '0';
  totalAmountElement.textContent = '0';
});

resetBtn.click();

function calcAutomatically(): void {
  if (checkboxInput.checked) calc();
}

checkboxInput.addEventListener('change', () => {
  calculateBtn.disabled = (checkboxInput.checked) ? true : false;
  calculateBtn.classList.toggle('form__button--disabled');
  calcAutomatically();
});

amoutInput.addEventListener('input', calcAutomatically);
durationInput.addEventListener('input', calcAutomatically);
rateInput.addEventListener('input', calcAutomatically);
