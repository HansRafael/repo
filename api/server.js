var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var multiparty = require('connect-multiparty');
var objectId = require('mongodb').ObjectId;
var fs = require('fs');
const { title } = require('process');

var app = express();

//body-parser como mild
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());

app.use(function(req, res, next){

    res.setHeader("Access-Control-Allow-Origin","*"); //habilita requisicoes de dominions diferentes
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");  //pre-configurar os métodos que essas origem pode necessitar
    res.setHeader("Access-Control-Allow-Headers","content-type"); 
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

var port = 8080;
app.listen(port);

var db = new mongodb.Db(
    'instagram',
    new mongodb.Server('localhost', 27017, {}),
    {}
);

console.log('server HTTP on in: ' + port);

//URI + verbo HTTP
app.post('/api',function (req, res){
    var dados = req.body;
        db.open(function(err, mongoclient){
            mongoclient.collection('product',function(err, collection){
                collection.insert(dados, function(err, records){
                    if(err){
                        res.json({'status':'erro'});
    
                    } else{
                        res.json({'status':'ready'})
                    }
                    mongoclient.close();
                });
            });  
        });
});

//aqui vamos recuperar todos os documentos/informacoes para reutilzia-las
app.get('/api/allproducts',function (req, res){   
    db.open(function(err, mongoclient){
        mongoclient.collection('product',function(err, collection){
            collection.find().toArray(function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.json(results)
                }
                mongoclient.close()
            });
        });
    });
});

//search by id
app.get('/api/search/id/:id',function (req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('product',function(err, collection){
            collection.find(objectId(req.params.id)).toArray(function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.status(200).json(results)
                }
                mongoclient.close()
            });
        });
    });
});
//search by title
app.get('/api/search/title/:id',function (req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('product',function(err, collection){
            collection.find({title : req.params.id}).toArray(function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.status(200).json(results)
                }
                mongoclient.close()
            });
        });
    });
});
//search by category
app.get('/api/search/category/:id',function (req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('product',function(err, collection){
            collection.find({category : req.params.id}).toArray(function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.status(200).json(results)
                }
                mongoclient.close()
            });
        });
    });
});


app.route('/edit/:id').get((req, res) =>{
    var id = req.params.id

    db.collection('crud').find(ObjectId(id)).toArray((err, result)=>{
        if(err) return res.send(err)
        res.json(results)
    })
})
.post((req, res)=>{
    var id = req.params.id
    var title = req.body.title
    var description = req.body.description
    var price = req.body.price
    var category = req.body.category
    
    db.collection('crud').updateOne({_id: objectId(id)},{
        $set: {
            title : title,
            description: description,
            price : price,
            category: category
        }
    }), (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show')
    }
})


//PUT by ID (update)
app.put('/api/update/:id',function (req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('product',function(err, collection){
            collection.update(
                { _id : objectId(req.params.id) },
                { $set : {
                    description: req.body.description,
                    price : req.body.price,
                    category: req.body.category
                }},
                {},
                function(err, records){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(records);
                    }
                    mongoclient.close()
                }
            );
        });
    });
});

//delete
app.delete('/api/delete/:id', function(req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('product', function(err, collection){
            collection.remove({ _id : objectId(req.params.id)}, function(err, records){
                if(err){
                    res.json(err);

                }else{
                    res.json(records);
                }
                mongoclient.close();
            });
        });
    });
});


