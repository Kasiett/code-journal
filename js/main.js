const input = document.querySelector('#url');
const img = document.querySelector('img');
input.addEventListener('input', function (e) {
  img.setAttribute('src', e.target.value);
});
