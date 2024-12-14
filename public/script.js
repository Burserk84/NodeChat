const socket = io();

// گرفتن عناصر DOM
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

// نمایش پیام در صفحه
function appendMessage(data) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>${data.username}</strong> [${data.time}]: ${data.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

// دریافت تاریخچه پیام‌ها
socket.on('message history', (history) => {
  messages.innerHTML = ''; // پاک کردن پیام‌های قبلی
  history.forEach(appendMessage);
});

// دریافت پیام جدید از سرور
socket.on('chat message', (data) => {
  appendMessage(data);
});

// ارسال پیام به سرور
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
