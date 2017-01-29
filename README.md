# shopping-list
Minimal shopping list app as college course assignment, in javascript with React, React-bootstrap and mobx.

Currently, we only have two types of pages:

- The starting pages shows the list of all list that we have. Here we can add new lists or delete them, and clicking on a list brings us to the list view
- The list view: each list has a list of categories, and each category has a list of entries. By clicking on entries, we can mark or unmark them. We can hide or display editing forms and button with the "Edit" button on the top right. This way if we're going through the list but not modifying it, we're not distracted by those forms, and also don't accidentally delete entries.

There is only static data baked in right now. We can modify it in a session, but it all reset on page reload. The graphical presentation is also minimalist. 

Definitely lots of things to add to or improve; the main goal was merely to have something sensible which is more complex than vanilla TodoMVC and hopefully teaches me basic React & mobx. 
