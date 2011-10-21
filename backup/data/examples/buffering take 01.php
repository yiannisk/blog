Simple Example for using SQLite for small Buffering Clipboard ;)

<?php

// $Id: SQLiteClipboard.php5,v 1.1 2005/09/09 10:15:26 heinemann Exp $

/**
 * @callgraph
 * @class      SQLiteClipboard
 * @short      Simple Read/Write Clipboard Class
 * @version    0.0.1
 * @since      Fr Sep  9 08:14:45 CEST 2005
 * @code
   $sqlite = new SQLiteClipboard( MY_TEMP_DIR );
   if ( $sqlite->INSERTING = time() )
      var_dump( $sqlite->INSERTING );
   else
      echo "Nothing done!";
 * @endcode
 */

final class SQLiteClipboard
{
   private $SQL;
   private $DB = "Clipboard.sqlite";
   private $TB = "Clipboard";
   private $ID = "ID";
   private $PA = "PARAM";
   private $VA = "VAL";

   function __construct( $path )
   {
      $this->DB = chop( $path . "/" . $this->DB );
      $this->sql_init();
   }

   private function sql_init()
   {
      $this->SQL = new SQLiteDatabase( $this->DB, 0660 );
      if ( ! file_exists( $this->DB ) )
         die( "Permission Denied!" );

      $q = $this->SQL->query("PRAGMA table_info(" . $this->TB . ")");
      if ( $q->numRows() == 0 ) {
         $this->SQL->query( "CREATE TABLE " . $this->TB . " ( " . $this->ID . " INTEGER PRIMARY KEY, " . $this->PA . " CHAR(255), " . $this->VA . " CHAR(255) );" );
      }
   }

   private function sql_check( $p )
   {
      $o = null;
      $q = $this->SQL->query( "SELECT " . $this->ID . " FROM " . $this->TB . " WHERE ( " . $this->PA . "='$p' ) ORDER BY " . $this->ID . " LIMIT 1" );
      while( $q->valid() ) {
         $r = $q->current();
         return $r[$this->ID];
         $q->next();
      }
      return false;
   }

   public function __get( $p )
   {
      $q = $this->SQL->query( "SELECT " . $this->VA . " FROM " . $this->TB . " WHERE ( " . $this->PA . "='$p' ) ORDER BY " . $this->ID );
      while( $q->valid() ) {
            $r = $q->current();
            $o = $r[$this->VA];
            $q->next();
      }
      return $o;
   }

   public function __set( $p, $v )
   {
      if ( $this->sql_check( $p ) && ! empty( $v ) )
         return $this->SQL->query( "UPDATE " . $this->TB . " SET " . $this->VA . "='$v' WHERE ( " . $this->PA . "='$p' );" );
      elseif  ( ! $this->sql_check( $p ) && ! empty( $v ) )
         return $this->SQL->query( "INSERT INTO " . $this->TB . " ( " . $this->PA . ", " . $this->VA . " ) VALUES ('$p', '$v' );" );
      elseif  ( $this->sql_check( $p ) && empty( $v ) )
         return $this->SQL->query( "DELETE FROM " . $this->TB . " WHERE ( " . $this->PA . "='$p' );" );
      else
         return false;
   }

} // end Class

?>