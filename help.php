<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>NuLocVar | Help</title>
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

<body data-spy="scroll" data-target="#help-navigation">

  <?php require('header.php') ?>

  <!-- ======= Main Section ======= -->
  <section id="main" class="d-flex justify-cntent-center align-items-center">
    <div class="container" id="help">
      <div class="row">
        <div class="col-md-4">
          <div id="help-navigation" class="card">
            <div class="card-header"><h5 class="font-weight-bold">Navigation</h5></div>
            <nav class="navbar navbar-light">
              <nav class="nav nav-pills flex-column">
                <a class="nav-link" href="#help1">What is iNuLoC</a>
                <a class="nav-link" href="#help2">About predicting performance</a>
                <nav class="nav nav-pills flex-column hidden">
                  <a class="nav-link ml-3 my-1" href="#help2-1">ROC for cross validation and test validation</a>
                  <a class="nav-link ml-3 my-1" href="#help2-2">Threshold selection and performance</a>
                </nav>
                <a class="nav-link" href="#help3">Search & Browse</a>
                <nav class="nav nav-pills flex-column hidden">
                  <a class="nav-link ml-3 my-1" href="#help3-1">Quick Search</a>
                  <a class="nav-link ml-3 my-1" href="#help3-2">Browse</a>
                </nav>
                <a class="nav-link" href="#help4">pNuLoC webserver</a>
                <nav class="nav nav-pills flex-column hidden">
                  <a class="nav-link ml-3 my-1" href="#help4-1">Submit a new task</a>
                  <a class="nav-link ml-3 my-1" href="#help4-2">Query a submitted task</a>
                </nav>
                <a class="nav-link" href="#help5">Output result explanation</a>
                <nav class="nav nav-pills flex-column hidden">
                  <a class="nav-link ml-3 my-1" href="#help5-1">Potential nuclear location probability</a>
                  <a class="nav-link ml-3 my-1" href="#help5-2">Potential nuclear location regions</a>
                  <a class="nav-link ml-3 my-1" href="#help5-3">Sequence and structure properties</a>
                </nav>
              </nav>
            </nav>
          </div>
        </div>

        <div class="col-md-8" id="navigation-body">
          <div class="card">
            <div class="card-header"><h5 class="font-weight-bold" id="help1">What is iNuLoC</h5></div>
            <div class="card-body">
              <p class="card-text text-des">iNuLoC is a platform developed for understanding the nuclear location codes in proteins. We developed a deep learning based model to predict the nuclear location proteins, discovered complex biological rules to decipher protein nuclear location potential. iNuLoC provided the prediction results of pNuLoC and integrated several well-known database including UniProt, NLSdb, SeqNLS, ValidNESs and NESbase to display known and candidate NLSs/NESs in the proteins, which might provide helpful information for the research of protein nuclear location.</p>
            </div>
          </div>
          <br>
          <div class="card">
            <div class="card-header"><h5 class="font-weight-bold" id="help2">About predicting performance</h5></div>
            <div class="card-body">
              <h5 class="card-title text-info" id="help2-1">ROC for cross validation and test validation</h5>
              <img src="./assets/img/help_auc.png" class="card-img-bottom">
            </div>

            <div class="card-body" style="z-index:999">
              <h5 class="card-title text-info" id="help2-2">Threshold selection and performance</h5>
              <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Threshold</th>
                      <th>Score</th>
                      <th>Specificity</th>
                      <th>Sensitivity</th>
                      <th>Precision</th>
                      <th>Recall</th>
                      <th>Accuracy</th>
                      <th>MCC</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>High</td>
                      <td>0.737</td>
                      <td>0.990</td>
                      <td>0.941</td>
                      <td>0.970</td>
                      <td>0.941</td>
                      <td>0.977</td>
                      <td>0.940</td>
                    </tr>
                    <tr>
                      <td>Medium</td>
                      <td>0.476</td>
                      <td>0.950</td>
                      <td>0.975</td>
                      <td>0.872</td>
                      <td>0.975</td>
                      <td>0.957</td>
                      <td>0.893</td>
                    </tr>
                    <tr>
                      <td>Low</td>
                      <td>0.328</td>
                      <td>0.900</td>
                      <td>0.982</td>
                      <td>0.774</td>
                      <td>0.982</td>
                      <td>0.921</td>
                      <td>0.822</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
          <br>
          <div class="card">
            <div class="card-header"><h5 class="font-weight-bold" id="help3">Search & Browse</h5></div>

            <div class="card-body">
              <h5 class="card-title text-info" id="help3-1">Quick Search</h5>
              <p class="card-text">In the home page of iNuLoC, users can specify one field or all the fields to perform a quick search with the keyword(s) in the field(s). Users can simply click example and submit buttons to perform an example search.</p>
              <img src="./assets/img/help_quicksearch.png" class="card-img-bottom">
            </div>

            <div class="card-body">
              <h5 class="card-title text-info" id="help3-2">Browse</h5>
              <p class="card-text">In the Browse page, users can click one term to search the data of specified organism in iNuLoC. Users can click the Detail buttom to display the term of interest.</p>
              <img src="./assets/img/help_browse.png" class="card-img-bottom">
            </div>

          </div>
          <br>
          <div class="card">
            <div class="card-header"><h5 class="font-weight-bold" id="help4">pNuLoC webserver</h5></div>
            <div class="card-body">
              <h5 class="card-title text-info" id="help4-1">Submit a new task</h5>
              <p class="card-text">
                Step1: Paste your FASTA format sequence into the input textarea, or you can click the example button to run the default sequence.<br>
                Step2: If you provide email address, we will send you the task id by email, or you can see your tasks at "All submitted projects".<br>
                Step3: Click Submit.
              </p>
              <img src="./assets/img/help_submittask.png" class="card-img-bottom">
            </div>
            <div class="card-body">
              <h5 class="card-title text-info" id="help4-2">Query a submitted task</h5>
              <p class="card-text">All submitted tasks will be listed below, Users can view the status of a task, or add a task that has already been submitted.</p>
              <img src="./assets/img/help_addtask.png" class="card-img-bottom">
            </div>

          </div>

          <br>
          <div class="card">
            <div class="card-header"><h5 class="font-weight-bold" id="help5">Output result explanation</h5></div>
            <div class="card-body">
              <h5 class="card-title text-info" id="help5-1">Potential nuclear location probability</h5>
              <p class="card-text">This table contains five column, including FASTA title ID, Nuclear location probability, Confidence level, Possible regions.</p>
              <img src="./assets/img/help_prob.png" class="card-img-bottom">
            </div>
            <div class="card-body">
              <h5 class="card-title text-info" id="help5-2">Potential nuclear location regions</h5>
              <p class="card-text">Based on pNuLoC, we calculated the nuclear location probability trajectory score for each site.</p>
              <img src="./assets/img/help_region.png" class="card-img-bottom">
            </div>
            <div class="card-body">
              <h5 class="card-title text-info" id="help5-3">Sequence and structure properties</h5>
              <p class="card-text">The disorder values are calculated by IUPred. The surface accessibility and secondary structure information are predicted by NetSurfP. The polar, charge and hydropathy information were retrived from AAindex.</p>
              <img src="./assets/img/help_structure.png" class="card-img-bottom">
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
  <script type="text/javascript">
    $(document).ready(function(){
      /*----- Help scroll function, display navigation -----*/
      $(window).on('scroll',function(){
        //scroll reaction
        $('#help-navigation .nav-link').each(function(){
          if($(this).hasClass('active')){
              $(this).next('.nav').slideDown();
            }
            else{
              $(this).next('.nav').slideUp();
            }
        })
        //navigation reaction
        if ($(this).scrollTop() > 100) {
          $('#help-navigation').addClass('navigation-fixed');
        } else {
          $('#help-navigation').removeClass('navigation-fixed');
        }
        if ($(this).scrollTop() > $('#help').height()-250) {
          $('#help-navigation').removeClass('navigation-fixed').addClass('navigation-bottom');
        } else {
          $('#help-navigation').removeClass('navigation-bottom');
        }

      })


    })
  </script>
  
</body>

</html>