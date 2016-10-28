# Custom Selector ~directive

This selector emit custom events in every interaction, at the open, select or close.

Also it can get the date as a parameter and setup as initial date from a model.

## Template
### URL: datepicker.html
### Parameters: uid, nclass, source, parent, disabled, data, model

**Code usage**

	<selector uid="unicID" nclass="classes" source="" parent="parent"  model="NgModel" data="Object" disabled="disabled"></selector>

### UID

*type:string* 

If you need a special ID for the element you can add it, if not, the directive create one basic related into the angular $id 

### nClass

*type:string* 

Add an extra class for extend the basic styles

### Source

*type: Object*

The source of the data if you need special source not related to the ngModel

### Parent

*type: String*

The id of the parent to link it with the siblings.
 
### Model

*type: Object*

Pass the ngModel to the to way binding, if has data use as the initial date.

### Disabled

*type: String*

Pass the "disabled" state of the selector to emulate the standard status.

### Data

*type: Object*

Get special data from a service when pass an specific string to get the service.
