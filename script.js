document.addEventListener('DOMContentLoaded', () => {
    let historyDiv = document.querySelector('.history');
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let history = '';

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            handleButtonClick(button.innerText);
        });
    });

    function handleButtonClick(value) {
        if (value === 'C') {
            clearAll();
        } else if (value === 'DEL') {
            deleteLastChar();
        } else if (value === '=') {
            evaluateExpression();
        } else {
            appendToScreen(value);
        }
    }

    function clearAll() {
        screen.textContent = '';
        history = '';
        updateHistory();
    }

    function deleteLastChar() {
        let currentText = screen.textContent;
        screen.textContent = currentText.slice(0, -1);
    }

    function appendToScreen(value) {
        screen.textContent += value;
    }

    function evaluateExpression() {
        try {
            let expression = screen.textContent;
            let result = eval(expression);

            if (!isFinite(result) || isNaN(result)) {
                throw new Error('Invalid Expression');
            }

            result = parseFloat(result.toFixed(5));

            history = expression + '=' + result;
            screen.textContent = result;
            updateHistory();
        } catch (error) {
            screen.textContent = 'Error';
        }
    }

    function updateHistory() {
        historyDiv.textContent = history;
    }
});
