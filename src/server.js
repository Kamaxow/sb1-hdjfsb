const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Endpoint para obtener datos de un paciente
app.post('/api/paciente', async (req, res) => {
    const { PIN_TIPO_DOC, PIN_DOCUMENTO } = req.body;

    if (!PIN_TIPO_DOC || !PIN_DOCUMENTO) {
        return res.status(400).json({ error: 'Faltan parámetros: PIN_TIPO_DOC y PIN_DOCUMENTO son requeridos.' });
    }

    try {
        const response = await axios.get(`https://servicios.convenioncologicofalp.cl/wsTransversal/api/GetDatosPacientes`, {
            params: {
                PIN_TIPO_DOC,
                PIN_DOCUMENTO
            }
        });

        if (response.data && response.data.Data && response.data.Data.length > 0) {
            res.json(response.data.Data[0]);
        } else {
            res.status(404).json({ message: 'No se encontraron datos para el documento proporcionado.' });
        }
    } catch (error) {
        console.error('Error al obtener datos del paciente:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Ruta para servir el archivo HTML 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html')); 
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});