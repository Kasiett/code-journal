const $input = document.querySelector('#url');
const $img = document.querySelector('img');
const $attributeValue = $img.getAttribute('src');
const $ul = document.querySelector('ul');
const $noRecordsP = document.querySelector('.no-records');
const $dVEntryForm = document.querySelector('[data-view="entry-form"]');
const $dVEntries = document.querySelector('[data-view="entries"]');
const $dVEntriesAttribute = $dVEntries.getAttribute('data-view');
const $entriesAnchor = document.querySelector('.nav-anchor');
const $btnNew = document.querySelector('.new-btn');

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

  $ul.prepend(renderEntry(formData));
  viewSwap('entries');
  toggleNoEntries();

});

/// ////Code for entry page below

function renderEntry(entry) {
  const list = document.createElement('li');
  list.setAttribute('data-entry-id', 'entryId');

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

  const divIcon = document.createElement('div');
  divIcon.setAttribute('class', 'icon');
  secondDivColHalf.appendChild(divIcon);

  const h2Title = document.createElement('h2');
  h2Title.setAttribute('class', 'entries-h2');
  h2Title.textContent = entry.title;
  divIcon.appendChild(h2Title);

  const icon = document.createElement('i');
  icon.setAttribute('class', 'fa fa-pencil');
  icon.setAttribute('aria-hidden', 'true');
  divIcon.appendChild(icon);

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'entries-p');
  const paraTextOne = document.createTextNode(entry.textarea);
  paragraph.appendChild(paraTextOne);
  secondDivColHalf.appendChild(paragraph);
  return list;
}

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noRecordsP.className = 'no-records';
  } else {
    $noRecordsP.className = 'hidden';

  }
}

document.addEventListener('DOMContentLoaded', function (e) {
  for (let i = 0; i < data.entries.length; i++) {
    const newListItem = renderEntry(data.entries[i]);
    $ul.appendChild(newListItem);
  }
  viewSwap(data.view);
  toggleNoEntries();

});

function viewSwap(string) {

  data.view = string;

  if (string === $dVEntriesAttribute) {
    $dVEntryForm.className = 'hidden';
    $dVEntries.className = '';
  } else {
    $dVEntries.className = 'hidden';
    $dVEntryForm.className = '';

  }
}

$entriesAnchor.addEventListener('click', function (e) {
  viewSwap('entries');
});

$btnNew.addEventListener('click', function (e) {
  viewSwap('entry-form');

});
