const $input = document.querySelector('#url');
const $img = document.querySelector('img');
const $attributeValue = $img.getAttribute('src');
const $textArea = document.querySelector('#textarea');
const $title = document.querySelector('#title');
const $ul = document.querySelector('ul');
const $noRecordsP = document.querySelector('.no-records');
const $dVEntryForm = document.querySelector('[data-view="entry-form"]');
const $dVEntries = document.querySelector('[data-view="entries"]');
const $dVEntriesAttribute = $dVEntries.getAttribute('data-view');
const $entriesAnchor = document.querySelector('.nav-anchor');
const $btnNew = document.querySelector('.new-btn');
const $editEntry = document.querySelector('.edit-entry-title');
const $formFooter = document.querySelector('.form-footer');
const $anchorShow = document.querySelector('.hidden');
const $divFixedContainer = document.querySelector('#fixed-container');
const $cancelBtn = document.querySelector('.cancel-btn');
const $confirmBtn = document.querySelector('.confirm-btn');
const $ulList = $ul.childNodes;

$input.addEventListener('input', function (e) {
  $img.setAttribute('src', e.target.value);
});

const $form = document.querySelector('form');
$form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (data.editing === null) {
    const formData = {
      title: $form.elements.title.value,
      url: $form.elements.url.value,
      textarea: $form.elements.textarea.value,
      entryId: data.nextEntryId
    };

    formData.entryId = data.nextEntryId++;
    data.entries.unshift(formData);
    $img.setAttribute('src', $attributeValue);
    $ul.prepend(renderEntry(formData));
    $form.reset();
    viewSwap('entries');
    toggleNoEntries();
  } else {
    const newData = {
      title: $form.elements.title.value,
      url: $form.elements.url.value,
      textarea: $form.elements.textarea.value,
      entryId: data.editing.entryId
    };

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = newData;
      }
    }
    const newEl = renderEntry(newData);
    const allList = document.querySelectorAll('li');
    for (let i = 0; i < allList.length; i++) {
      const listId = Number(allList[i].getAttribute('data-entry-id'));
      if (data.editing.entryId === listId) {
        allList[i].replaceWith(newEl);
      }
    }

  }
  data.editing = null;
  viewSwap('entries');

});

/// ////Code for entry page below

function renderEntry(entry) {
  const list = document.createElement('li');
  list.setAttribute('data-entry-id', entry.entryId);

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

// event for cancel btn

$cancelBtn.addEventListener('click', function (event) {
  $divFixedContainer.setAttribute('class', 'hidden');
});

// event for confirm btn

$confirmBtn.addEventListener('click', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
      for (let j = 0; j < $ulList.length; j++) {
        if ($ulList[j].tagName === 'LI' && Number($ulList[j].dataset.entryId) === data.editing.entryId) {
          $ulList[j].remove();
        }
      }

    }
  }
  $divFixedContainer.setAttribute('class', 'hidden');
  viewSwap('entries');

});

// event for delete btn

$anchorShow.addEventListener('click', function (event) {
  $divFixedContainer.setAttribute('class', 'show');
});

$ul.addEventListener('click', function (event) {
  $formFooter.setAttribute('class', 'form-footer-delete');
  $anchorShow.setAttribute('class', 'anchor-show');
  const listItem = event.target.closest('li');
  const listAttribute = parseInt(listItem.getAttribute('data-entry-id'));

  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === listAttribute) {
      data.editing = data.entries[i];
    }
  }
  $title.setAttribute('value', data.editing.title);
  $input.setAttribute('value', data.editing.url);
  $textArea.value = data.editing.textarea;
  $img.setAttribute('src', data.editing.url);
  $editEntry.textContent = 'Edit Entry';
  viewSwap('entry-form');

});

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
  if ($anchorShow) {
    $anchorShow.setAttribute('class', 'visibility-hidden');
  }
  data.editing = null;
  $title.value = '';
  $input.value = '';
  $textArea.value = '';
  $img.src = './images/placeholder-image-square.jpg';
  $editEntry.textContent = 'New Entry';

  viewSwap('entry-form');

});
