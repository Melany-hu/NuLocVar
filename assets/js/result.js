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

//展示表格行信息，在showReturn.php的showReturnInfo中看每行的内容
function showRowInfo(tableLineInfo){
  var returnTableRow = '';
  for(var i in tableLineInfo){
    var thisLineInfo = tableLineInfo[i];
    returnTableRow += "<tr>\
      <td><a href='https://www.uniprot.org/uniprotkb/"+thisLineInfo[0]+"' target='_blank'>"+thisLineInfo[0]+"</a></td>\
      <td>"+thisLineInfo[1]+"</td>\
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
    $('#search-alert').removeClass('alert-primary').addClass('alert-danger');
    $('#search-result-count').html('Sorry, there is no result with your keywords.');
    $('#table-show').css('display','none');
  }else{
    let resultText = (totalNum == 1)
      ? 'There is 1 result with your keywords.'
      : 'There are ' + totalNum + ' results with your keywords.';
    $('#search-result-count').html(resultText);
    $('#searchResShow tbody').html(showRowInfo(returnInfo['tableLineInfo']));
    $('#pageInfo').html(showPageInfo(totalNum,rowNumber,nowPage));
    $('#buttonInfo').html(showButtonInfo(totalNum,rowNumber,nowPage));
  }
}


//异步搜索并返回结果。
function searchResultByAJAX(searchInfo,rowNumber,nowPage,orderInfo){
  var formData = new FormData();
  for(var i in searchInfo){
    formData.append(i,searchInfo[i]);
  }
  formData.append('rowNumber',rowNumber);
  formData.append('nowPage',nowPage);
  formData.append('orderInfo',orderInfo);
  $.ajax({
    url:'./resource/searchResult.php',
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

//生成结果文件并返回文件名供下载。
function downloadSearchResultByAJAX(searchInfo){
  var formData = new FormData();
  for(var i in searchInfo){
    formData.append(i,searchInfo[i]);
  }
  $.ajax({
    url:'./resource/downloadResult.php',
    type:'post',
    data: formData,
    contentType: false,
    processData: false,
    success:function(res){
      //console.log(res);
      let alink = document.createElement("a");
      alink.download="iNuLoC.search.res.txt";
      alink.href="./resource/download/"+res;
      alink.click();
    },
    error:function(res){
      console.log(res);
      }
  })
}

$(document).ready(function(){
  var searchInfo = JSON.parse(window.localStorage.getItem('searchInfo'));
  var rowNumber = 10;
  var nowPage = 1;
  var orderInfo = '';
  var tag2name = {'All':'Any field','uniprot':'Uniprot ID','gene':'Gene name','protein':'Protein name'};
  if(searchInfo){
    $('#search-alert').addClass('alert-primary');
    let alertHtml = 'Search content: ' + tag2name[searchInfo['tag']] + ' = ' + searchInfo['content'] + '.&nbsp;<span id="search-result-count"></span>';
    $('#search-alert').html(alertHtml);
    searchResultByAJAX(searchInfo,rowNumber,nowPage,orderInfo);
  }
  else{
    $('#search-alert').addClass('alert-danger');
    $('#search-alert').html('Warning, there is no search content found! Please return to <a href="index.php">Search page</a> and try again.');
  	$('#table-show').css('display','none');
  }

  /*----- Table row number change function -----*/
  $('#result #selectRowNumber').on('change',function(){
    rowNumber = $(this).val();
    nowPage = 1;
    searchResultByAJAX(searchInfo,rowNumber,nowPage,orderInfo);
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
    searchResultByAJAX(searchInfo,rowNumber,nowPage,orderInfo);
  })

  /*----- Page change function -----*/
  $(document).on('click','#result .page-item',function(){
    if(!$(this).hasClass("disabled") & !$(this).hasClass("active")){
      nowPage = Number($(this).find("a").first().attr("value"));
      //console.log(nowPage);
      searchResultByAJAX(searchInfo,rowNumber,nowPage,orderInfo);
    }
  })

  /*----- Download search result function -----*/
  $(document).on('click','#result .ri-download-2-line',function(){
    downloadSearchResultByAJAX(searchInfo);
  })

})