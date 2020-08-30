var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
	Comment	   = require("./models/comment");

var data = [
	{
		name : "Clouds rest",
		image : "https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-	  1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name : "Glacier's View",
		image : "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
		description : "Glaciers view campground.."
	},
	{
		name : "Tree sides",
		image : "https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
		description : "Treeside view campground.."
	}
];

function seedDB(){
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("Campgrounds removed!");
		
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
			if(err)
				console.log(err);
			else
			{
				console.log("Added a campground");
				Comment.create(
					{
					text : "This is a beautiful campground,would have been better with internet!",
					author : "Homer"
					}
					,function(err,comment){
						if(err)
							console.log(err);
						else
						{
							//console.log(comment);
							campground.comments.push(comment);
							campground.save();
							//console.log(campground);
							console.log("comment added");
						}	
					});
			}	
		});
	});
});
}
					  
module.exports = seedDB;