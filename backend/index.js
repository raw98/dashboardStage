var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());



//connexion
var db = mongoose.connect('mongodb://localhost:27017/stage',  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
function (err, res) {
    try {
        console.log('Connected to Database');
    } catch (err) {
        throw err;
    }
});

app.set('port', process.env.port ||3000);
app.use(bodyparser.json());

//define the shemas
const caSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    annee : Number,
    mois : String,
    chiffre : Number

  },{ collection: 'ca' });

  const personSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    name : String,
    age : Number

  });

   const produitSchema = new mongoose.Schema(
   {
    _id : mongoose.Types.ObjectId,
     prod : String,
    jour : String,
    vente : Number,
    continent :String
   });

   const venteSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    prod : String,
    annee:Number,
    continent : String,
    pourcentage : Number
   });

   const localisationSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    type: String,
    name: String,
    lat : Number,
    lon : Number  
   });

   const dataMapSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    annee:Number,
    name : String,
    code : String,
    vente: Number
   });

   const chiffreSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    type    :String,
    year    :Number,
    chiffre :Number,
    continent:String,
    produit : String
   });
//compiling shemas
const Ca = mongoose.model('Ca', caSchema,"ca");
const Person = mongoose.model("Person",personSchema,"person");
const Produit = mongoose.model("Produit",produitSchema,"produit");
const Vente = mongoose.model("Vente", venteSchema,"vente");
const Localisation = mongoose.model("Localisation",localisationSchema,"localisation");
const DataMap = mongoose.model("DataMap",dataMapSchema,"dataMap");
const Chiffre = mongoose.model("Chiffre",chiffreSchema,"chiffre");
//operations

app.get('/', (req,res) => {
    res.send('hello beautiful');
});

///////////////////////////////////chiffre d'affaires == barchart /////////////////////////////////////
//find all
app.get('/ca', (req,res) => {
    Ca.find({} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});
//find by year
app.get('/ca/:year', (request,res) => {
    var year=request.params.year;
    Ca.find({annee: year } , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});
//find by filter
//continent, region, year, week, day, article, client, fournisseur, magazin
/*app.get('/ca/:continent/ :region/ :year/ :week/ :day/ :article/ :client/ :fournisseur/ :magazin', (request,res) => {
    var continent=request.params.continent;
    var region=request.params.region;   
    var year=request.params.year;
    var week=request.params.week;
    var day=request.params.day;
    var article=request.params.article;
    var client=request.params.client;
    var fournisseur=request.params.fournisseur;
    var magazin=request.params.magazin;
    Ca.find({annee: year } , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});*/
///////////////////////////////////Produit== chart2 /////////////////////////////////////
//find all
app.get('/prod', (req,res) => {
    Produit.find({} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});
//find by year
app.get('/prod:id', (request,res) => {
    var id=request.params.id;
    Produit.find({ prod : "prod"+id} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }
    );
});

///////////////////////////////////Vente== piechart - affichage du pourcentage vente par annee par produit/////////////////////////////////////
//find all
app.get('/vente', (req,res) => {
    Vente.find({} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});
//find by year
app.get('/vente/:prod/:year', (request,res) => {
    var prod=request.params.prod;
    var year=request.params.year;

    Vente.find({ prod : prod , annee : year} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});


///////////////////////////////////Localisation == map - affichage des localisation par type /////////////////////////////////////
//find all
app.get('/map/localisation', (req,res) => {
    Localisation.find({} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});
//find by type
app.get('/map/localisation/:type', (request,res) => {
    var type=request.params.type;


    Localisation.find({ type : type } , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});


///////////////////////////////////dtaMap == les données affichés sur le map /////////////////////////////////////
//find all
app.get('/map/data', (req,res) => {
    DataMap.find({} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});
//find by type
app.get('/map/data/:year', (request,res) => {
    var year=request.params.year;


    DataMap.find({ annee : year } , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});


///////////////////////////////////chiffre == les données statisqtiques globales /////////////////////////////////////
//find all
app.get('/chiffre', (req,res) => {
    Chiffre.find({} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});
//find by type de chiffre
app.get('/chiffre/:type', (request,res) => {
    var type=request.params.type;


    Chiffre.find({ type : type} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});
//find by type de chiffre type de produit
app.get('/chiffre/:type/prod/:prod', (request,res) => {
    var type=request.params.type;
    var prod=request.params.prod;


    Chiffre.find({ type : type , produit : prod} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});

//find by type de chiffre par continent
app.get('/chiffre/:type/:con', (request,res) => {
    var type=request.params.type;
    var con=request.params.con;


    Chiffre.find({ type : type , continent : con} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});
//app listen
app.listen(app.get('port'), function(err, response) {
    console.log("Server is listening on port",app.get('port'));
});