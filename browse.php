<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>NuLocVar | Browse</title>
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
    <div class="custom-container" id="browse">

      <div class="card">

        <div class="card-header"><h5 class="font-weight-bold">Browse</h5></div>
        <div class="card-body">
          <span class="sub-title">Data statistics</span>
          <br><br>
          <div class="row">
            <div class="col-md-6" id="rawNucleusStat"></div>
            <div class="col-md-6" id="NLSNucleusStat"></div>
          </div>
          <hr>
        </div>
        <div class="card-body">
          <span class="sub-title">Data browse</span>
            <br><br>
            <div id='browse-control'>
              <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" value="Human" href='javascript:void(0);'>Human</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" value="Mouse" href='javascript:void(0);'>Mouse</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" value="Rat" href='javascript:void(0);'>Rat</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" value="Yeast" href='javascript:void(0);'>Yeast</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" value="Fruit fly" href='javascript:void(0);'>Fruit fly</a>
                </li>
              </ul>
            </div>
        </div>
        
        <div class="card-body" id='table-show'>
          <div class="table-responsive">
            <table id='searchResShow' class="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th class='arrange' value="primaryacc">Uniprot ID<i class='arrow ri-arrow-up-down-fill'></i></th>
                  <th class='arrange' value="gene">Gene Name<i class='arrow ri-arrow-up-down-fill'></i></th>
                  <th class='arrange' value="organism">Organism<i class='arrow ri-arrow-up-down-fill'></i></th>
                  <th class='arrange' value="pprob">P. Score<sup><i class="ri-question-line" data-toggle="popover" data-trigger="hover" title="About P. Score" data-content="P. Score represents the nuclear localization probability predicted by pNuLoC, with a value range of 0 ~ 1."></i></sup><i class='arrow ri-arrow-up-down-fill'></i></th>
                  <th class='arrange' value="prank">P. Level<sup><i class="ri-question-line" data-toggle="popover" data-trigger="hover" title="About P. Level" data-content="P. Level represents the nuclear localization level defined by pNuLoC, including High, Medium, Low and NonNucleus."></i></sup><i class='arrow ri-arrow-up-down-fill'></i></th>
                  <th>P. Region<sup><i class="ri-question-line" data-toggle="popover" data-trigger="hover" title="About P. Region" data-content="P. Region displays the nuclear localization region predicted by pNuLoC, and the red region represents the potential nuclear localization region."></i></sup></th>
                  <th>S. Region<sup><i class="ri-question-line" data-toggle="popover" data-trigger="hover" title="About S. Region" data-content="S. Region displays the nuclear localization region collected from SeqNLS, and the red region represents the nuclear localization region."></i></sup></th>
                  <th>U. Region<sup><i class="ri-question-line" data-toggle="popover" data-trigger="hover" title="About U. Region" data-content="U. Region displays the nuclear localization region collected from UniProt, and the red region represents the nuclear localization region."></i></sup></th>
                  <th>N. Region<sup><i class="ri-question-line" data-toggle="popover" data-trigger="hover" title="About N. Region" data-content="N. Region displays the nuclear localization region collected from NLSdb, and the red region represents the nuclear localization region."></i></sup></th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <hr>
          <div class="row">
            <div class="col-md-6 page-info-container"><span id="pageInfo"></span>, 
              <select id='selectRowNumber'>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </select> entries per page.</div>
            <div class="col-md-6" id="buttonInfo"></div>
          </div>
        </div>

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
  <script src="assets/js/echarts.min.js"></script>
  <script src="assets/js/browse.js"></script>
</body>

</html>