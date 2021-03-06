
var express 	= require("express"),
	app    		= express(),
 	bodyParser 	= require("body-parser"),
	mongoose	= require("mongoose"),
	passport	= require("passport"),
	LocalStrategy= require("passport-local"),
	Campground  = require("./models/campground"),
	methodOverride = require("method-override"),
	Comment		= require("./models/comment"),
	User		= require("./models/user"),
	flash		= require("connect-flash"),
	seedDB 		= require("./seeds");

var campgroundRoutes = require ("./routes/campgrounds"),
	commentRoutes	 = require ("./routes/comments"),
	indexRoutes		 = require ("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp_v8";
//mongoose.connect("mongodb+srv://saliha:<yelpdatabase>@yelpcamp.m6eoe.mongodb.net/<dbname>?retryWrites=true&w=majority")

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//console.log(__dirname);
//seedDB();


app.use(require("express-session")({
	
	secret :"hello there",
	resave : false,
	saveUninitialized : false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req ,res ,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT,process.env.IP , function(){
	console.log("The YelpCamp Server Has Started");
});