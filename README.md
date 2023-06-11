# Simple Task List

1 - obtain the code from the 1st "simple login" example at the top here: https://tailwindui.com/components/application-ui/forms/sign-in-forms)
Then implement a simple login screen for this app
Please hardcode these credentials for now: username = "guest", password = "admin"

2 - after authentication, call and render the response from our API.
I will provide the [GET] endpoint after assigning you
A sample response is attached to this post (sample-response.json)
The required UI is attached to this post (sample-UI.png)

3 - The application (UI) logic is:
- if ("due_date" - today's date) is less than 24 hours, show it in the "Due today" column (in red)
- else, if ("due_date" - today's date) is less than 7 days, show it in the "Within a week" column (in yellow)
- else, show it in the "Over a week" column (in green)


Notes:
In the UI,
- "TaskX" should be "task_name"
- "Mr. XXX" should be "assignee"
- include the current date in the top RHS as shown
