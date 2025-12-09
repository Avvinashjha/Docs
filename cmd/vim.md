# VIM  Commands

## Linux Editing

- cat /etc/os-release #Display contents of the detailed distribution and version information.
- :q #Exiting Vim
- vim <filename> #Opening a file.
- PRESS i, <INSERT> #Entering Insert mode.
- ESC #Escape Insert mode.
- :q! #Quit without saving changes.
- : #Command mode.
- vim <directory, filename> #Another way of opening a file.
- :w #To save the file.
- :wq #Save changes and quit Vim.
- u #To undo an action.
- Press 0 #To the beginning of the line.
- Press $ #To the end of the line.

##  Modes & Navigation

- x #Deleting a character.
- dd #Deletes an entire line.
- h j k l #h moves the cursor up, j moves the cursor down, k moves the cursor to the left, and l moves the cursor to the right.
- :r #To read a file.
- :r <filename> #To read a file.
- :r <path, filename> #To read a file within the directory.
- :w <filename> #Write to a new filename.
- :! <command> #Output of the command and redirects to Vim. Useful to run commands within Vim.

## Buffers

- :bd #To Close a file.
- :bp #Buffer previous to go to the original file.
- :bn #Buffer next to the other file.
- :e <filename> #Edit a file.
- :enew #Edit a new buffer.

## Linux Editing

- cat /etc/os-release #Display contents of the detailed distribution and version information.
- :q #Exiting Vim
- vim <filename> #Opening a file.
- PRESS i, <INSERT> #Entering Insert mode.
- ESC #Escape Insert mode.
- :q! #Quit without saving changes.
- : #Command mode.
- vim <directory, filename> #Another way of opening a file.
- :w #To save the file.
- :wq #Save changes and quit Vim.
- u #To undo an action.
- Press 0 #To the beginning of the line.
- Press $ #To the end of the line.

##  Modes & Navigation

- x #Deleting a character.
- dd #Deletes an entire line.
- h j k l #h moves the cursor up, j moves the cursor down, k moves the cursor to the left, and l moves the cursor to the right.
- :r #To read a file.
- :r <filename> #To read a file.
- :r <path, filename> #To read a file within the directory.
- :w <filename> #Write to a new filename.
- :! <command> #Output of the command and redirects to Vim. Useful to run commands within Vim.

## Buffers

- :bd #To Close a file.
- :bp #Buffer previous to go to the original file.
- :bn #Buffer next to the other file.
- :e <filename> #Edit a file.
- :enew #Edit a new buffer.

Visual Mode

v #To enter visual mode.
y #To copy text in visual mode.
p #To paste the text.
: sort ui #To alphabetize text.
:%s/<text>/<new text>/g #To find and replace text.Splitting Windows

:split <filename> #To split files 
CTRL + ww #Goes to the bottom file and also moving between files.
:sp <filename> #Abbreviated to split a filename.
:vsplit <filename> #To view a file vertically.
:vs <filename> #Abbreviated to vertical split a filename.
gg #Goes to the beginning of the file.
SHIFT + G #Goes to the end of the file.

Configuration

:set number #Displays line numbers in Vim.
:set nonumber #Disappears line numbers.
vim .vimrc #Opening a hidden file.
"Add line numbers"
set number 
:wq 
vim <filename> #To open the file and eventually the line numbers will be displayed.
vim + <number> <filename> #Begin Vim session on specified line number.
:badd <filename> #To add a buffer.
:vim -o <filename> <filename2> #Opens files in horizontal splits.
vim -O <filename <filename2> #Opens files in vertical splits.
