const input = document.querySelector('#url');
const img = document.querySelector('img');
const attributeValue = img.getAttribute('src');

input.addEventListener('input', function (e) {
  img.setAttribute('src', e.target.value);
});

const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = {
    title: form.elements.title.value,
    url: form.elements.url.value,
    textarea: form.elements.textarea.value
  };

  formData.entryId = data.nextEntryId++;
  data.entries.unshift(formData);
  img.setAttribute('src', attributeValue);
  form.reset();
});
