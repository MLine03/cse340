<h1>Update Account</h1>

<% if (errors && errors.length > 0) { %>
    <ul class="errors">
        <% errors.forEach(err => { %>
            <li><%= err %></li>
        <% }) %>
    </ul>
<% } %>

<form method="POST" action="/account/update">
    <input type="hidden" name="account_id" value="<%= account.account_id %>">
    <label>First Name:</label>
    <input type="text" name="firstname" value="<%= account.firstname %>" required>
    <label>Last Name:</label>
    <input type="text" name="lastname" value="<%= account.lastname %>" required>
    <label>Email:</label>
    <input type="email" name="email" value="<%= account.email %>" required>
    <input type="submit" value="Update Account">
</form>

<form method="POST" action="/account/update-password">
    <input type="hidden" name="account_id" value="<%= account.account_id %>">
    <label>New Password:</label>
    <input type="password" name="password" placeholder="At least 8 characters" required>
    <input type="submit" value="Change Password">
</form>