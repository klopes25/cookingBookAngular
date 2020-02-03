# **Comments**

*Displays all comments with comment component*

## **inputs**
- **items: Array**

*The list of comment*

- **user: User**

*The current user*

----------
## **outputs**

- commentToBeDeleted: Date

*This event is returned when the user delete the comment. The date of the selected comment is then sent*

- commentToBeUpdated: {text, index}

*This event is returned when the comment value is changed. The text and the index of the selected comment are sent*

- commentCreated: {text: string, author: user}

*This event is returned when a new comment is cretaed by the current user*

----------
## **Local variables**

- emojiOpen: boolean (false by default)

*This variable is used to show or hide the emojis*

- textContent: string ("" by default)

*This variable is used to create a new comment text*
