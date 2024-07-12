document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearListButton = document.getElementById('clearListButton');
    
    // Retrieve items from local storage or initialize an empty array
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Event listener for adding an item
    addItemButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName !== '') {
            addItem(itemName);
            itemInput.value = '';
        }
    });

    // Event listener for marking items as purchased or editing them
    shoppingList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const li = event.target.parentElement;
            if (event.target.classList.contains('edit')) {
                editItem(li);
            } else {
                li.classList.toggle('purchased');
                console.log(`Item marked as purchased: ${li.textContent}`);
                updateLocalStorage();
            }
        }
    });

    // Event listener for clearing the list
    clearListButton.addEventListener('click', () => {
        items = [];
        updateLocalStorage();
        renderList();
        console.log('List cleared');
    });

    // Function to add an item to the list
    function addItem(name) {
        items.push(name);
        console.log(`Item added: ${name}`);
        updateLocalStorage();
        renderList();
    }

    // Function to edit an item
    function editItem(li) {
        const itemName = prompt('Edit item:', li.firstChild.textContent);
        if (itemName !== null && itemName.trim() !== '') {
            items[Array.from(shoppingList.children).indexOf(li)] = itemName.trim();
            console.log(`Item edited: ${itemName.trim()}`);
            updateLocalStorage();
            renderList();
        }
    }

    // Function to update local storage
    function updateLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
        console.log('Local storage updated');
    }

    // Function to render the list
    function renderList() {
        shoppingList.innerHTML = '';
        items.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            const button = document.createElement('button');
            button.textContent = 'Mark as Purchased';
            li.appendChild(button);
            shoppingList.appendChild(li);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit');
            li.appendChild(editButton);
        });
        console.log('List rendered');
    }

    // Initial render of the list
    renderList();
});
