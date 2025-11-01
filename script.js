const categorySelect = document.getElementById('category');
const categoryIcon = document.getElementById('categoryIcon');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

// أيقونات لكل فئة
const icons = {
  length: 'fa-ruler',
  weight: 'fa-weight-scale',
  temperature: 'fa-temperature-half',
  speed: 'fa-tachometer-alt',
  area: 'fa-vector-square',
  volume: 'fa-cube',
  time: 'fa-clock',
  energy: 'fa-bolt'
};

// وحدات لكل فئة
const units = {
  length: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile'],
  weight: ['Kilogram', 'Gram', 'Ton', 'Pound'],
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  speed: ['km/h', 'm/s', 'mph'],
  area: ['m²', 'km²', 'Hectare', 'Acre'],
  volume: ['Liter', 'Milliliter', 'm³', 'Gallon'],
  time: ['Second', 'Minute', 'Hour', 'Day'],
  energy: ['Joule', 'kJ', 'Calorie', 'kCal']
};

// تحويلات لكل فئة
function convertValue(category, from, to, value) {
  let result = value;

  switch(category) {
    case 'length':
      const lengthFactors = {
        'Meter': 1,
        'Kilometer': 1000,
        'Centimeter': 0.01,
        'Millimeter': 0.001,
        'Mile': 1609.34
      };
      result = value * lengthFactors[from] / lengthFactors[to];
      break;

    case 'weight':
      const weightFactors = {
        'Kilogram': 1,
        'Gram': 0.001,
        'Ton': 1000,
        'Pound': 0.453592
      };
      result = value * weightFactors[from] / weightFactors[to];
      break;

    case 'temperature':
      if(from === 'Celsius') {
        if(to === 'Fahrenheit') result = (value * 9/5) + 32;
        else if(to === 'Kelvin') result = value + 273.15;
      } else if(from === 'Fahrenheit') {
        if(to === 'Celsius') result = (value - 32) * 5/9;
        else if(to === 'Kelvin') result = ((value - 32) * 5/9) + 273.15;
      } else if(from === 'Kelvin') {
        if(to === 'Celsius') result = value - 273.15;
        else if(to === 'Fahrenheit') result = ((value - 273.15) * 9/5) + 32;
      }
      break;

    case 'speed':
      const speedFactors = {'km/h':1, 'm/s':3.6, 'mph':1.60934};
      result = value * speedFactors[from] / speedFactors[to];
      break;

    case 'area':
      const areaFactors = {'m²':1, 'km²':1e6, 'Hectare':1e4, 'Acre':4046.86};
      result = value * areaFactors[from] / areaFactors[to];
      break;

    case 'volume':
      const volumeFactors = {'Liter':1, 'Milliliter':0.001, 'm³':1000, 'Gallon':3.78541};
      result = value * volumeFactors[from] / volumeFactors[to];
      break;

    case 'time':
      const timeFactors = {'Second':1, 'Minute':60, 'Hour':3600, 'Day':86400};
      result = value * timeFactors[from] / timeFactors[to];
      break;

    case 'energy':
      const energyFactors = {'Joule':1, 'kJ':1000, 'Calorie':4.184, 'kCal':4184};
      result = value * energyFactors[from] / energyFactors[to];
      break;
  }

  return result;
}

// تحديث الأيقونة والوحدات عند تغيير الفئة
categorySelect.addEventListener('change', () => {
  const value = categorySelect.value;
  categoryIcon.className = 'fas ' + icons[value];
  updateUnits(value);
});

// تحديث الـ select للوحدات
function updateUnits(category) {
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  units[category].forEach(unit => {
    const option1 = document.createElement('option');
    option1.text = unit;
    option1.value = unit;
    fromUnit.add(option1);

    const option2 = document.createElement('option');
    option2.text = unit;
    option2.value = unit;
    toUnit.add(option2);
  });
}

// زر التحويل
convertBtn.addEventListener('click', () => {
  const category = categorySelect.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  const value = parseFloat(inputValue.value);

  if(isNaN(value)) {
    resultDiv.textContent = 'Please enter a valid number';
    return;
  }

  const result = convertValue(category, from, to, value);
  resultDiv.textContent = `${value} ${from} = ${result.toFixed(4)} ${to}`;
});

// تهيئة عند تحميل الصفحة
updateUnits(categorySelect.value);
