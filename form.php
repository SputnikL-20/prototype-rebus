<?php
date_default_timezone_set('Asia/Vladivostok');

/**
 *  # MS SQL Server и Sybase через PDO_DBLIB  
 *  # $DBH = new PDO("mssql:host=$host;dbname=$dbname", $user, $pass);  
 *  # $DBH = new PDO("sybase:host=$host;dbname=$dbname", $user, $pass);  
 *
 *  # MySQL через PDO_MYSQL  
 *  # $DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass); 
 *
 *  # SQLite  
 *  # $DBH = new PDO("sqlite:my/database/path/database.db");  
 */

if(!empty($_POST)) {
	$conn = new ExportDataSqlite();
	$conn->connectDataBase();
	$conn->createTable();
	$conn->exportSqlite($_POST);
}

class ExportDataSqlite 
{
    private $link;

    public function connectDataBase()
    { 
        try 
        {  
            $DBH = new PDO('sqlite:DB.sqlite');  
            $DBH->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
            return $this->link = $DBH;
        }  
        catch(PDOException $e) 
        {  
            file_put_contents(log.txt, $e->getMessage(), FILE_APPEND); 
        }       
    }

    public function createTable()
    {
        $table = "CREATE TABLE IF NOT EXISTS comands (
                    person       VARCHAR (128) NULL,
                    forward      VARCHAR (64)  NULL,
                    import_date  DATETIME
                );";
        $this->link->exec($table);
    }

    public function exportSqlite($data = null)
    {
    	$val = $data;

        $sql = $this->link->prepare("INSERT INTO comands ('person', 'forward', 'import_date') VALUES (:person, :forward, :import_date)");
   			
		$person    		 = implode(array_flip($val));
		$forward         = implode($val);
		$import_date     = date("Y-m-d H:i:s");

		$sql->execute(array('person'   		 => $person,
							'forward'        => $forward,
							'import_date'    => $import_date));
    }
}