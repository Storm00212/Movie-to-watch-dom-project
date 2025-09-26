document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector("#movie-list ul");
    const forms = document.forms;

    // deleting or editing movies.
    list.addEventListener("click", function (e) {
        if (e.target.className === 'delete') {
            const li = e.target.parentElement;
            li.parentNode.removeChild(li);
        }

        if (e.target.className === 'edit') {
            const li = e.target.parentElement;
            const nameSpan = li.querySelector('.name');
            const currentName = nameSpan.textContent;

            // create input box
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentName;
            input.classList.add('edit-input');

            // replace span with input
            li.replaceChild(input, nameSpan);
            input.focus();

            // save on Enter or blur
            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    saveEdit(li, input);
                }
            });
            input.addEventListener('blur', () => {
                saveEdit(li, input);
            });
        }
    });

    function saveEdit(li, input) {
        const newName = input.value.trim();
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('name');
        nameSpan.textContent = newName || "Untitled Movie";

        li.replaceChild(nameSpan, input);
    }

    // add movie
    const addMovieForm = forms['add-movie'];
    addMovieForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const value = addMovieForm.querySelector('input[type="text"]').value;

        if (!value) {
            alert("Please enter a movie name!");
            return;
        }

        const li = document.createElement('li');
        const movieName = document.createElement('span');
        const editBtn = document.createElement('span');
        const deleteBtn = document.createElement('span');

        movieName.textContent = value;
        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';

        movieName.classList.add('name');
        editBtn.classList.add('edit');
        deleteBtn.classList.add('delete');

        li.appendChild(movieName);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);

        addMovieForm.reset();
    });
});
