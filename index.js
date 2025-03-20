document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.center');
    const resultArea = document.getElementById('resultArea');
    
    function updateResult() {
        const codeInput = document.getElementById('codeinput').value;
        const args = [];
        const rows = document.querySelectorAll('#argTable tr');
        rows.forEach((row, rowIndex) => {
            if (rowIndex > 0) { // Skip header row
                const cells = row.querySelectorAll('input');
                const rowArgs = [];
                cells.forEach(cell => {
                    if (cell.value.trim() !== "") {
                        rowArgs.push(cell.value);
                    }
                });
                if (rowArgs.length > 0) {
                    args.push(rowArgs);
                }
            }
        });

        const result = `<!-- begin snippet: js hide: false console: true babel: null babelPresetReact: false babelPresetTS: false -->

<!-- language: lang-html -->

    <script type="vyxal3">
    ${codeInput}
    </script>
    <script>
        args=${JSON.stringify(args)}
    </script>
    <script src="https://themoonisacheese.github.io/snippeterpreter/snippet.js" type="module"/>

<!-- end snippet -->`;
        resultArea.textContent = result;
        resultArea.style.height = 'auto'; // Reset height
        resultArea.style.height = resultArea.scrollHeight + 'px'; // Adjust height to fit contents
    }

    function addNewRow() {
        const table = document.getElementById('argTable');
        const newRow = table.insertRow();
        const rowIndex = table.rows.length - 1;
        const newCell = newRow.insertCell();
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.className = 'argInput';
        newInput.placeholder = `Run ${rowIndex} Arg 0`;
        newInput.addEventListener('input', handleArgInput);
        newCell.appendChild(newInput);
    }

    function handleArgInput(event) {
        const cell = event.target.parentElement;
        const row = cell.parentElement;
        const table = row.parentElement;
        const rowIndex = row.rowIndex;
        const cellIndex = cell.cellIndex;

        if (cellIndex === row.cells.length - 1) {
            // Add new cell to the end of the current row
            const newCell = row.insertCell();
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.className = 'argInput';
            newInput.placeholder = `Run ${rowIndex} Arg ${cellIndex + 1}`;
            newInput.addEventListener('input', handleArgInput);
            newCell.appendChild(newInput);
        }

        if (cellIndex === 0 && rowIndex === table.rows.length - 1) {
            // Add new row with a cell in the first column
            addNewRow();
        }

        updateResult();
    }

    function copyToClipboard() {
        const resultArea = document.getElementById('resultArea');
        navigator.clipboard.writeText(resultArea.value).then(() => {
            console.log('Copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    // Attach event listeners to the code input
    const codeInput = document.getElementById('codeinput');
    codeInput.addEventListener('input', updateResult);

    // Attach event listeners to the initial argument input
    const initialArgInput = document.querySelector('.argInput');
    initialArgInput.placeholder = 'Run 1 Arg 0';
    initialArgInput.addEventListener('input', handleArgInput);

    // Attach event listener to the copy button
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', copyToClipboard);
});
