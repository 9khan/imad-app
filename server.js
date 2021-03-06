var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var crypto = require('crypto');
var config = {
    user : 'mohd9khan',
    database : 'mohd9khan',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
function createTemplate(data)
{
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
var htmlTemplate = `
<html>
    <head>
        <title>
          ${title}
        </title>
        <meta name = "viewport" content="width=device-width,initial-scale=1"/> 
  <link href="/ui/style.css" rel="stylesheet" />
    </head>
<body bgcolor=green>
    <div class="container">
    <div>
        <a href="/">home</a>
    </div>
    <div>
        <h2>
            ${heading}
        </h2>
    </div>
    <div>
        ${date.toDateString()}
    </div>
    <div>
    ${content}
    </div>
    </div>
    </body>
</html>
`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/favicon.ico', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));

});
function hash(input,salt)
{
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input',function(req,res)
{
    var hashedString = hash(req.params.input,'this-is-king-khan');
    res.send(hashedString);
});
var pool = new pool(config);
app.get('/test-db',function(req,res)
{
    // making a select request
    // return a request
    pool.query('SELECT * FROM test',function(err,result)
    {
       if(err)
       {
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(JSON.stringify(result));
       }
    });
});
var counter = 0;
app.get('/counter',function (req,res)
{ 
    counter = counter + 1;
   res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var names = [];
app.get('/submit-name',function (req,res)
{
    var name = req.query.name;
    names.push(name);
    // json javascript object
    res.send(JSON.stringify(names));
});
app.get('/articles/:articleName',function(req,res)
{
    //articleName = articel-one
    // article[articleName] = ={} content object
    pool.query("SELECT * FROM article WHERE title = $1" ,[req.params.articleName],function(err,result)
    {
       if(err)
       {
           res.status(500).send(err.toString());
       }else
       {
           if(result.rows.length === 0)
           {
               res.status(404).send('Article not Found');
           }else
           {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
