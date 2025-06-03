<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>iNuLoC | Result</title>
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
    <div class="container" id="result">

      <div class="card">

        <div class="card-header"><h5 class="font-weight-bold">Prediction result</h5></div>
        <div class="card-body" id='task-alert'></div>
        <div class="card-body" id='get-alert'></div>
        <div class="card-body" id="result-show">
          <div class="row">
            <div class="col-md-12">
              <span class="sub-title">Potential nuclear localization codes</span>
              <br><br>
              <div class="table-responsive">
                <table id='predResShow' class="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Protein ID</th>
                      <th>Nuclear probability</th>
                      <th>Nuclear level</th>
                      <th>Region</th>
                      <th>Region detail</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
              <hr>
            </div>
            <div class="col-md-12">
              <span class="sub-title">pNuLoC scores and protein structures for <span id="choosePro"></span></span>
              <br><br>
              <div id="domain" style="height:150px;width:100%"></div>
              <div id="scores" style="height:150px;width:100%"></div>
              <div id="disorder" style="height:60px;width:100%"></div>
              <div id="expose" style="height:60px;width:100%"></div>
              <div id="polar" style="height:60px;width:100%"></div>
              <div id="charge" style="height:60px;width:100%"></div>
              <div id="second" style="height:60px;width:100%"></div>
              <div id="surface" style="height:150px;width:100%"></div>
              <div id="hydropathy" style="height:150px;width:100%"></div>
            </div> 
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
  <script src="assets/js/action.js"></script>
</body>

</html>