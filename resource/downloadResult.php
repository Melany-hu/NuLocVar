<?php

#Receive parameters
$tag = $_POST['tag'];
$content = $_POST['content'];
$org = $_POST['org'];

if($tag == 'All'){
	$mainQueryInfo = "uniprot like '%".$content."%' or gene like '%".$content."%' or protein like '%".$content."%'";
}else{
	$mainQueryInfo = $tag." like '%".$content."%'";
}
if($org != 'All'){
	$mainQueryInfo = $mainQueryInfo." and organism = '".$org."'";
}
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


$db = connectDB();
$queryRes = $db->query("select * from prosearch where (".$mainQueryInfo.")");
if(!isset($queryRes->num_rows)){
	$resultsNumber = 0;
}
else{
	$resultsNumber = $queryRes->num_rows;
}

$tmpfname = tempnam("./download", "tmp");
$handle = fopen($tmpfname, "w");

fwrite($handle, "UniProt ID\tGene Name\tOrganism\tpNuLoC Score\tpNuLoC Level\tpNuLoC Region\tSeqNLS Region\tUniProt Region\tNLSdb Region\n");
for($i=0;$i<$resultsNumber;$i++) {
    $row = $queryRes->fetch_assoc();
    fwrite($handle, implode("\t",array($row['primaryacc'],($row['gene'] == ''?'N/A':explode(';',$row['gene'])[0]),$row['organism'],round($row['pprob'],3),$row['prank'],$row['pregion'],$row['sregion'],$row['uregion'],$row['nregion']))."\n");
}

fclose($handle);

$db->close();

$filename = explode("\\",$tmpfname)[count(explode("\\",$tmpfname))-1];
$filename = explode("/",$filename)[count(explode("/",$filename))-1];
chmod($tmpfname, 0755);
echo $filename;;
?>