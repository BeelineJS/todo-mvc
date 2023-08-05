// auto generated based on src\components\TodoItems\TodoItem.html

module.exports =  create;

function create(value) {

   return `<li  class="${value.completed}">
    <div class="view">
        <input class="toggle" type="checkbox" ${value.checked}  data-key="toggle">
        <label data-key="edit">${value.task}</label>
        <button class="destroy" data-key="destroy"></button>
    </div>
    <input class="edit" data-key="input"/>
</li>`;
}