// auto generated list of available components

const components = {
'TodoFooter': require('./TodoFooter/TodoFooter.js'),
'TodoHeader': require('./TodoHeader/TodoHeader.js'),
'TodoItems': require('./TodoItems/TodoItems.js')
};

function get(key) {
   if (components[key] == null) {
     console.log('Component ' +key + ' not found')
      return new components['Component']()
   }

   return {
      ...require('./component'),
      ...components[key]
   }
}

module.exports = {
   get
};
