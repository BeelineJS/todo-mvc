# todo-mvc
BeelineJS Todo MVC based on [todomvc.com](https://todomvc.com)

## Using 3 main components and one layout

## TodoHeader 
insert new item and toggle the todo items completion

## TodoItems
List the items

# Todo Fotter
Show the items summary and navigation links

All items are links to one model via the modelKey string.
Updates are all done as a return of the userEvent function.

To run the example type `npm run todo`
This will run the package script: `node build src/components src/layouts && webpack --mode development`

The beelineJs node modules are:
`beelinejs-core` and
`beelinejs-build`
