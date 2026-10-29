let timerInterval;

async function getWeather() {
  const cityInput = document.getElementById('city');
  if (!cityInput) return;

  const city = cityInput.value.trim();
  if (!city) {
    alert("Por favor, digite o nome de uma cidade.");
    return;
  }

  const apiKey = "c30f06097e8d3d33e950a5e1e7b009d0"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Cidade não encontrada");
    }

    const data = await response.json();

    // Atualiza as informações do clima
    document.getElementById('city-name').innerText = `Clima em ${data.name}`;
    document.getElementById('temperature').innerText = `Temperatura: ${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = `Descrição: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Umidade: ${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `Vento: ${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    // Atualiza o relógio com o fuso horário retornado pela API da cidade
    startClock(data.timezone);

  } catch (error) {
    alert("Cidade não encontrada ou erro na busca.");
    console.error(error);
  }
}

// 1. Box Relógio (calcula a hora local usando o fuso horário da API)
function startClock(timezoneOffset) {
  if (timerInterval) clearInterval(timerInterval);

  function updateTime() {
    const now = new Date();
    // Ajusta para o fuso retornado pela API (em segundos)
    const localTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (timezoneOffset * 1000));
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    const seconds = String(localTime.getSeconds()).padStart(2, '0');
    
    document.getElementById('clock').innerText = `Horário Local: ${hours}:${minutes}:${seconds}`;
  }

  updateTime();
  timerInterval = setInterval(updateTime, 1000);
}

// 2. Box Condicional de Idade
function checkAge() {
  const ageInput = document.getElementById('age').value;
  const resultEl = document.getElementById('age-result');

  if (ageInput === "") {
    resultEl.innerText = "Por favor, digite sua idade.";
    resultEl.style.color = "orange";
    return;
  }

  const age = Number(ageInput);

  if (age >= 18) {
    resultEl.innerText = "Acesso Permitido ao evento!";
    resultEl.style.color = "green";
  } else {
    resultEl.innerText = "Acesso Negado. Entrada apenas para maiores de 18 anos.";
    resultEl.style.color = "red";
  }
}

// 3. Box Alterar Tema
function modo() {
  document.body.classList.toggle('dark-mode');
}

// Enter para buscar
document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('city');
  if (cityInput) {
    cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') getWeather();
    });
  }
});