// Sample data for demonstration (this would typically come from the Excel sheet)
let data = [
    { A: 1, B: null, C: 3 },
    { A: 4, B: 5, C: null },
    { A: null, B: null, C: 8 },
    { A: 9, B: 10, C: 11 },
];

// When the user submits the number of columns
document.getElementById('submit-column-count').addEventListener('click', () => {
    const columnCount = parseInt(document.getElementById('column-count').value);
    if (!columnCount || columnCount < 1) {
        alert("Please enter a valid number of columns.");
        return;
    }

    // Show the column selection panel
    document.getElementById('column-selection').style.display = 'block';

    // Generate available columns
    const availableColumnsDiv = document.getElementById('available-columns');
    availableColumnsDiv.innerHTML = '';

    // Sample column names for selection (A, B, C)
    const columnNames = ['A', 'B', 'C'];
    
    // Show checkbox for available columns
    columnNames.forEach((col) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = col;
        checkbox.id = `col-${col}`;
        
        const label = document.createElement('label');
        label.htmlFor = `col-${col}`;
        label.innerText = col;

        availableColumnsDiv.appendChild(checkbox);
        availableColumnsDiv.appendChild(label);
        availableColumnsDiv.appendChild(document.createElement('br'));
    });
});

// When the user processes the selected columns
document.getElementById('process-columns').addEventListener('click', () => {
    const selectedColumns = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    if (selectedColumns.length === 0) {
        alert("Please select at least one column.");
        return;
    }

    // Show the null check options
    document.getElementById('null-check-panel').style.display = 'block';

    const nullOptionsDiv = document.getElementById('null-options');
    nullOptionsDiv.innerHTML = ''; // Clear previous options

    selectedColumns.forEach((col) => {
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `
            <span>Check for Null/Not Null in Column ${col}:</span>
            <input type="radio" name="null-check-${col}" value="null"> Null
            <input type="radio" name="null-check-${col}" value="not-null"> Not Null
        `;
        nullOptionsDiv.appendChild(optionDiv);
    });
});

// When the user checks for null values
document.getElementById('check-null').addEventListener('click', () => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    const selectedColumns = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    
    selectedColumns.forEach((col) => {
        const selectedOption = document.querySelector(`input[name="null-check-${col}"]:checked`);
        
        if (!selectedOption) {
            alert(`Please select an option for column ${col}.`);
            return;
        }
        
        const checkType = selectedOption.value;
        const colData = data.map(row => row[col]).filter(item => item !== undefined);

        let result;
        if (checkType === 'null') {
            result = colData.filter(item => item === null);
        } else {
            result = colData.filter(item => item !== null);
        }

        resultsDiv.innerHTML += `<p>Column ${col}: ${checkType} values count: ${result.length}</p>`;
    });
});
