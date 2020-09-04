const express = require('express');

var GuaHomeUrl = 'https://content.guardianapis.com/search?api-key=YourGuardianNewsApiKey&section=(sport|business|technology|politics)&show-blocks=all';
var GuaWorldUrl = 'https://content.guardianapis.com/world?api-key=YourGuardianNewsApiKey&show-blocks=all';
var GuaPoliticsUrl = 'https://content.guardianapis.com/politics?api-key=YourGuardianNewsApiKey&show-blocks=all';
var GuaBusinessUrl = 'https://content.guardianapis.com/business?api-key=YourGuardianNewsApiKey&show-blocks=all';
var GuaTechnologyUrl = 'https://content.guardianapis.com/technology?api-key=YourGuardianNewsApiKey&show-blocks=all';
var GuaSportUrl = 'https://content.guardianapis.com/sport?api-key=YourGuardianNewsApiKey&show-blocks=all';
var NYTHomeUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=YourNewYorkTimesApiKey';
var NYTWorldUrl = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=YourNewYorkTimesApiKey';
var NYTPoliticsUrl = 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=YourNewYorkTimesApiKey';
var NYTBusinessUrl = 'https://api.nytimes.com/svc/topstories/v2/business.json?api-key=YourNewYorkTimesApiKey';
var NYTTechnologyUrl = 'https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=YourNewYorkTimesApiKey';
var NYTSportUrl = 'https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=YourNewYorkTimesApiKey';

const {MongoClient} = require('mongodb');
var uri = "Your MongoDB URL";

//enable cors
var cors = require('cors');
var app = express();
app.use(cors());

const fetch = require('node-fetch');

app.get('/GuaHome', async (req, res) => {
    const fetch_response = await fetch(GuaHomeUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/GuaWorld', async (req, res) => {
    const fetch_response = await fetch(GuaWorldUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/GuaPolitics', async (req, res) => {
    const fetch_response = await fetch(GuaPoliticsUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/GuaBusiness', async (req, res) => {
    const fetch_response = await fetch(GuaBusinessUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/GuaTechnology', async (req, res) => {
    const fetch_response = await fetch(GuaTechnologyUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/GuaSport', async (req, res) => {
    const fetch_response = await fetch(GuaSportUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/NYTHome', async (req, res) => {
    const fetch_response = await fetch(NYTHomeUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/NYTWorld', async (req, res) => {
    const fetch_response = await fetch(NYTWorldUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/NYTPolitics', async (req, res) => {
    const fetch_response = await fetch(NYTPoliticsUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/NYTBusiness', async (req, res) => {
    const fetch_response = await fetch(NYTBusinessUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/NYTTechnology', async (req, res) => {
    const fetch_response = await fetch(NYTTechnologyUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/NYTSport', async (req, res) => {
    const fetch_response = await fetch(NYTSportUrl);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/NYTArticle', async (req, res) => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\"${req.query.url}\")&api-key=YourNewYorkTimesApiKey`;
    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/GuaArticle', async (req, res) => {
    const url = `https://content.guardianapis.com/${req.query.id}?api-key=YourGuardianNewsApiKey&show-blocks=all`;
    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/NYTSearch', async (req, res) => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${req.query.keyword}&api-key=YourNewYorkTimesApiKey&show-blocks=all`;
    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/GuaSearch', async (req, res) => {
    const url = `https://content.guardianapis.com/search?q=${req.query.keyword}&api-key=YourGuardianNewsApiKey&show-blocks=all`;
    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    res.send(json);
});
app.get('/mongodb', async (req, res) => {
    const newsId = req.query.id;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try{
        await client.connect();
        const db = client.db('Your db name');
        const data = await db.collection('Your collection name').findOne({newsId: newsId});
        if(data == null) res.send('{}');
        else res.send(data);
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
});
app.get('/upvote', async (req, res) => {
    const newsId = req.query.id;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try{
        await client.connect();
        const db = client.db('Your db name');
        const data = await db.collection('Your collection name').findOne({newsId: newsId});
        if(data == null){ //not in database
            await db.collection('Your collection name').insertOne(
                {newsId: newsId, upvotes: 1}
            )
        }
        else{
            await db.collection('Your collection name').updateOne({newsId: newsId},
                {'$set': {upvotes: data.upvotes+1,}}
            )
        }
        const updated = await db.collection('Your collection name').findOne({newsId: newsId});
        res.send(updated);
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
});

app.listen(8000, () => console.log('listening on port 8000'));