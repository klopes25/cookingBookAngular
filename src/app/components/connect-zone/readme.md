# **Connect-zone**

This component has two aspects :
- If the user is not logged in, the component is then composed of the login and password fields to be filled in to log in, but also a link to open the account creation form.
- If the user is logged in, it displays the user's avatar, login and links to open help, account settings and logout.

## **inputs**

- **user: User | Null**

*The current user*

----------
## **outputs**

- connected: {login: string, password: string}

*This event is returned when the user wants to log in. The login and the password are then sent*

- createUserOpened: void

*This event is returned when the user want to create an account.*

- helperOpened: void

*This event is returned when the user want to display the helper.*

- unconnected: void

*This event is returned when the user want to log out.*

----------
## **Local variables**

*Nothing*

----------
## **View Child**

- login: input

*Link to the login input*

- password: input

*Link to the password input*