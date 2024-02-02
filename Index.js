// Load saved tasks from cookies when the page loads
window.onload = function () {
    loadTasksFromCookies();
};

// Function to add new tasks
function additems() {
    // Create a new table row
    const create = document.createElement('tr');

    // Append five empty cells to the new row
    for (let i = 1; i <= 5; i++) {
        const tdcreate = document.createElement('td');
        tdcreate.className = 'td' + i;
        create.appendChild(tdcreate);
    }

    // Get the table and append the new row
    const table = document.getElementById('Tasks');
    table.appendChild(create);

    // Set initial values for the new task status cell
    const td1 = create.querySelector('td:nth-child(1)');
    td1.innerHTML = 'Uncompleted';
    td1.style.color = 'Red';
    td1.style.cursor = 'pointer';

    // Handle click events to toggle task status
    td1.onclick = function () {
        // Toggle between Uncompleted, In Progress, and Completed
        // Update the status color accordingly
        if (td1.innerHTML === 'Uncompleted') {
            td1.innerHTML = 'In Progress';
            td1.style.color = 'Orange';
        } else if (td1.innerHTML === 'In Progress') {
            td1.innerHTML = 'Completed';
            td1.style.color = 'Green';
        } else {
            td1.innerHTML = 'Uncompleted';
            td1.style.color = 'Red';
        }
        saveTasksToCookies(); // Save tasks to cookies after status change
    };

    // Set values for other task details from input fields
    const td2 = create.querySelector('td:nth-child(2)');
    td2.innerHTML = document.getElementById('Add_items').value;

    const td3 = create.querySelector('td:nth-child(3)');
    td3.innerHTML = document.getElementById('Date').value;

    // Create an Edit button and handle click event
    const td4 = create.querySelector('td:nth-child(4)');
    const button = document.createElement('button');
    button.innerHTML = 'Edit';
    td4.appendChild(button);
    button.onclick = function () {
        currentlyEditedRow = create;
        // Populate the edit form fields with current task details
        document.getElementById('editAddItems').value = td2.innerHTML;
        document.getElementById('editDate').value = td3.innerHTML;

        // Show the edit form
        document.getElementById('editForm').style.display = 'block';
    };

    // Create a Delete button and handle click event
    const td5 = create.querySelector('td:nth-child(5)');
    const delete_button = document.createElement('button');
    delete_button.innerHTML = 'Delete';
    td5.appendChild(delete_button);
    delete_button.onclick = function () {
        table.removeChild(create);
        saveTasksToCookies(); // Save tasks to cookies after deletion
    };

    // Hide the row if both work and due date are empty
    if (td2.innerHTML === '' && td3.innerHTML === '') {
        create.style.display = 'none';
    }

    // Save tasks to cookies after addition (including the status)
    saveTasksToCookies();
}

// Function to update task details
function updateTask() {
    // Get the updated values from the edit form
    const updatedAddItems = document.getElementById('editAddItems').value;
    const updatedDate = document.getElementById('editDate').value;

    // Update the task details in the currently edited row
    const td2 = currentlyEditedRow.querySelector('td:nth-child(2)');
    const td3 = currentlyEditedRow.querySelector('td:nth-child(3)');
    td2.innerHTML = updatedAddItems;
    td3.innerHTML = updatedDate;

    // Hide the edit form after updating
    document.getElementById('editForm').style.display = 'none';

    // Save tasks to cookies after update
    saveTasksToCookies();
}

// Function to save tasks to cookies
function saveTasksToCookies() {
    const tasks = [];

    // Iterate through each row in the table
    const tableRows = document.querySelectorAll('#Tasks tr:not(:first-child)');
    tableRows.forEach(row => {
        // Extract task details from each row and push to the tasks array
        const task = {
            status: row.querySelector('td:nth-child(1)').innerHTML,
            work: row.querySelector('td:nth-child(2)').innerHTML,
            dueDate: row.querySelector('td:nth-child(3)').innerHTML
        };
        tasks.push(task);
    });

    // Save tasks array as a JSON string in cookies
    document.cookie = `tasks=${JSON.stringify(tasks)}`;
}

// Function to load tasks from cookies
function loadTasksFromCookies() {
    // Retrieve tasks from cookies as a JSON string
    const tasksString = document.cookie.replace(/(?:(?:^|.*;\s*)tasks\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    // Check if tasks exist in cookies
    if (tasksString) {
        // Parse JSON string and iterate through tasks to create table rows
        const tasks = JSON.parse(tasksString);
        tasks.forEach(task => {
            // Create a new table row
            const create = document.createElement('tr');

            // Append five empty cells to the new row
            for (let i = 1; i <= 5; i++) {
                const tdcreate = document.createElement('td');
                tdcreate.className = 'td' + i;
                create.appendChild(tdcreate);
            }

            // Get the table and append the new row
            const table = document.getElementById('Tasks');
            table.appendChild(create);

            // Set values for the task details from loaded data
            const td1 = create.querySelector('td:nth-child(1)');
            td1.innerHTML = task.status;

            // Set color based on task status
            if (td1.innerHTML === 'Uncompleted') {
                td1.style.color = 'red';
            } else if (td1.innerHTML === 'In Progress') {
                td1.style.color = 'Orange';
            } else {
                td1.style.color = 'Green';
            }

            // Set cursor and handle click event to toggle task status
            td1.style.cursor = 'pointer';
            td1.onclick = function () {
                // Toggle between Uncompleted, In Progress, and Completed
                // Update the status color accordingly
                if (td1.innerHTML === 'Uncompleted') {
                    td1.innerHTML = 'In Progress';
                    td1.style.color = 'Orange';
                } else if (td1.innerHTML === 'In Progress') {
                    td1.innerHTML = 'Completed';
                    td1.style.color = 'Green';
                } else {
                    td1.innerHTML = 'Uncompleted';
                    td1.style.color = 'Red';
                }
                saveTasksToCookies(); // Save tasks to cookies after status change
            };

            // Set values for other task details
            const td2 = create.querySelector('td:nth-child(2)');
            td2.innerHTML = task.work;

            const td3 = create.querySelector('td:nth-child(3)');
            td3.innerHTML = task.dueDate;

            // Create an Edit button and handle click event
            const td4 = create.querySelector('td:nth-child(4)');
            const button = document.createElement('button');
            button.innerHTML = 'Edit';
            td4.appendChild(button);
            button.onclick = function () {
                currentlyEditedRow = create;
                // Populate the edit form fields with current task details
                document.getElementById('editAddItems').value = td2.innerHTML;
                document.getElementById('editDate').value = td3.innerHTML;

                // Show the edit form
                document.getElementById('editForm').style.display = 'block';
            };

            // Create a Delete button and handle click event
            const td5 = create.querySelector('td:nth-child(5)');
            const delete_button = document.createElement('button');
            delete_button.innerHTML = 'Delete';
            td5.appendChild(delete_button);
            delete_button.onclick = function () {
                table.removeChild(create);
                saveTasksToCookies(); // Save tasks to cookies after deletion
            };

            // Hide the row if both work and due date are empty
            if (td2.innerHTML === '' && td3.innerHTML === '') {
                create.style.display = 'none';
            }
        });
    }
}
