const $input = document.querySelector('#url');
const $img = document.querySelector('img');
const $attributeValue = $img.getAttribute('src');

$input.addEventListener('input', function (e) {
  $img.setAttribute('src', e.target.value);
});

const $form = document.querySelector('form');
$form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = {
    title: $form.elements.title.value,
    url: $form.elements.url.value,
    textarea: $form.elements.textarea.value
  };

  formData.entryId = data.nextEntryId++;
  data.entries.unshift(formData);
  $img.setAttribute('src', $attributeValue);
  $form.reset();
});

/// ////Code for entry page below

function renderEntry(entry) {
  const divDataView = document.createElement('div');
  divDataView.setAttribute('data-view', 'entries');

  const ul = document.createElement('ul');
  divDataView.appendChild(ul);

  const list = document.createElement('li');
  ul.appendChild(list);

  const firstDivColHalf = document.createElement('div');
  firstDivColHalf.setAttribute('class', 'column-half');
  list.appendChild(firstDivColHalf);

  const entriesImg = document.createElement('img');
  entriesImg.setAttribute('class', 'entries-img');
  entriesImg.setAttribute('src', entry.url);
  entriesImg.setAttribute('alt', 'user image');
  firstDivColHalf.appendChild(entriesImg);

  const secondDivColHalf = document.createElement('div');
  secondDivColHalf.setAttribute('class', 'column-half');
  list.appendChild(secondDivColHalf);

  const h2Title = document.createElement('h2');
  h2Title.setAttribute('class', 'entries-h2');
  const title = document.createTextNode(entry.title);
  h2Title.appendChild(title);
  secondDivColHalf.appendChild(h2Title);

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'entries-p');
  const paraTextOne = document.createTextNode(entry.textarea);
  paragraph.appendChild(paraTextOne);
  secondDivColHalf.appendChild(paragraph);

  return divDataView;
}
renderEntry(data.entries[0]);
