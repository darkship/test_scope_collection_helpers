
function getMyTodo()
{
  var mytodo=todos.findOne()
  if(mytodo)
    _.extend(mytodo,{
      todolist:todolists.findOne(mytodo.todolist_id)

    })
  return mytodo
}
var todolists=new Mongo.Collection("todolists")
todolists.helpers({
  "url":function()
  {
    console.log("todolists",this)
    return Meteor.absoluteUrl()+"/todolist/"+this._id
  }
})


var todos=new Mongo.Collection("todos")
todos.helpers({
  "url":function()
  {
    console.log("todos",this)
    return Meteor.absoluteUrl()+"/todos/"+this._id
  }
})




if (Meteor.isClient) {


  Template.hello.helpers({
    mytodo: function () {
      return getMyTodo()
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
     if(!todolists.find().count())
       {
         var todolist_id=todolists.insert({name:"My todolist"})
         todos.insert({name:"my todo",todolist_id:todolist_id})
       }
  });


  console.log(Handlebars.templates["template"]({mytodo:getMyTodo()}))
}
