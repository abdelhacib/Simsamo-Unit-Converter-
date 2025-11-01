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
  length: ['متر', 'كيلومتر', 'سنتيمتر', 'مم', 'ميل'],
  weight: ['كيلوغرام', 'غرام', 'طن', 'باوند'],
  temperature: ['سليزيوس', 'فهرنهايت', 'كلفن'],
  speed: ['كم/س', 'م/ث', 'ميل/س'],
  area: ['م²', 'كم²', 'هكتار', 'فدان'],
  volume: ['لتر', 'ملليتر', 'م³', 'غالون'],
  time: ['ثانية', 'دقيقة', 'ساعة', 'يوم'],
  energy: ['جول', 'كيلو جول', 'كالوري', 'كيلو كالوري']
};

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

// عملية التحويل (مبدئية، مجرد مثال)
convertBtn.addEventListener('click', () => {
  const value = parseFloat(inputValue.value);
  const from = fromUnit.value;
  const to = toUnit.value;
  if (isNaN(value)) {
    resultDiv.textContent = 'الرجاء إدخال قيمة صحيحة';
    return;
  }

  // تحويل وهمي (للتجربة فقط)
  let result = value; 
  resultDiv.textContent = `${value} ${from} = ${result} ${to}`;
});

// تهيئة عند تحميل الصفحة
updateUnits(categorySelect.value);
