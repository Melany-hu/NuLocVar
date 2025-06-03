<?php

#Receive parameters
$uniprot = $_POST['uniprot'];

//获取需要的信息
function getProInfo($uniprot){
	$pro2res = array();
	$file = fopen('./proinfo/'.$uniprot.'.txt','r');
	while(!feof($file)){
		$thisline = fgets($file);
		$thislineInfo = explode("\t",str_replace("\n", "", $thisline));
		if(count($thislineInfo) > 1){
			$pro2res[$thislineInfo[0]] = $thislineInfo[1];
	    }
	}
	fclose($file);
	return $pro2res;
}

#判断任务状态
$status = '';
$info = '';
if(file_exists('./proinfo/'.$uniprot.'.txt')){
	$status = 'found';
	$info = getProInfo($uniprot);
}else{
	$status = "notfound";
}
$returnInfo = array("status"=>$status,'info'=>$info);
echo json_encode($returnInfo);
?>