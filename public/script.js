document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const tipoDoc = document.getElementById('tipoDoc').value;
    const numeroDoc = document.getElementById('numeroDoc').value;
    
    try {
        const response = await fetch('/api/paciente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PIN_TIPO_DOC: tipoDoc,
                PIN_DOCUMENTO: numeroDoc
            })
        });

        const resultDiv = document.getElementById('result');
        if (response.ok) {
            const data = await response.json();
            resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            const error = await response.json();
            resultDiv.innerHTML = `<p style="color: red;">Error: ${error.error || error.message}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p style="color: red;">Error de conexión: ${error.message}</p>`;
    }
});