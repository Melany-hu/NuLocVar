/**
* Author: Qingfeng Zhang
* Version: 1.0
*/
// Define functions

// index, 判断输入是否为空
function check_simple_search_form()
{
	if($('#simple_search_input0').val()=='')
	{
		alert('Please input your keyword(s), thanks.');
		return false;
	}else{
		var chooseTag = $('#simple_search_tag0').val();
		var inputContent = $('#simple_search_input0').val();
		var chooseOrg = $('#simple_search_org').val();
		var searchInfo = {'tag':chooseTag, 'content':inputContent, 'org': chooseOrg};
		window.localStorage.setItem('searchInfo',JSON.stringify(searchInfo));
	}
}

/*----- Home/Search page search example function -----*/
function changeExampleLink(line,link){
	$('#simple_search_link'+line).find("option").prop("selected",false);
	$('#simple_search_link'+line).find("option[value='"+link+"']").prop("selected",true);
}
function changeExampleTag(line,tag){
	$('#simple_search_tag'+line).find("option").prop("selected",false);
	$('#simple_search_tag'+line).find("option[value='"+tag+"']").prop("selected",true);
}
function changeExampleInput(line,keyword){
	$('#simple_search_input'+line).prop('value',keyword);
}
function changeExampleOrg(org){
	$('#simple_search_org').find("option").prop("selected",false);
	$('#simple_search_org').find("option[value='"+org+"']").prop("selected",true);
}

$(document).ready(function(){
/*----- Set home page search example -----*/
	$('#home #Example').on('click',function(){
		changeExampleTag(0,'gene');
		changeExampleInput(0,'TP53');
		changeExampleOrg('Human')
	})

})
