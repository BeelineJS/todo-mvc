module.exports = {
  create,
  init,
  render
}

const userEvents = {
  'click/clear-completed': _clearCompleted
};

const windowEvents = {
  'hashchange': _onHashChange,
  'load': _onHashChange
}

function create() {
  return require('./TodoFooter.html.js')();
}

function init(context) {
  const { events } = context;
  events.user.set(userEvents);
  events.window.set(windowEvents);
}

function render(context) {
  const { util, value } = context;
  const { textContent, show } = util;

  const noOfActiveItems = value.filter(v => v.active).length;
  textContent('[data-key="count"]', noOfActiveItems);

  const description = noOfActiveItems === 1 ? 'item left' : 'items left'
  textContent('[data-key="description"]', description);

  const hasCompleted = value.some(v => !v.active);
  show('[data-key="clear-completed"]', hasCompleted);
}

function _onHashChange(context) {
  const { doc, util } = context;
  let hash = doc.location.hash;
  const links = util.findAll('.filters a');
  links.forEach(l => l.classList.remove('selected'));
  if (util.find(`.filters a[href="${hash}"]`) == null) hash = '#/'
  util.find(`.filters a[href="${hash}"]`).classList.add('selected');
}

function _clearCompleted(context) {
  const { value } = context;

  return value.filter(v => v.active)
}