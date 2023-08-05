module.exports = {
  create,
  init
}
const userEvents = {
  'keydown/insert/Enter': _insertTodo,
  'click/toggle': _toggle
};

function create() {
  return require('./TodoHeader.html.js')();
}

function init(context) {
  const { events } = context;
  events.user.set(userEvents);
}

function _insertTodo(context) {
  const { el, value } = context;
  const input = el().querySelector('input');

  const inputValue = input.value;
  if (inputValue.trim() === '') return;

  const todo = {
    task: input.value,
    active: true
  }

  value.push(todo);
  input.value = '';

  return value;
}

function _toggle(context) {
  const { value } = context;
  const state = !model.value.every(v => v.active);
  value.forEach(v => v.active = state);

  return value;
}
