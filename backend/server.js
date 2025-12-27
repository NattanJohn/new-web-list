require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'news.json');

const getArticles = async () => {
    const jsonData = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(jsonData);
};

app.get('/articles', async (req, res) => {
    try {
        const articles = await getArticles();
        const page = Number.parseInt(req.query.page, 10);
        const perPageParam = req.query.per_page ?? req.query.perPage;
        const perPage = Number.parseInt(perPageParam, 10);

        const hasPagination = Number.isFinite(page) || Number.isFinite(perPage);

        if (hasPagination) {
            const safePage = Number.isFinite(page) && page > 0 ? page : 1;
            const safePerPage = Number.isFinite(perPage) && perPage > 0 ? perPage : 10;
            const total = articles.length;
            const start = (safePage - 1) * safePerPage;
            const data = articles.slice(start, start + safePerPage);

            return res.json({
                data,
                meta: {
                    total,
                    page: safePage,
                    perPage: safePerPage,
                    totalPages: Math.max(1, Math.ceil(total / safePerPage)),
                },
            });
        }

        return res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Erro ao ler os dados' } });
    }
});

app.get('/articles/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const articles = await getArticles();
        const article = articles.find(a => a.slug === slug);

        if (!article) {
            return res.status(404).json({ error: { message: 'Notícia não encontrada' } });
        }

        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Erro ao buscar notícia' } });
    }
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    const status = err && err.status ? err.status : 500;
    const message = err && err.message ? err.message : 'Erro interno do servidor';
    res.status(status).json({ error: { message, status } });
});

app.listen(PORT, () => {
    console.log(`🚀 Back-end rodando em http://localhost:${PORT}`);
});