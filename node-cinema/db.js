var path = require('path');
var sqlite3 = require('sqlite3').verbose();

function initDb()
{
	return new sqlite3.Database(path.join(__dirname, './db_cinema_ol.db'));
} 

exports.SpGetMoviesImageURL=function(callback)
{
	var sql="SELECT Movie_ImageURL FROM MovieInfo where Movie_Status=1 or Movie_Status=2;";

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
	var sql="SELECT distinct Movie_Name FROM ShowInfo WHERE Show_Date>=date('now') and Movie_Name is not null";

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

