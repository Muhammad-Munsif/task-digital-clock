document.addEventListener("DOMContentLoaded", function () {
  const hoursElement = document.querySelector(".hours");
  const minutesElement = document.querySelector(".minutes");
  const secondsElement = document.querySelector(".seconds");
  const ampmElement = document.querySelector(".ampm");
  const dateElement = document.querySelector(".date");
  const formatToggle = document.getElementById("formatToggle");
  const themeToggle = document.getElementById("themeToggle");

  let is24HourFormat = false;
  let isDarkTheme = true;

  // Initialize theme
  if (localStorage.getItem("theme") === "light") {
    toggleTheme();
  }

  // Initialize time format
  if (localStorage.getItem("timeFormat") === "24") {
    is24HourFormat = true;
    formatToggle.innerHTML =
      '<i class="fas fa-exchange-alt mr-2"></i>Switch to 12-hour';
  }

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    let ampm = "";

    if (!is24HourFormat) {
      // 12-hour format
      ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
      ampmElement.textContent = ampm;
      ampmElement.style.display = "block";
    } else {
      // 24-hour format
      ampmElement.style.display = "none";
    }

    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

    // Date
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    dateElement.textContent = now.toLocaleDateString(undefined, options);
  }

  function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    localStorage.setItem("timeFormat", is24HourFormat ? "24" : "12");
    formatToggle.innerHTML = is24HourFormat
      ? '<i class="fas fa-exchange-alt mr-2"></i>Switch to 12-hour'
      : '<i class="fas fa-exchange-alt mr-2"></i>Switch to 24-hour';
    updateClock();
  }

  function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    themeToggle.innerHTML = isDarkTheme
      ? '<i class="fas fa-moon mr-2"></i>Light Mode'
      : '<i class="fas fa-sun mr-2"></i>Dark Mode';
  }

  formatToggle.addEventListener("click", toggleTimeFormat);
  themeToggle.addEventListener("click", toggleTheme);

  // Update clock immediately and then every second
  updateClock();
  setInterval(updateClock, 1000);
});
