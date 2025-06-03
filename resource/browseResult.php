<?php

#Receive parameters
$org = $_POST['org'];
$rowNumber = $_POST['rowNumber'];
$nowPage = $_POST['nowPage'];
$orderInfo = $_POST['orderInfo'];

/*------ Connnet to database ------*/
function connectDB() {
    @ $db = new mysqli('localhost','cancerbi_web','web4lzx!','cancerbi_inuloc');
    if (!$db) {
        echo ("Can't connect to MySQL Server. Errorcode: %s ". mysqli_connect_error());
        exit;
    }else {
        return $db;
    }
}

function showReturnInfo($qevents){
	$returnRes = array();
	for($i=0;$i<$qevents->num_rows;$i++){
  		$row = $qevents->fetch_assoc();
  		array_push($returnRes,array($row['primaryacc'],($row['gene'] == ''?'N/A':explode(';',$row['gene'])[0]),explode(';',$row['protein'])[0],$row['organism'],$row['seqlength'],round($row['pprob'],3),$row['prank'],$row['pregion'],$row['sregion'],$row['uregion'],$row['nregion']));
    }
    return $returnRes;
}

$db = connectDB();
$queryRes = $db->query("select * from prosearch where organism = '".$org."' order by ".($orderInfo == ''?"gene desc":$orderInfo)." limit ".(($nowPage-1)*$rowNumber).','.$rowNumber);
$queryResAll = $db->query("select count(*) from prosearch where organism = '".$org."'");
if(!isset($queryResAll->num_rows)){
	$queryResNum = 0;
}
else{
	$queryResNum = $queryResAll->fetch_assoc()['count(*)'];
}
if($queryResNum == 0){
	$tableLineInfo = array();
}
else{
	$tableLineInfo = showReturnInfo($queryRes);
}
$db->close();

echo json_encode(array('tableLineInfo'=>$tableLineInfo,'totalNum'=>$queryResNum));
?>