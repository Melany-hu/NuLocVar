<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>NuLocVar | Detail</title>
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
    <div class="custom-container" id="detail" data-aos="fade-up" data-aos-duration="1300">

      <div class="card">

        <div class="card-header"><h3 class="font-weight-bold">Detailed information</h3></div>
        <div class="card-body" id="pro-message-group">
          <div id='pro-alert'></div>
        </div>

        <div class="card-body" id="result-show">
          <div class="row">

            <div class="col-md-12">
              <span class="sub-title">About protein</span>
              <br><br>

              <table id='proInfoShow' class="table">
                <tbody></tbody>
              </table>
              <hr>
            </div>



            <div class="col-md-12">
              <span class="sub-title">Nuclear localization codes</span>
              <br><br>

              <table id='regionInfoShow' class="table">
                <tbody></tbody>
              </table>
              <hr>
            </div>


            <div class="col-md-12">
              <span class="sub-title">Known subcellular location</span>
              <br><br>

              <!--细胞交互-->
              <template id="sibSwissBioPicsStyle">
              </template>

              <!--侧边栏-->
              <template id="sibSwissBioPicsSlLiItem">
                <li class="subcellular_location" style="display:none">
                <a class="subcell_name" style="display:none"></a>
                <span class="subcell_description" style="display:none"></span>
                </li>
              </template>

              <!--细胞类型-->
              <div class="subcellular-map-container">
                <div class="cell-figure" style="flex: 0 0 auto;">
                  <!-- 这里是细胞图 -->
                </div>
                <div class="cell-location-list" style="margin-left: -50px;">
                  <!-- 这里用JS生成locationNames列表 -->
                </div>
              </div>
      
            </div>


            <div class="col-md-12">
              <span class="sub-title">pNuLoC scores and protein structures</span>
              <br><br>
              <div id="domain" style="height:150px;width:100%"></div>
              <div id="scores" style="height:150px;width:100%"></div>
              <div id="ptminfo" style="height:180px;width:100%;margin-left:15px;margin-right:15px;"></div>
              <div id="disorder" style="height:60px;width:100%"></div>
              <div id="expose" style="height:60px;width:100%"></div>
              <div id="polar" style="height:60px;width:100%"></div>
              <div id="charge" style="height:60px;width:100%"></div>
              <div id="second" style="height:60px;width:100%"></div>
              <div id="surface" style="height:150px;width:100%"></div>
              <div id="hydropathy" style="height:150px;width:100%"></div>
              <hr>
            </div>

            <h3 class="font-weight-bold" style="margin-top:20px; margin-bottom:5px; font-family: sans-serif;color:#9775fa">3D-structure</h3>
                <div id="structure" class="card-body">
                    <div class="mol-container" data-backgroundcolor='0xffffff' id="container-04" class="viewer_3Dmoljs" data-style='stick' data-ui='true'></div>
                    <style>
                    .mol-container {
                    width:    75%;
                    height:   300px;
                    position: relative;
                    margin: 0 auto;
                    }
                    </style>
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
  <script src="https://3Dmol.csb.pitt.edu/build/3Dmol-min.js"></script>
  <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>

  <script type="module" src="node_modules/@swissprot/swissbiopics-visualizer/swissbiopics.js"></script>

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
  <script src="assets/js/detail.js"></script>

  <script>
    $(function() {
    let element = $('#container-04');
    let config = { backgroundColor : 'white' };
    let viewer = $3Dmol.createViewer( element, config );
    let uniprotid = "<?php echo isset($_GET['uniprot']) ? $_GET['uniprot'] : ''; ?>";
    let pdbUri = '/resource/pdb/'+uniprotid+'.pdb';
    //console.log(uniprotid);
    //console.log(pdbUri);
    jQuery.ajax( pdbUri, { 
      success: function(data) {
        let v = viewer;
        v.addModel( data, "pdb" );                       /* load data */
        v.setStyle({}, {cartoon: {color: 'spectrum'}});  /* style all atoms */
        v.zoomTo();                                      /* set camera */
        v.render();                                      /* render scene */
        v.zoom(1.2, 1000);                               /* slight zoom */
      },
      error: function(hdr, status, err) {
        console.error( "Failed to load PDB " + pdbUri + ": " + err );
      },
    });
  });
  </script>
</body>

</html>