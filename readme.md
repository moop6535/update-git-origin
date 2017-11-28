Update Git Origin
========================

[![npm](https://img.shields.io/npm/dt/update-git-origin.svg?style=flat-square&label=npm%20downloads)](https://www.npmjs.com/package/update-git-origin)
[![Software License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/techpivot/phalcon-ci-installer/master/LICENSE)


This module was built to replace .git/config origins. Designed to be used in a directory that contains git repos 

i.e. a Projects/ directory like so:
```
Projects/
--myCoolWebsite/.git/config
--anotherProject/.git/config
--dirWithoutGit/
--someOtherProject/.git/config
...etc...
```
Example:
=========

To install:  
`npm i -g update-git-origin`

Traverse to a directory containing repos you'd like to change:  
`cd Projects/`   
`update-git-origin`

Prompt:   
`? Enter Old (Current) Git Origin:` git.example.com   
`? Enter New Git Origin:` git-new.example.com   
   
It will iterate through the directories (1 deep) and update the origins. While it is not often that you change git origins, It made my life easier when changing private hosted git domains so why not.