<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>NuLocVar | Home</title>
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
          <h2 class="animated fadeInDown">Welcome to <span>NuLocVar</span></h2>

		  <p class="animated fadeInUp text-des"><span class="des-webname">NuLocVar</span> is a platform developed for understanding potential critical regions that facilitate the protein nuclear location for five model organisms. It provides the prediction results of pNuLoC and integrates several well-known database including <span class="des-toolname">UniProt</span>, <span class="des-toolname">NLSdb</span>, <span class="des-toolname">SeqNLS</span>, <span class="des-toolname">ValidNESs</span> and <span class="des-toolname">NESbase</span> to display known and candidate NLSs/NESs in the proteins, which might provide helpful information for the research of protein nuclear location. In total, the platform contains experimentally determined NLS/NESs for <span class="des-num">1,530</span> proteins through database integration. Using <strong><em>‘Nuclear Location Probability Trajectory Method’</em></strong>, the NLS/NES annotations were extended to <span class="des-num">13,481</span> proteins and the final dataset matched over <span class="des-num">93%</span> of all known nuclear proteins. The platform also contains <span class="des-num">14,585/23,208/27,551</span> predicted nuclear proteins for the proteomes of five model organisms with High/Medium/Low thresholds.</p>

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
