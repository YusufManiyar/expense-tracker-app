const logout = document.getElementById('logout-button');
logout.addEventListener('click', function(){
    window.location.href = 'logIn.html'
    localStorage.removeItem('userid')
    console.log('Logout clicked');
})

if(localStorage.getItem('userid') !== null){
    console.log(localStorage.getItem('userid'))
    
    document.addEventListener("DOMContentLoaded", function() {
        let totalExpenses = 0
        const expenseForm = document.getElementById('expenseForm');
        const expenseList = document.getElementById('expenseList');
        const totalExpense = document.getElementById('totalExpense');
    
        expenseForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            const description = document.getElementById('description').value;
            const amount = parseFloat(document.getElementById('amount').value);
    
            if (description.trim() && amount) {
                // addExpense(description, amount);
                saveExpense(description, amount);
                document.getElementById('description').value = '';
                document.getElementById('amount').value = '';
                // updateTotalExpense();
            } else {
                alert('Please enter both description and amount.');
            }
        });
    
        function addExpense(expense) {
            const li = document.createElement('li');
            li.id = expense.id
            li.innerHTML = `
                <span>${expense.description}</span>
                <span>&#8377;${expense.amount}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            updateTotalExpense(expense.amount)
            expenseList.appendChild(li);
        }
    
        function saveExpense(description, amount) {
            let user_id = localStorage.getItem('userid')
            transaction = {
                userId: user_id,
                description: description,
                amount: amount
            }
            fetch('http://localhost:4000/expense', {method: 'POST', headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(transaction),
            }).then(resp => resp.json())
            .then(data => addExpense(data))

        }
    
        function loadExpenses() {
            const userid = localStorage.getItem('userid')
            fetch(`http://localhost:4000/expense?userid=${userid}`, {method: 'GET', headers: {
                'Content-Type': 'application/json'
              },
            }).then(resp => resp.json())
            .then(data => data && data.forEach(data => {
                console.log(data)
                addExpense({id: data.id, description: data.description, amount: data.amount});
            }))
        }
    
        loadExpenses();
    
        expenseList.addEventListener('click', function(event) {
            if (event.target.classList.contains('delete-btn')) {
                const item = event.target.parentElement;
                // const description = item.querySelector('span:first-child').textContent;
                const amount = parseFloat(item.querySelector('span:nth-child(2)').textContent.slice(1));
                deleteExpense(item.id);
                item.remove();
                updateTotalExpense(-amount);
            } else if (event.target.classList.contains('edit-btn')) {
                const item = event.target.parentElement;
                const description = item.querySelector('span:first-child').textContent;
                const amount = parseFloat(item.querySelector('span:nth-child(2)').textContent.slice(1));
                document.getElementById('description').value = description;
                document.getElementById('amount').value = amount;
            //     const list = {
            //         userid: userid,
            //         id: item.id,
            //         description: item.description,
            //         amount: item.amount
            //     }
            //     fetch('http://localhost:4000/expense', {method: 'PUT', headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify(list),
            // }).then(resp => console.log(resp.json()))
            updateTotalExpense(-amount);
                item.remove();
            }
        });
    
        function deleteExpense(id) {
            let userid = JSON.parse(localStorage.getItem('userid'));
            const idObj = {
                id: id,
                userid: userid
            }
    
            fetch(`http://localhost:4000/expense`, {method: 'DELETE', headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(idObj),
            })
        }
    
        function updateTotalExpense(amount) {
            totalExpenses = amount + totalExpenses
            totalExpense.textContent = `Total Expense: ₹${totalExpenses.toFixed(2)}`;
        }
    });

}else{
    alert('user not found please logIn.')
    window.location.href = 'login.html'
}
