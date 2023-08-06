module.exports = {
  create,
  init,
  render
}

const windowEvents = {
  'hashchange': render
}
const userEvents = {
  'keydown/input/Enter': _update,
  'keydown/input/Tab': _update,
  'keydown/input/Escape': _exitEdit,
  'click/toggle': _toggle,
  'click/destroy': _destroy,
  'dblclick/edit': _edit,
  'focusout/input': _endEdit
}

const itemTemplate = require('./todoItem.html.js')


function create(context) {
  const { value, util } = context;

  const templateValue = util.encode(value);
  return require('./TodoItems.html.js')(templateValue);
}

function init(context) {
  const { events } = context;
  events.user.set(userEvents);
  events.window.set(windowEvents)
}

function render(context) {
  const { value, el, doc } = context;
  const hash = doc.location.hash;

  const html = value
    .filter(m => isFiltered(m.active, hash))
    .map(m => itemTemplate({
      task: m.task,
      checked: m.active ? '' : 'checked',
      completed: m.active ? '' : 'completed',
    }))
    .join('');

  el.innerHTML = html;
}

function isFiltered(isActive, hash) {
  switch (hash) {
    case '#/active': return isActive;
    case '#/completed': return !isActive;
  }
  return true;
}

function _update(context) {
  const { e, util } = context;
  const index = getIndex(util, e.target, 'input');
  util.findNth('li', index).classList.remove('editing');
}

function _toggle(context) {
  const { e, util, value } = context;
  const index = getIndex(util, e.target, 'toggle');
  value[index].active = !value[index].active;

  return value;
}

function _destroy(context) {
  const { e, util, value } = context;
  const index = getIndex(util, e.target, 'destroy');
  value.splice(index, 1);

  return value;
}

function _exitEdit(context) {
  const { e, util } = context;
  const index = getIndex(util, e.target, 'input');
  util.findNth('li', index).classList.remove('editing');
}

function _endEdit(context) {
  const { e, util, value } = context;
  const index = getIndex(util, e.target, 'input');
  util.findNth('li', index).classList.remove('editing');

  const input = util.findNth('input.edit', index);
  if (input.value.trim().length === 0) {
    value.splice(index, 1);
    return value;
  }

  value[index].task = input.value;
  return value;
}

function _edit(context) {
  const { e, util, value } = context;
  const index = getIndex(util, e.target, 'edit');
  util.findNth('li', index).classList.add('editing');
  const input = util.findNth('input.edit', index);
  input.value = value[index].task;
  input.focus();
}

function getIndex(util, el, key) {
  return util.findAll(`[data-key="${key}"]`).findIndex(e => e === el);
}