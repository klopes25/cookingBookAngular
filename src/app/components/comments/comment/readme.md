# **Comment**

*Displays a comment in a stylized bubble. Above this bubble, you can see the date and the login of the author of the comment. Only the author of the comment has access next to this login with two buttons: one to edit the comment, and one to delete it.*

## **inputs**
- **author: user**

*The user who wrote this comment*

- **date: string**

*The date on which the comment was last edited*

- **index: number**

*The index of this comment in the list of comments for this recipe*

- **text: string**

*The comment value*

- **user: user**

*The current user logged*

----------
## **outputs**

- commentToBeDeleted: Date

*This event is returned when the used delete the comment. The date of the selected comment is then sent*

- commentToBeUpdated: {text, index}

*This event is returned when the comment value is changed. The text and the index of the selected comment is sent*

----------
## **Local variables**

- textTransformed: string ("" by default)

*This variable is used to display the highlights corresponding to the query*

- editComment: boolean (false by default)

*This variable is used to toggle edition mode for this comment only*