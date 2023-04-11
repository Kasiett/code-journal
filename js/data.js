/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const storedFormData = localStorage.getItem('storedFormData');
if (storedFormData !== null) {
  data = JSON.parse(storedFormData);
}
window.addEventListener('beforeunload', function (e) {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('storedFormData', dataJson);
});
