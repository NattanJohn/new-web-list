const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'news.json');

const getArticles = () => {
    const jsonData = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(jsonData);
};

app.get('/articles', (req, res) => {
    try {
        const articles = getArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao ler os dados' });
    }
});

app.get('/articles/:slug', (req, res) => {
    try {
        const { slug } = req.params;
        const articles = getArticles();
        const article = articles.find(a => a.slug === slug);

        if (!article) {
            return res.status(404).json({ message: 'Notícia não encontrada' });
        }

        res.json(article);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar notícia' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Back-end rodando em http://localhost:${PORT}`);
});