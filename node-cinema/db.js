var path = require('path');
var sqlite3 = require('sqlite3').verbose();


function initDb()
{
	return new sqlite3.Database(path.join(__dirname, './db_cinema_ol.db'));
} 

exports.SpGetMoviesImageURL=function(callback)
{
	var sql="SELECT Movie_ImageURL,Movie_Title FROM MovieInfo where Movie_Status=1 or Movie_Status=2;";

	var db=initDb();

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		callback(rows);
		db.close();
	});	
}



exports.FillMovieList=function(callback)
{
	var sql="SELECT distinct Movie_Name FROM ShowInfo WHERE Movie_Name is not null";

	var db=initDb();

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		callback(rows);
		db.close();
	});	
}


exports.GetRunningMovies=function(callback)
{
	var sql=`SELECT
                     Movie_Id
                    ,Movie_ImageURL
                    ,Movie_Status
                    ,Movie_Title
                    ,Movie_ReleaseDate
                    ,Movie_Director
                    ,Movie_Casts
                    ,Movie_Language
                    ,Movie_Industry
                    FROM MovieInfo where Movie_Status=1`;

	var db=initDb();

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		callback(rows);
		db.close();
	});	
}


exports.GetUpCommingMovies=function(callback)
{
	var sql=`SELECT
                     Movie_Id
                    ,Movie_ImageURL
                    ,Movie_Status
                    ,Movie_Title
                    ,Movie_ReleaseDate
                    ,Movie_Director
                    ,Movie_Casts
                    ,Movie_Language
                    ,Movie_Industry
                    FROM MovieInfo where Movie_Status=2`;

	var db=initDb();

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		callback(rows);
		db.close();
	});	
}



exports.FillDateList=function(movie_name,callback)
{
	var sql="SELECT distinct strftime('%d/%m/%Y',Show_Date) as text,strftime('%d/%m/%Y',Show_Date) as value FROM ShowInfo WHERE Show_Date>=date('now') and Movie_Name=?;";

	var db=initDb();

	db.all(sql, [movie_name], (err, rows) => {
		if (err) {
			throw err;
		}
		callback(rows);
		db.close();
	});	

}

exports.FillTimeList=function(movie_name,movie_date,callback)
{
 	var sql="SELECT distinct Show_StartTime as text ,Show_StartTime as value FROM ShowInfo WHERE strftime('%d/%m/%Y',Show_Date)=? and Movie_Name=?;";

	var db=initDb();

	db.all(sql, [movie_date,movie_name], (err, rows) => {
		if (err) {
			throw err;
		}
		callback(rows);
		db.close();
	});	
	
}

exports.SpAddShowInfo=function(post_data,callback)
{
 	var sql=`  INSERT INTO ShowInfo
	 (Show_Date
	 ,Show_StartTime
	 ,Movie_Name
	 ,Hall_No)
	 VALUES
	 ( ?
	 ,?
	 ,?
	 ,?);
	 `;

	var db=initDb();

	db.all(sql, [post_data.datepicker, post_data.ddlTime,post_data.ddlMovie,post_data.ddlHall], (err, rows) => {
		if (err) {
			throw err;
		}
		callback(rows);
		db.close();
	});	
	
}

exports.SpAddNewMovie=function(data,img_url,callback)
{
	var sql1=`
		SELECT ifnull(MAX(Movie_Id),0) as sno FROM MovieInfo;
	`;
	var db=initDb();

	db.get(sql1, [], (err, row) => {
   		
   		var sno=parseInt(row.sno)+1;

   		var sql2=`INSERT INTO MovieInfo (Movie_Id,Movie_ImageURL,
   		Movie_Status,Movie_Title,
        Movie_ReleaseDate,Movie_Director,Movie_Casts,
        Movie_Language,Movie_Industry) 
        VALUES (?,?,?,?,?,?,?,?,?)`;

		db.all(sql2, [""+sno,img_url,data.ddlStatus,data.txtTitle,data.txtReleaseDate
			,data.txtDirector,data.txtCasts,data.ddlLanguage,data.ddlIndustry], (err, rows) => {
			if (err) {
				throw err;
			}
			callback(rows);
			db.close();
		});
	
	});	
}