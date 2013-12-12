#Scripts folder

##Folder Structure
    
    |-- scripts
    |  |-- libs
    |  |  |-- min
    |  |  |  |-- release.min.js
    |  |  |-- modernizr.latest.js
    |  |  |-- selectivizr.js
    |  |-- plugins
    |  |  |-- jquery.validate.js
    |  |  |-- jquery.zone.plugin.0.1.js
    |  |-- app.js
    |  |-- base.js

All javascript files go in here.

`|-- libs` is for all libraries included in the project. 

`|-- plugins` contains all plugins used in the project either built by us or from a third party.

Plugins made by us should contain the .zone name.
eg: `jquery.zone.plugin.0.1.js`

`release.min.js` is the compiled and minified scripts used in the production version of the site.

`app.js` contains all code functions specific to this project that are not better included as a separate plugin file.
*-- please write all functions with variable name and function name. For example*

  define_console_log: function() define_console_log {} 

`base.js` is common to all projects and includes comonly used functions and variables such as: 

* The location of html snippets file (pulled in via AJAX)
* Console log definition (to prevent JS from breaking in lt IE8)
* Placeholder fallback 

And anything else usefull for all of our projects

Plugins we write specific to this project should be stored with the framework prefix (most probably jquery) and the name and if necessary the version.

