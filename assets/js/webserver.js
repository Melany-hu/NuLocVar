/**
* Author: Qingfeng Zhang
* Version: 1.0
*/
// Define functions


//异步提交任务并返回task ID与提交时间
function submitTaskByAJAX(dataType,inputData,inputEmail){
	var formData = new FormData();
	formData.append("dataType",dataType);
	formData.append("inputData",inputData);
	formData.append("inputEmail",inputEmail);
	$.ajax({
        url:'./resource/submitTask.php', /*接口域名地址*/
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success:function(res){
            console.log(res);
            var taskList = JSON.parse(window.localStorage.getItem('taskList'));
            var submitReturn = JSON.parse(res);
            var taskID = submitReturn[0];
            var taskStart = submitReturn[1];
            var taskEnd = submitReturn[2];
            //苹果浏览器，时间戳不一样，-要改成/
            if(window.navigator.userAgent.indexOf('Safari') > -1){
            	taskStart = taskStart.replace(/-/g,'/');
            	taskEnd = taskEnd.replace(/-/g,'/');
            }
            if(taskList){
            	taskList[taskID] = [taskStart,taskEnd];
            }else{
            	taskList = {};
            	taskList[taskID] = [taskStart,taskEnd];
            }
            window.localStorage.setItem('taskList',JSON.stringify(taskList));
        },
        error:function(res){
        	console.log(res);
        }
    })
}

//异步查询任务执行情况，若已完成，则返回任务完成时间
function queryTaskByAJAX(taskIDs){
	var formData = new FormData();
	formData.append("taskIDs",taskIDs.join(','));
	$.ajax({
        url:'./resource/queryTask.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success:function(res){
        	//console.log(res);
            var taskList = JSON.parse(window.localStorage.getItem('taskList'));
            var finishedTasks = JSON.parse(res);
        	for(var taskID in finishedTasks){
        		//苹果浏览器，时间戳不一样，-要改成/
	            if(window.navigator.userAgent.indexOf('Safari') > -1){
	            	finishedTasks[taskID] = finishedTasks[taskID].replace(/-/g,'/');
	            }
        		taskList[taskID][1] = finishedTasks[taskID];
        	}
        	window.localStorage.setItem('taskList',JSON.stringify(taskList));
            
        },
        error:function(res){
        	console.log(res);
        }
    })
}

//对输入的信息进行验证，文件比input中的内容优先级更高
function checkAndSubmit(){
	var inputInfo = $('#id_target').val();
	var inputFile = $('#uploadfile')[0].files;
	var inputEmail = $('#email').val();
	if(inputEmail != ''){
		var apos = inputEmail.indexOf("@");
		var dotpos = inputEmail.lastIndexOf(".");
	    if (apos<1||dotpos-apos<1){
	    	alert('Please input correct email address, thanks.');
		    return false;
		}
	}
	if(inputFile[0]){
		//alert('upload a file!');
		if(inputFile[0].size/1024 > 2048){
			alert('iNuLoC Only accepts file less than 2M!');
		}else{
			submitTaskByAJAX('file',inputFile[0],inputEmail);
			window.location.href = "#submitTask";
		}
	}
	else if(inputInfo != ''){
		//alert('input a fasta!');
		if(inputInfo.split('>').length == 1){
			alert('Please input sequence in FASTA format!');
		}else if(inputInfo.split('>').length > 11){
			alert('iNuLoC Only accepts 10 sequences at a time!');
		}else{
			submitTaskByAJAX('fasta',inputInfo,inputEmail);
			window.location.href = "#submitTask";
		}
	}
	else{
		alert('Please input the peptide(s) in FASTA format!');
	}
	return false;
}


//数字前面补0
function pad(num, n) {
  	var len = num.toString().length;
	while(len < n) {
    	num = "0" + num;
    	len++;
  	}
  	return num;
}

//复制task ID
function copyTask(taskID){
	var transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value = taskID;  // 这里表示想要复制的内容
    //transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    transfer.blur();
    console.log('复制成功');
    document.body.removeChild(transfer);
}

//根据localStorage中的信息展示用户提交的task
function showTasks(){
	var taskList = JSON.parse(window.localStorage.getItem('taskList'));
	var tableInfo = '';
	if(taskList){
		for(var taskID in taskList){
			var taskInfo = taskList[taskID];
			var taskStart = new Date(taskInfo[0]);
			var taskEnd = taskInfo[1];
			//console.log(taskInfo);
			var taskTime = taskStart.getFullYear()+'.'+pad(taskStart.getMonth()+1,2)+'.'+pad(taskStart.getDate(),2)+'-'+pad(taskStart.getHours(),2)+':'+pad(taskStart.getMinutes(),2)+':'+pad(taskStart.getSeconds(),2);
			if(taskEnd == ''){
				taskEnd = new Date();
				var taskDuration =  parseInt((taskEnd - taskStart)/1000);
				var minute = Math.floor(taskDuration/60);
				var second = pad(taskDuration%60,2);
				var taskStatus = "<span class='task-ing'>Predicting</span>";
				var result = "<i class='ri-loader-2-line'></i>";
			}else{
				taskEnd = new Date(taskEnd);
				var taskDuration = parseInt((taskEnd - taskStart)/1000);
				var minute = Math.floor(taskDuration/60);
				var second = pad(taskDuration%60,2);
				var taskStatus = "<span class='task-end'>Finished</span>";
				var result = "<a target='_blank' href='action.php?taskid="+taskID+"'><i class='ri-external-link-fill'></i></a>";
			}
			tableInfo += "<tr><td>"+taskID+"<span title='copy taks ID' class='copy' onclick=\"copyTask('"+taskID+"')\"><i class='ri-file-copy-2-line'></i></span></td><td>"+taskTime+"</td><td><span class='task-time'>"+minute+':'+second+"</span></td><td>"+taskStatus+"</td><td>"+result+"</td></tr>";
		}
	}else{
		tableInfo += "<tr><td colspan=5>There is no task available.</td></tr>";
	}

	$('#taskListShow tbody').html(tableInfo);
}

//判断是否存在未完成的task，如果有则进行异步查询
function queryTasks(){
	var taskList = JSON.parse(window.localStorage.getItem('taskList'));
	var workingTasks = [];
	if(taskList){
		for(var taskID in taskList){
			var taskInfo = taskList[taskID];
			var taskEnd = taskInfo[1];
			if(taskEnd == ''){
				workingTasks.push(taskID);
			}
		}
	}
	if(workingTasks.length > 0){
		queryTaskByAJAX(workingTasks);
	}
}

//异步查询task执行结果，根据相应的返回值判断是否添加task信息到localStorage
function addTaskByAJAX(addTaskID){
	var formData = new FormData();
	formData.append("addTaskID",addTaskID);
	$.ajax({
        url:'./resource/addTask.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success:function(res){
        	//console.log(res);
        	if(res == 'notfound'){
        		$('#query-alert').text('Sorry, the task is not found! Maybe the task ID is wrong or your task is expired.');
        	}else{
        		var taskInfo = JSON.parse(res);
	            var taskList = JSON.parse(window.localStorage.getItem('taskList'));
	            //苹果浏览器，时间戳不一样，-要改成/
	            if(window.navigator.userAgent.indexOf('Safari') > -1){
	            	taskInfo[1] = taskInfo[1].replace(/-/g,'/');
	            	taskInfo[2] = taskInfo[2].replace(/-/g,'/');
	            }
	            if(taskList){
	            	taskList[taskInfo[0]] = [taskInfo[1],taskInfo[2]];
	            }else{
	            	taskList = {};
	            	taskList[taskInfo[0]] = [taskInfo[1],taskInfo[2]];
	            }
	            window.localStorage.setItem('taskList',JSON.stringify(taskList));
	            $('#query-alert').text('The task is successfully found and add to queue.');
            }
        },
        error:function(res){
        	console.log(res);
        }
    })
	
}

//对输入的信息进行验证，根据相应的条件判断是否需要加入任务
function addTask(){
	var addTaskID = $('#addTaskID').val();
	var taskList = JSON.parse(window.localStorage.getItem('taskList'));
	if(addTaskID == ''){
		$('#query-alert').text('Please input a task ID!');
	}else if(taskList){
		if(addTaskID in taskList){
			$('#query-alert').text('The task is alreay in queue!');
		}else{
			addTaskByAJAX(addTaskID);
		}
	}else{
		addTaskByAJAX(addTaskID);
	}
}

$(document).ready(function(){

/*----- check whether the is a taskid in URL -----*/
	var thisUrlInfo = window.location.href.split('?');
	if(thisUrlInfo.length == 2){
		var taskInfo = thisUrlInfo[1].split('=');
		if(taskInfo.length == 2){
			if(taskInfo[0] == 'taskid'){
				addTaskByAJAX(taskInfo[1].split('#')[0]);
			}
		}
	}

/*----- List all available tasks -----*/
	queryTasks();
	showTasks();
	setInterval(queryTasks,1000);
	setInterval(showTasks,1000);

/*----- Web server example -----*/
	$('#webserver #Example').on('click',function(){
		$('#id_target').prop('value','>P53_HUMAN\nMEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNTSSSPQPKKKPLDGEYFTLQIRGRERFEMFRELNEALELKDAQAGKEPGGSRAHSSHLKSKKGQSTSRHKKLMFKTEGPDSD\n>TAF6L_HUMAN\nMSEREERRFVEIPRESVRLMAESTGLELSDEVAALLAEDVCYRLREATQNSSQFMKHTKRRKLTVEDFNRALRWSSVEAVCGYGSQEALPMRPAREGELYFPEDREVNLVELALATNIPKGCAETAVRVHVSYLDGKGNLAPQGSVPSAVSSLTDDLLKYYHQVTRAVLGDDPQLMKVALQDLQTNSKIGALLPYFVYVVSGVKSVSHDLEQLHRLLQVARSLFRNPHLCLGPYVRCLVGSVLYCVLEPLAASINPLNDHWTLRDGAALLLSHIFWTHGDLVSGLYQHILLSLQKILADPVRPLCCHYGAVVGLHALGWKAVERVLYPHLSTYWTNLQAVLDDYSVSNAQVKADGHKVYGAILVAVERLLKMKAQAAEPNRGGPGGRGCRRLDDLPWDSLLFQESSSGGGAEPSFGSGLPLPPGGAGPEDPSLSVTLADIYRELYAFFGDSLATRFGTGQPAPTAPRPPGDKKEPAAAPDSVRKMPQLTASAIVSPHGDESPRGSGGGGPASASGPAASESRPLPRVHRARGAPRQQGPGTGTRDVFQKSRFAPRGAPHFRFIIAGRQAGRRCRGRLFQTAFPAPYGPSPASRYVQKLPMIGRTSRPARRWALSDYSLYLPL\n>SIR4_HUMAN\nMKMSFALTFRSAKGRWIANPSQPCSKASIGLFVPASPPLDPEKVKELQRFITLSKRLLVMTGAGISTESGIPDYRSEKVGLYARTDRRPIQHGDFVRSAPIRQRYWARNFVGWPQFSSHQPNPAHWALSTWEKLGKLYWLVTQNVDALHTKAGSRRLTELHGCMDRVLCLDCGEQTPRGVLQERFQVLNPTWSAEAHGLAPDGDVFLSEEQVRSFQVPTCVQCGGHLKPDVVFFGDTVNPDKVDFVHKRVKEADSLLVVGSSLQVYSGYRFILTAWEKKLPIAILNIGPTRSDDLACLKLNSRCGELLPLIDPC\n>GREM1_HUMAN\nMSRTAYTVGALLLLLGTLLPAAEGKKKGSQGAIPPPDKAQHNDSEQTQSPQQPGSRNRGRGQGRGTAMPGEEVLESSQEALHVTERKYLKRDWCKTQPLKQTIHEEGCNSRTIINRFCYGQCNSFYIPRHIRKEEGSFQSCSFCKPKKFTTMMVTLNCPELQPPTKKKRVTRVKQCRCISIDLD');

	})

})
