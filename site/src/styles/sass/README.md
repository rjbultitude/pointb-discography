#SASS folder

##Folder Structure

    |-- SASS
    |   |-- _base.scss
    |   |-- utilities/_reset.scss
    |   |-- utilities/_grid.scss
    |   |-- utilities/_mixins.scss
    |   |-- utilities/_utilities.scss
    |   |-- generic/_forms.scss
    |   |-- generic/_typography.scss
    |   |-- templates/_furniture.scss
    |   |-- global.scss


`|   |-- _base.scss` contains variables for colour, fonts and spacing used in the site.

`|   |-- _forms.scss` contains basic form styles. Add all generic form styles here.

`|   |-- _grid.scss` contains the semantic grid used for Responsive web builds.
**needs fixing** to have push and pull classes work with right and left positioning rather than margins.

`|   |-- typography.scss` contains all base-level typographic classes. Amend globally here, change in context as neccessary within your own created imported files.

`|   |-- utilities.scss` contains mixins that are not available in compass that help in construction. They should be generic to any site really.

`|   |-- global.scss` references all the files it needs to compile the screen css.
**This file is only used to import other files**

`|  |-- styles.scss` contains all styles used in the Design Kit should be written here as mixins `@mixin` or extendable `@extend` classes. Use `@mixin` for styles with variable attributes and `@extend` for full class extensions. Examples of how to markup a mixin and extend class are contained in the file.


_______
## Notes

NB: If you want fancy ASCII art headings to divide your content use this (append your text to the end of the URL):
http://www.network-science.de/ascii/ascii.php?x=21&y=10&FONT=univers&RICH=no&FORM=left&STRE=yes&WIDT=800&TEXT=History

NB: All files but global.scss are prefixed with an underscore (eg: `_base.scss`) - this is so that they are not compiled with the `watch` command.

NB: when creating new variables in SASS make sure they are namespaced such that names are hierarchical. For instance `$color-grey-dark` **not** `$color-dark-grey`