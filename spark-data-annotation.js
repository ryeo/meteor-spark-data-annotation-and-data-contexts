if (Meteor.isClient) {
  Template.list.helpers({
    listDataContext: {
      title: "My List"
    },

    items: [{name: "one"}, {name: "two"}]
  });

  function mergeDataContexts (node) {
    var contexts = {};
    var dataContext;

    while (node) {
      dataContext = Spark.getDataContext(node);
      _.extend(contexts, dataContext || {});
      node = node.parentNode;
    }

    return contexts;
  }

  Template.listItem.events({
    "click": function (e, tmpl) {
      var contexts = mergeDataContexts(e.target);
      console.log("click event", contexts);
    }
  });

  function renderTemplateToBody () {
    document.body.appendChild(Spark.render(Template.list));
  }

  Meteor.startup(renderTemplateToBody);
}

