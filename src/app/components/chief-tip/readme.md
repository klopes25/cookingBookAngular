# **Chief-tip**

*Displays the chief's tip. This can be edited in edit mode*

## **inputs**
- **edition: boolean** (false by default)

*If true, the input appears to change the value of the tip*

- **query: string** ("" by default)

*If the query value is longer than 2 strictly, and we are not in edit mode, the query is highlighted in the tip*

- **tip: string** ("" by default)

*Displays the tip value of the current recipe as a text*

----------
## **outputs**

- chiefTipUpdated: string

*This event is returned when the tip value is changed. The new selected value is sent*

----------
## **Local variables**

- tipDisplayed: string ("" by default)

*this variable is used to display the highlights corresponding to the query*

- tipEdited: string ("" by default)

*This variable is used to bind the tip so that it can be modified only after validation*