<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>iNuLoC | Home</title>
  <meta content="" name="descriptison">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/icofont/icofont.min.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/animate.css/animate.min.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet">
  <link href="assets/vendor/venobox/venobox.css" rel="stylesheet">
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">
</head>

<body>

  <?php require('header.php') ?>

  <!-- ======= Main Section ======= -->
  <section id="main" class="d-flex justify-cntent-center align-items-center">
    <div class="container" id="home">

      <!-- Database introduce -->
      <div class="row text-center">
        <div class="col-md-12">
          <h2 class="animated fadeInDown">Welcome to <span>iNuLoC</span></h2>
          <p class="animated fadeInUp text-des">Many proteins shuttle between the nucleus and the cytoplasm in response to various signals and regulate a broad spectrum of biological processes. This dynamic transport process is mediated by the nuclear location signal (NLS) and nuclear export signal (NES).NLS/NESs have been experimentally determined for fewer than 10% of known nuclear proteins, the majority of proteins do not have known or potential NLS/NES annotation. Here we developed a deep learning-based model to predict the nuclear location proteins, discovered complex biological rules to decipher protein nuclear location potential. Further, we developed <span class="des-webname">iNuLoC</span> to reveal the candidate regions that may be critical for protein nuclear localization.</p>

		  <p class="animated fadeInUp text-des"><span class="des-webname">iNuLoC</span> is a platform developed for understanding potential critical regions that facilitate the protein nuclear location for five model organisms. It provides the prediction results of pNuLoC and integrates several well-known database including <span class="des-toolname">UniProt</span>, <span class="des-toolname">NLSdb</span>, <span class="des-toolname">SeqNLS</span>, <span class="des-toolname">ValidNESs</span> and <span class="des-toolname">NESbase</span> to display known and candidate NLSs/NESs in the proteins, which might provide helpful information for the research of protein nuclear location. In total, the platform contains experimentally determined NLS/NESs for <span class="des-num">1,530</span> proteins through database integration. Using <strong><em>‘Nuclear Location Probability Trajectory Method’</em></strong>, the NLS/NES annotations were extended to <span class="des-num">13,481</span> proteins and the final dataset matched over <span class="des-num">93%</span> of all known nuclear proteins. The platform also contains <span class="des-num">14,585/23,208/27,551</span> predicted nuclear proteins for the proteomes of five model organisms with High/Medium/Low thresholds.</p>
 <p class="animated fadeInUp text-des">The deep learning model to establish <span class="des-webname">iNuLoC</span>, namely <span class="des-webname">pSAM</span> (Prediction of Shuttling-Attacking Mutations), could also be found at <a href='https://github.com/zhengyq1/pSAMmodel/'>GitHub Repository</a> (https://github.com/zhengyq1/pSAMmodel/).</p>
          <br><br>	
        </div>
        <div class="col-md-12">
        	<!-- Simple search -->
	      <form id="simple_search_form" action="result.php" method="post" onSubmit="return check_simple_search_form()">
	        <input type="hidden" name="type" value="search">
	        <div class="row">
	          <div class="col-md-2"></div>
	          <div class="col-md-2">
	            <select class="form-control my-select-tag" id="simple_search_tag0" name="simple_search_tag0">
	              <option value="All">Any Field</option>
	              <option value="uniprot">UniProt ID</option>
	              <option value="gene">Gene Name</option>
	              <option value="protein">Protein Name</option>
	            </select>
	          </div>
	          <div class="col-md-6">
	            <input class="form-control" type="text" placeholder="e.g. TP53" id="simple_search_input0" name="simple_search_input0">
	          </div>
	        </div>
	        <div class="row">
	          <div class="col-md-2"></div>
	          <div class="col-md-2">
				<select class="form-control my-select-org" id="simple_search_org" name="simple_search_org">
					<option value="All">All organisms</option>
					<option value="Human">Human</option>
					<option value="Mouse">Mouse</option>
					<option value="Rat">Rat</option>
					<option value="Yeast">Yeast</option>
					<option value="Fruit fly">Fruit fly</option>
            	</select>
	          </div>
	          <div class="col-md-2">
	            <button type="button" class="form-control btn btn-mine" id="Example">Example</button>
	          </div>
	          <div class="col-md-2">
	            <button type="reset" class="form-control btn btn-mine">Clear</button>
	          </div>
	          <div class="col-md-2">
	            <button type="submit" class="form-control btn btn-mine">Submit</button>
	          </div>
	        </div>
	      </form>
	      <!-- Simple search end -->
	      <br><br>
        </div>
      </div>
      <!-- Database introduce end -->
      <br><br>
	  	<div class="card">
	  		<div class="card-header text-center"><strong>iNuLoC is a comprehensive database</strong></div>
	  		<br>
		    <div class="row no-gutters">
		    	<div class="col-md-4">
			      <img src="assets/img/toollist.png" class="card-img" alt="...">
			    </div>
			    <div class="col-md-8">
			      <div class="card-body">
			        <p class="card-text">
			        	&bull;&nbsp;&nbsp;iNuLoC displays the prediction results of pNuLoC, which contains the probability of protein nuclear location and the potential critical region.<br><br>
			        	&bull;&nbsp;&nbsp;Several  databases with known and potential NLS/NES information were integrated into iNuLoC.<br><br>
			    		&bull;&nbsp;&nbsp;iNuLoC contains all proteins of five model organisms, including Homo sapiens, Rattus norvegicus, Mus musculus, Saccharomyces cerevisiae and Drosophila melanogaster.
			    	</p>
			      </div>
			    </div>
		  	</div>
		  	<br>
		</div>
		<br>
		<div class="card">
			<div class="card-header text-center"><strong>Deep neural network for prediction of protein nuclear location</strong></div>
			<br>
		    <div class="row no-gutters">
		    	<div class="col-md-4">
			      <img src="assets/img/deeplearning.png" class="card-img" alt="...">
			    </div>
			    <div class="col-md-8">
			      <div class="card-body">
			        <p class="card-text">
			        	&bull;&nbsp;&nbsp;The average cross validation AUC (20 times repeats) was 0.982.<br><br>
			        	&bull;&nbsp;&nbsp;CNN-BiLSTM-Attention network structure achieved great performance.<br><br>
			        	&bull;&nbsp;&nbsp;The combination of CNN layers with different convolution modes contributes to better performance.
			        </p>
			      </div>
			    </div>
		  	</div>
		  	<br>
		</div>
		<br>
		<div class="card">
			<div class="card-header text-center"><strong>Nuclear location probability trajectory</strong></div>
			<br>
		    <div class="row no-gutters">
		    	<div class="col-md-4">
			      <img src="assets/img/nulocpro.png" class="card-img" alt="...">
			    </div>
			    <div class="col-md-8">
			      <div class="card-body">
			        <p class="card-text">
			        	&bull;&nbsp;&nbsp;We calculated the nuclear location probability trajectory for each protein.<br><br>
			        	&bull;&nbsp;&nbsp;Based on the NLPT, we highlighted the delta score for each sites to indicate the importance of each sites.		
			    	</p>
			      </div>
			    </div>
		  	</div>
		  	<br>
		</div>
		<br>
		<div class="card">
			<div class="card-header text-center"><strong>Protein sequence and structure properties</strong></div>
			<br>
		    <div class="row no-gutters">
		    	<div class="col-md-4">
			      <img src="assets/img/structure.png" class="card-img" alt="...">
			    </div>
			    <div class="col-md-8">
			      <div class="card-body">
			        <p class="card-text">
			        	&bull;&nbsp;&nbsp;The result page displayed the disorder region, surface accessibility, secondary structure, polar , charge and hydropathy of each query protein.<br><br>
			        	&bull;&nbsp;&nbsp;The potential nuclear location regions of the query sequence are indicated.
			    	</p>
			      </div>
			    </div>
		  	</div>
		  	<br>
		</div>

    </div>
  </section><!-- End Main -->

  <?php require('footer.php') ?>

  <a href="#" class="back-to-top"><i class="ri-arrow-up-line"></i></a>
  <div id="preloader"></div>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/jquery/jquery.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>
  <script src="assets/vendor/venobox/venobox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>
  <script src="assets/js/mine.js"></script>
  <script src="assets/js/index.js"></script>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-8965209-23"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-8965209-23');
	</script>
</body>

</html>
