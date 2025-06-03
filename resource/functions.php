<?php
/**
 * @author Qingfeng Zhang
 * @version 1.0
 **/

/*------ Display enzyme by organism ------*/
function showEnzyme($organism, $enyzme){
	if($organism == "Human"){
		return $enyzme;
	}
	else{
		return substr($enyzme,0,1).strtolower(substr($enyzme,1,strlen($enyzme)-1));
	}
}

/*------ Display sequence window ------*/
function showPep($seqwin){
    return "<span class='couriernew'>".substr($seqwin,8,7)."</span><span class='modAA couriernew'>".substr($seqwin,15,1)."</span><span class='couriernew'>".substr($seqwin,16,7)."</span>";
}

/*------ Display PPI interactions ------*/
function showInteraction($AllInteractions){
	return "<a tabindex='0' href='javascript:void(0)' class='badge badge-success'  data-toggle='popover' data-trigger='hover' data-html=true title='Interaction(s)' data-content=\"".implode(', ', $AllInteractions)."\">".count($AllInteractions)."</a>";
}
/*------ Display PPI result by input enzymes ------*/
function ShowPPITable($PPIInfo, $gene){
	$returnInfo = "<div class='table-scroll-x'><div class='table-scroll-y'><table class='table text-center ppiTable'><thead class='thead-dark'><tr><th>Enzyme</th><th>PPI</th></tr></thead></table></div>
	<div class='table-scroll-y table-body-ppi'><table class='table text-center ppiTable'><thead class='thead-hide'><tr><th></th><th></th></tr></thead><tbody>";
	if($PPIInfo == ''){
		$returnInfo = $returnInfo."<tr><td colspan=2>No PPI information.</td></tr>";
	}
	else{
		$AllPPIs = explode(';', $PPIInfo);
		$enzyme2interaction = array();
		foreach($AllPPIs as $singlePPI){
			$singlePPIInfo = explode(',', $singlePPI);
			if(count($singlePPIInfo)==2){
				$returnInfo = $returnInfo."<tr><td>".$singlePPIInfo[0]."</td><td>".$singlePPIInfo[0]."-".$gene."</td></tr>";
			}
			else{
				if(!array_key_exists($singlePPIInfo[0], $enzyme2interaction)){
					$enzyme2interaction[$singlePPIInfo[0]] = array();
				}
				array_push($enzyme2interaction[$singlePPIInfo[0]], $singlePPIInfo[1]);
			}
		}
		foreach(array_keys($enzyme2interaction) as $enzyme){
			$returnInfo = $returnInfo."<tr><td>".$enzyme."</td><td>".$enzyme."-".showInteraction($enzyme2interaction[$enzyme])."-".$gene."</td></tr>";
		}
	}
	$returnInfo = $returnInfo."</tbody></table></div></div>";
	return $returnInfo;
}

/*------ Do function by type ------*/
if(isset($_POST["type"])){
	$type = $_POST["type"];
	/*------ Input data storage ------*/
	if($type == 'predict'){
	 	$enzymes = array();
		if(isset($_POST["All_HAT"])){
		  	array_push( $enzymes, $_POST["All_HAT"]);
		}
		else{
			if(isset($_POST["CREBBP"])){
			  	array_push( $enzymes, $_POST["CREBBP"]);
			}
			if(isset($_POST["EP300"])){
			  	array_push( $enzymes, $_POST["EP300"]);
			}
			if(isset($_POST["HAT1"])){
			  	array_push( $enzymes, $_POST["HAT1"]);
			}
			if(isset($_POST["KAT2A"])){
			  	array_push( $enzymes, $_POST["KAT2A"]);
			}
			if(isset($_POST["KAT2B"])){
			  	array_push( $enzymes, $_POST["KAT2B"]);
			}
			if(isset($_POST["KAT5"])){
			  	array_push( $enzymes, $_POST["KAT5"]);
			}
			if(isset($_POST["KAT8"])){
			  	array_push( $enzymes, $_POST["KAT8"]);
			}
		}


		if(isset($_POST["All_HDAC"])){
		  	array_push( $enzymes, $_POST["All_HDAC"]);
		}
		else{
			if(isset($_POST["HDAC1"])){
			  	array_push( $enzymes, $_POST["HDAC1"]);
			}
			if(isset($_POST["HDAC2"])){
			  	array_push( $enzymes, $_POST["HDAC2"]);
			}
			if(isset($_POST["HDAC3"])){
			  	array_push( $enzymes, $_POST["HDAC3"]);
			}
			if(isset($_POST["HDAC6"])){
		 	 	array_push( $enzymes, $_POST["HDAC6"]);
			}
			if(isset($_POST["HDACs"])){
			  	array_push( $enzymes, $_POST["HDACs"]);
			}
			if(isset($_POST["SIRT1"])){
			  	array_push( $enzymes, $_POST["SIRT1"]);
			}
			if(isset($_POST["SIRT2"])){
			  	array_push( $enzymes, $_POST["SIRT2"]);
			}
			if(isset($_POST["SIRT3"])){
			  	array_push( $enzymes, $_POST["SIRT3"]);
			}
			if(isset($_POST["SIRT6"])){
			  	array_push( $enzymes, $_POST["SIRT6"]);
			}
			if(isset($_POST["SIRT7"])){
			  	array_push( $enzymes, $_POST["SIRT7"]);
			}
		}

		$enzymes = implode(';', $enzymes);
		$organism = $_POST["organism"];
		$threshold = $_POST["threshold"];
		$fastaInfo = $_POST["id_target"];

		echo "<input id='enzymes' style='display:none' value='".$enzymes."'>";
		echo "<input id='organism' style='display:none' value='".$organism."'>";
		echo "<input id='threshold' style='display:none' value='".$threshold."'>";
		$allFastas = explode('>', $fastaInfo);
		echo "<div class='card-body'>Show prediction result for <select id='fasta'>";
		foreach(array_slice($allFastas, 1) as $singleFasta){
			$singleFastaInfo = explode("\n", $singleFasta);
			$fastaName = str_replace(array("\r\n", "\r", "\n"), "", $singleFastaInfo[0]);
			$fastaSeq = str_replace(array("\r\n", "\r", "\n"), "", implode('',array_slice($singleFastaInfo, 1)));
			echo "<option data-name='".$fastaName."' data-value='".$fastaSeq."'>".$fastaName."</option>";
		}
		echo "</select> :</div>";
	}
	/*------ Predict and return ------*/
	elseif($type == 'predictChange'){
		$enzymes = $_POST["enzymes"];
		$organism = $_POST["organism"];
		$threshold = $_POST["threshold"];
		$fastaName = $_POST["fastaName"];
		$fastaSeq = $_POST["fastaSeq"];

		$filename = tempnam("./tmp", "in");
		$handle = fopen($filename,'w+');
	  	fwrite($handle,'>'.$fastaName."\n".$fastaSeq);
	  	fclose($handle);

	  	chdir('/var/www/html/deeppla/resource/models/py_scripts');
		$exeInfo = "/var/www/html/software/python3/bin/python3 result.py ".$filename." '".$threshold."' '".$enzymes."'";
		exec($exeInfo,$outputRes);
		chdir('/var/www/html/deeppla/resource/');

		// Predict result table
		if(count($outputRes)==0){
			echo "Sorry, there is no HAT/HDAC-specific lysine acetylation site predicted by Deep-PLA!";
		}
		else{
			echo "
					<div class='card-body'><div class='row'><div class='col-md-10'></div><div class='col-md-2'><button type='button' class='form-control btn btn-mine btn-sm' id='download_button'>Download</button></div></div></div>
					<div class='table-scroll-x'><div class='table-scroll-y'><table class='table text-center resultTable'>";
			echo "<thead class='thead-dark'><tr>
					<th width='20%'>ID</th>
					<th class='arrange' width='20%' value='1'>Position<i class='arrow ri-arrow-up-down-fill'></i></th>
					<th class='arrange' width='20%' value='2'>Enzyme<i class='arrow ri-arrow-up-down-fill'></i></th>
					<th class='arrange' width='20%' value='3'>FPR<i class='arrow ri-arrow-up-down-fill'></i></th>
					<th class='arrange' width='20%' value='4'>Peptide<i class='arrow ri-arrow-up-down-fill'></i></th>
				</tr></thead></table></div>";
			echo "<div class='table-scroll-y table-body'><table class='table text-center resultTable' id='show-table'>";
			echo "<thead class='thead-hide'><tr>
					<th width='20%'>ID</th>
					<th width='20%'>Position</th>
					<th width='20%'>Enzyme</th>
					<th width='20%'>FPR</th>
					<th width='20%'>Peptide</th>
				</tr></thead><tbody>";
			foreach($outputRes as $singleRes){
				$singleResInfo = explode("\t",$singleRes);
				$singleResInfo[4] = 100*(float)($singleResInfo[4]);
				echo "<tr>
					<td>".$singleResInfo[0]."</td>
					<td>".$singleResInfo[1]."</td>
					<td>".showEnzyme($organism, $singleResInfo[3])."</td>
					<td>".number_format($singleResInfo[4],2)."%"."</td>
					<td>".showPep($singleResInfo[2])."</td>
				</tr>";
			}
			echo "</tbody></table></div></div>";
		}

		if (file_exists($filename)) {
		    $isDel = unlink($filename);
		}
	}
	elseif($type == 'ppi'){
		$organism = $_POST['organism'];
		$fastaName = $_POST["fastaName"];
		$fastaSeq = $_POST["fastaSeq"];

		$filename = tempnam("./tmp", "in");
		$handle = fopen($filename,'w+');
	  	fwrite($handle,'>'.$fastaName."\n".$fastaSeq);
	  	fclose($handle);
	  	//chmod($filename, 0755);

	  	$exeInfo = '/var/www/html/software/blast-2.2.26/bin/blastall -p blastp -b 500 -v 500 -F F -d /var/www/html/software/blast-2.2.26/blastdb/'.$organism.'.fasta -e 1e-4 -i '.$filename.' -m 8 -a 30 2>&1';
		exec($exeInfo,$outputRes);
		$blastRes = explode("\t",$outputRes[0]);
		$blastPro = explode("|",$blastRes[1])[1];
		$blastGene = explode("|",$blastRes[1])[2];
		$similarity = $blastRes[2];
		//echo "<div class='alert-info'>The blast result of ".$fastaName." is ".$blastPro." (".$blastGene."), Similarity = ".$similarity."%</div>";

		$file= fopen("./ppi_loc/".$organism."_ppi_loc.txt","r");
		$LocInfo = '';
      	while(!feof($file)){
            $line = fgets($file);
            $PPILocInfo = explode("\t",$line);
            if ($PPILocInfo[0] == $blastPro ){
              	$LocInfo = str_replace(array("\r\n", "\r", "\n"), "", $PPILocInfo[3]);
              	$PPIInfo = $PPILocInfo[2];
              	$gene = $PPILocInfo[1];
             	break;
            }
      	}
      	fclose($file);
      	$divInfo = "
      	<p>The blast result of <span class='text-info'>".$fastaName."</span> is <span class='text-danger'>".$blastPro." (".$blastGene.", ".$gene.", Similarity = ".$similarity."%)</span></p>
      	<div class='row'>
      		<div class='col-md-6'>
      			<div class='card'>
	  				<div class='card-header'><h7>PPI network</h7></div>
	  				<div class='card-body'>
	  					<span class='cytoscape-label'><span class='cytoscape-hat'>&nbsp;</span><span class='label-name'>HATs</span></span>
	  					<span class='cytoscape-label'><span class='cytoscape-hdac'>&nbsp;</span><span class='label-name'>HDACs</span></span>
	  					<span class='cytoscape-label'><span class='cytoscape-interaction'>&nbsp;</span><span class='label-name'>Interactions</span></span>
	  					<span class='cytoscape-label'><span class='cytoscape-main'>&nbsp;</span><span class='label-name'>Your protein</span></span>
	  					<div id='cy'></div>
	  				</div>
				</div>
				<br>
      			
      		</div>

			<div class='col-md-6'>
				<div class='card'>
      				<div class='card-header'><h7>PPI information</h7></div>
      				<div class='card-body'>".ShowPPITable($PPIInfo, $gene)."</div>
      			</div>
      			<br>

				<div class='card'>
					<div class='card-header'><h7>Subcellular location</h7></div>
					<div class='card-body'>
	  					<span class='subloc-label'><span class='subloc-enzyme'>&nbsp;</span><span class='label-name'>Enzymes</span></span>
	  					<span class='subloc-label'><span class='subloc-main'>&nbsp;</span><span class='label-name'>Your protein</span></span>
	  					<div id='subloc'>".file_get_contents('./sublocation_animal.php')."</div>
	  				</div>
				</div>
			</div>
		</div>";
		$allPPILocInfo = array("divInfo" => $divInfo, "PPIinfo" => $PPIInfo, "LocInfo" => $LocInfo, "geneName" => $gene);
      	echo json_encode($allPPILocInfo);

      	if (file_exists($filename)) {
		    $isDel = unlink($filename);
		}
	}
	elseif($type == 'structure'){
		$fastaName = $_POST["fastaName"];
		$fastaSeq = $_POST["fastaSeq"];
		$filename = tempnam("./tmp", "in");
		$handle = fopen($filename,'w+');
	  	fwrite($handle,'>'.$fastaName."\n".$fastaSeq);
	  	fclose($handle);
	  	chmod($filename, 0755);

	  	$exeInfo1 = "export IUPred_PATH='/var/www/html/software/iupred/'\n/var/www/html/software/iupred/iupred ".$filename." long";
		exec($exeInfo1,$outputRes1);
		$disorderInfo = array();
		foreach(array_slice($outputRes1, 9) as $line){
			$data = explode("\t", preg_replace("/ +/i","\t",$line));
			array_push($disorderInfo, $data[3]);
		}


		$exeInfo2 = "/var/www/html/software/netsurfp-1.0/netsurfp -i ".$filename." -a";
		exec($exeInfo2,$outputRes2);
		$secondInfo = array();
		$surfaceInfo = array();
		foreach(array_slice($outputRes2, 10) as $line){
			$data = explode("\t", preg_replace("/ +/i","\t",$line));
			if($data[7] > $data[8] & $data[7] > $data[9]){
				$struc = 'A';
			}
			elseif($data[8] > $data[9]){
				$struc = 'B';
			}
			else{
				$struc = 'C';
			}
			array_push($secondInfo, $struc);
			array_push($surfaceInfo, $data[4]);
		}

		$divInfo = "<div id='ptm'></div><div id='disorder'></div><div id='second'></div><div id='surface'></div>";
		$structureInfo = array("divInfo" => $divInfo, "disorderInfo" => $disorderInfo, "secondInfo" => $secondInfo, "surfaceInfo" => $surfaceInfo);
		echo json_encode($structureInfo);

      	if (file_exists($filename)) {
		    $isDel = unlink($filename);
		}
	  
	}
}
?>