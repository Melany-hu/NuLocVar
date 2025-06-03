/**
* Author: Qingfeng Zhang
* Version: 1.0
*/
// Define functions

function showNLSRange(length,range){
  if(range == ''){
    return '<i class="ri-close-fill"></i>';
  }else{
    var proPlant = "<div class='pro-plot'>";
    var rangeInfos = range.split(';');
    for(var i in rangeInfos){
      var rangeInfo = rangeInfos[i].split('...');
      var rangeStart = (parseInt(rangeInfo[0])-1)/parseInt(length)*50;
      var rangeLength = (parseInt(rangeInfo[1])-parseInt(rangeInfo[0]))/parseInt(length)*50;
      proPlant += "<span class='nls-plot' style='left:"+rangeStart+"px;width:"+rangeLength+"px'></span>";
    }
    proPlant += "</div>";
    return proPlant;
  }
}

//展示表格行信息
function showRowInfo(tableLineInfo){
  var returnTableRow = '';
  for(var i in tableLineInfo){
    var thisLineInfo = tableLineInfo[i];
    returnTableRow += "<tr>\
      <td>"+thisLineInfo[0]+"</td>\
      <td>"+thisLineInfo[1]+"</td>\
      <td><i>"+thisLineInfo[3]+"</i></td>\
      <td>"+thisLineInfo[5]+"</td>\
      <td>"+thisLineInfo[6]+"</td>\
      <td>"+showNLSRange(thisLineInfo[4],thisLineInfo[7])+"</td>\
      <td>"+showNLSRange(thisLineInfo[4],thisLineInfo[8])+"</td>\
      <td>"+showNLSRange(thisLineInfo[4],thisLineInfo[9])+"</td>\
      <td>"+showNLSRange(thisLineInfo[4],thisLineInfo[10])+"</td>\
      <td><a target='_blank' href='detail.php?uniprot="+thisLineInfo[0]+"'><i class='ri-external-link-fill'></i></a></td>\
    </tr>";
  }
  return returnTableRow;
}

function showPageInfo(totalNum,rowNumber,nowPage){
  var lineStart = 0;
  if(totalNum > 0){
    var lineStart = (nowPage-1)*rowNumber+1;
  }
  var lineEnd = nowPage*rowNumber;
  if(lineEnd > totalNum){
    lineEnd = totalNum;
  }
  return "Showing "+lineStart+" to "+lineEnd+" of "+totalNum+" entries";
}

function showSingleButton(buttonValue, buttonContain, nowPage, pageNumber){
  if(buttonContain == '<'){
    if(nowPage == 1){
      return "<li class='page-item disabled'><span class='page-link'>"+buttonContain+"</span></li>";
    }else{
      return "<li class='page-item'><a class='page-link' href='javascript:void(0)' value='"+(nowPage-1)+"'>"+buttonContain+"</a></li>";
    }
  }else if(buttonContain == '>'){
    if(nowPage == pageNumber){
      return "<li class='page-item disabled'><span class='page-link'>"+buttonContain+"</span></li>";
    }else{
      return "<li class='page-item'><a class='page-link' href='javascript:void(0)' value='"+(nowPage+1)+"'>"+buttonContain+"</a></li>";
    }
  }else if(buttonContain == '...'){
    return "<li class='page-item disabled'><span class='page-link'>"+buttonContain+"</span></li>";
  }else{
    if(buttonValue == nowPage){
      return "<li class='page-item active'><span class='page-link'>"+buttonContain+"</span></li>";
    }else{
      return "<li class='page-item'><a class='page-link' href='javascript:void(0)' value='"+buttonValue+"'>"+buttonContain+"</a></li>";
    }
  }
}

function showButtonInfo(totalNum,rowNumber,nowPage){
  var pageNumber = Math.ceil(totalNum/rowNumber);
  var retunButtonInfo = '';
  if(pageNumber>1){
    retunButtonInfo = retunButtonInfo+"<nav aria-label='Page navigation' class='float-right'><ul class='pagination'>";
    retunButtonInfo = retunButtonInfo+showSingleButton('', '<', nowPage, pageNumber);
    if(pageNumber<8){
      for(var i=1;i<pageNumber+1;i++){
        retunButtonInfo = retunButtonInfo+showSingleButton(i, i, nowPage, pageNumber);
      }
    }else if(nowPage<5){
      for(var i=1;i<6;i++){
        retunButtonInfo = retunButtonInfo+showSingleButton(i, i, nowPage, pageNumber);
      }
      retunButtonInfo = retunButtonInfo+showSingleButton('', '...', nowPage, pageNumber);
      retunButtonInfo = retunButtonInfo+showSingleButton(pageNumber, pageNumber, nowPage, pageNumber);
    }else if(nowPage>pageNumber-4){
      retunButtonInfo = retunButtonInfo+showSingleButton(1, 1, nowPage, pageNumber);
      retunButtonInfo = retunButtonInfo+showSingleButton('', '...', nowPage, pageNumber);
      for(var i=pageNumber-4;i<pageNumber+1;i++){
        retunButtonInfo = retunButtonInfo+showSingleButton(i, i, nowPage, pageNumber);
      }
    }else{
      retunButtonInfo = retunButtonInfo+showSingleButton(1, 1, nowPage, pageNumber);
      retunButtonInfo = retunButtonInfo+showSingleButton('', '...', nowPage, pageNumber);
      for(var i=nowPage-1;i<nowPage+2;i++){
        retunButtonInfo = retunButtonInfo+showSingleButton(i, i, nowPage, pageNumber);
      }
      retunButtonInfo = retunButtonInfo+showSingleButton('', '...', nowPage, pageNumber);
      retunButtonInfo = retunButtonInfo+showSingleButton(pageNumber, pageNumber, nowPage, pageNumber);
    }
    retunButtonInfo = retunButtonInfo+showSingleButton('', '>', nowPage, pageNumber);
    retunButtonInfo = retunButtonInfo+"</ul></nav>";
  }
    return retunButtonInfo;
}

//展示查询结果
function showTableList(returnInfo,rowNumber,nowPage){
  var totalNum = returnInfo['totalNum'];
  if(totalNum == 0){
    $('#search-result').addClass('alert-danger');
    $('#search-result').html('Sorry, there is no result with your keywords.');
    $('#table-show').css('display','none');
  }else{
    $('#search-result').addClass('alert-success');
    $('#search-result').html('There are '+totalNum+' results with your keywords.');
    $('#searchResShow tbody').html(showRowInfo(returnInfo['tableLineInfo']));
    $('#pageInfo').html(showPageInfo(totalNum,rowNumber,nowPage));
    $('#buttonInfo').html(showButtonInfo(totalNum,rowNumber,nowPage));
  }
}

//异步搜索并返回结果。
function browseResultByAJAX(organism,rowNumber,nowPage,orderInfo){
  var formData = new FormData();
  formData.append('org',organism);
  formData.append('rowNumber',rowNumber);
  formData.append('nowPage',nowPage);
  formData.append('orderInfo',orderInfo);
  $.ajax({
    url:'./resource/browseResult.php',
    type:'post',
    data: formData,
    contentType: false,
    processData: false,
    success:function(res){
      //console.log(res);
      var returnInfo = JSON.parse(res);
      showTableList(returnInfo,rowNumber,nowPage);
    },
    error:function(res){
      console.log(res);
      }
  })
}

$(document).ready(function(){
/*----- Draw -----*/
	var myChart0 = echarts.init(document.getElementById('rawNucleusStat'));
	var option0 = {
    title: {
          text: "Statistics for known nuclear localization proteins",
          show:true,
          top:0,
          left: 70,
          textStyle: {
              color: '#595b5d',
              fontSize:15
          }
      },
      tooltip : {
          trigger: 'axis',
          axisPointer: {
                type: 'shadow'
            },
          textStyle:{align:'left'}                    
      },
      legend:{
        data: ["Nucleus", "NonNucle", "NoLoc"],
        top:50,
          right: 70
      },
      grid: {
          left: 50,
          right: 50,
          bottom: 30,
          top: 80,
          containLabel: false
      },
      xAxis : [
          {
            show:true,
            type : 'category',
            data : ["Human", "Mouse", "Rat", "Yeast", "Fruit fly"]
          }
      ],
      yAxis : [
          {
            show: true,
            type : 'value',
            axisTick: {
            show:true
          },
            axisLine: {
              show:true
            }
          }
      ],
      series : [
        {
          name:"NoLoc",
          type:"bar",
          barWidth: "70%",
          stack: "total",
          xAxisIndex: 0,
          itemStyle: {
            normal: {
              color: "#9e9e9e"
            }
          },
          data: [3596,2448,876,1645,819]
        },
        {
          name:"NonNucle",
          type:"bar",
          barWidth: "70%",
          stack: "total",
          xAxisIndex: 0,
          itemStyle: {
            normal: {
              color: "#03a9f4"
            }
          },
          data: [11059,9724,5177,3302,1766]
        },
        {
          name:"Nucleus",
          type:"bar",
          barWidth: "70%",
          stack: "total",
          xAxisIndex: 0,
          itemStyle: {
            normal: {
              color: "orange"
            }
          },
          data: [5285,4522,1952,1737,929]
        }
      ],
      dataZoom: [
          {
            show: false,
            realtime: true,
            start:0,
            end:100
          },
          {
            type: 'inside',
            realtime: true
          }
      ]
  };
	myChart0.setOption(option0);


	var myChart1 = echarts.init(document.getElementById('NLSNucleusStat'));
	var option1 = {
    title: {
          text: "Statistics for predicted nuclear localization proteins",
          show:true,
          top:0,
          left: 70,
          textStyle: {
              color: '#595b5d',
              fontSize:15
          }
      },
      tooltip : {
          trigger: 'axis',
          axisPointer: {
                type: 'shadow'
            },
          textStyle:{align:'left'}                    
      },
      legend:{
        data: ["High", "Medium", "Low", "NonNucle"],
        top:50,
        right: 70
      },
      grid: {
          left: 50,
          right: 50,
          bottom: 30,
          top: 80,
          containLabel: false
      },
      xAxis : [
          {
            show:true,
            type : 'category',
            data : ["Human", "Mouse", "Rat", "Yeast", "Fruit fly"]
          }
      ],
      yAxis : [
          {
            show: true,
            type : 'value',
            axisTick: {
            show:true
          },
            axisLine: {
              show:true
            }
          }
      ],
      series : [
        {
          name:"NonNucle",
          type:"bar",
          barWidth: "70%",
          stack: "total",
          xAxisIndex: 0,
          itemStyle: {
            normal: {
              color: "#03a9f4"
            }
          },
          data: [9739,8320,4525,3145,1557]
        },
        {
          name:"Low",
          type:"bar",
          barWidth: "70%",
          stack: "total",
          xAxisIndex: 0,
          itemStyle: {
            normal: {
              color: "#cddc39"
            }
          },
          data: [1547,1249,581,699,267]
        },
        {
          name:"Medium",
          type:"bar",
          barWidth: "70%",
          stack: "total",
          xAxisIndex: 0,
          itemStyle: {
            normal: {
              color: "#ffc107"
            }
          },
          data: [3112,2598,1082,1268,563]
        },
        {
          name:"High",
          type:"bar",
          barWidth: "70%",
          stack: "total",
          xAxisIndex: 0,
          itemStyle: {
            normal: {
              color: "#ff5722"
            }
          },
          data: [5542,4527,1817,1572,1127]
        }
      ],
      dataZoom: [
          {
            show: false,
            realtime: true,
            start:0,
            end:100
          },
          {
            type: 'inside',
            realtime: true
          }
      ]
  };
	myChart1.setOption(option1);


	var rowNumber = 10;
  	var nowPage = 1;
  	var orderInfo = '';
  	var selectOrg = 'Human';
  	browseResultByAJAX(selectOrg,rowNumber,nowPage,orderInfo);

	$('#browse-control').on('click','.nav-link',function(){
        //browseChart.clear();
        if(!$(this).hasClass('active')){
            selectOrg = $(this).attr('value');
            //console.log(selectOrg);
            $('#browse-control .nav-link').removeClass('active');
            $(this).addClass('active');
            nowPage = 1;
            browseResultByAJAX(selectOrg,rowNumber,nowPage,orderInfo);
        }
   	})

   	/*----- Table row number change function -----*/
  $('#browse #selectRowNumber').on('change',function(){
    rowNumber = $(this).val();
    nowPage = 1;
    browseResultByAJAX(selectOrg,rowNumber,nowPage,orderInfo);
  })

  /*----- Arrange the table -----*/
  $(document).on('click', '.arrange', function(){
    var changeClass = '';
    if($(this).find('.arrow').hasClass('ri-arrow-up-down-fill') | $(this).find('.arrow').hasClass('ri-sort-asc')){
      changeClass = 'ri-sort-desc';
      var orderSort = 'desc';
    }
    else{
      changeClass = 'ri-sort-asc';
      var orderSort = 'asc';
    }
    $('.arrange').find('.ri-sort-desc').removeClass('ri-sort-desc').addClass('ri-arrow-up-down-fill');
    $('.arrange').find('.ri-sort-asc').removeClass('ri-sort-asc').addClass('ri-arrow-up-down-fill');
    $(this).find('.arrow').removeClass('ri-arrow-up-down-fill').removeClass('ri-sort-desc').removeClass('ri-sort-asc').addClass(changeClass);

    var orderTag = $(this).attr('value');
    orderInfo = orderTag+' '+orderSort;
    browseResultByAJAX(selectOrg,rowNumber,nowPage,orderInfo);
  })

  /*----- Page change function -----*/
  $(document).on('click','#browse .page-item',function(){
    if(!$(this).hasClass("disabled") & !$(this).hasClass("active")){
      nowPage = Number($(this).find("a").first().attr("value"));
      //console.log(nowPage);
      browseResultByAJAX(selectOrg,rowNumber,nowPage,orderInfo);
    }
  })

})
