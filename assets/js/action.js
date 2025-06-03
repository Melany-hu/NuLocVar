/**
* Author: Qingfeng Zhang
* Version: 1.0
*/
// Define functions

var predRes;

//protein structure show 
function listLength(sequence){
  listSequence = [];
  for(var i=0;i<sequence.length;i++){
    listSequence.push(i+1);
  }
  return listSequence;
}

function showDomain(sequence,domian){
	var domains = domian.split(';');
	var domainSite = [];
	for(var i in domains){
		var singleDomain = domains[i];
		var singleDomainInfo = singleDomain.split('...');
		for(var j=parseInt(singleDomainInfo[0])-1;j<parseInt(singleDomainInfo[1]);j++){
			domainSite.push(j);
		}
	}
	var domainDrawInfo = [];
	var otherDrawInfo = [];
	for(var i=0;i<sequence.length;i++){
		if(domainSite.indexOf(i) > -1){
			domainDrawInfo.push(1);
			otherDrawInfo.push(0);
		}else{
			domainDrawInfo.push(0);
			otherDrawInfo.push(1);
		}
	}
  	return [domainDrawInfo,otherDrawInfo];
}

function showDisorder(sequence,disorder){
 	var singleDisorders = disorder.split(',');
 	var singleDisordersD = [];
	var singleDisordersO = [];
  	for(var j=0;j<sequence.length;j++){
	    var residue = sequence[j]+(j+1);
	    var score = parseFloat(singleDisorders[j]);
	    if(score > 0.5){
	     	singleDisordersD.push(1);
	      	singleDisordersO.push(0);
	    }
	    else{
	      	singleDisordersD.push(0);
	      	singleDisordersO.push(1);
	    }
  	}
  	return [singleDisordersD,singleDisordersO];
}

function showExpose(sequence,expose){
	var singleEBs = expose.split(',');
	var singleEBE = [];
	var singleEBB = [];
	for(var i=0;i<sequence.length;i++){
		var residue = sequence[i]+(i+1);
		var score = parseInt(singleEBs[i]);
		if(score == 1){
			singleEBE.push(1);
			singleEBB.push(0);
		}else{
			singleEBE.push(0);
			singleEBB.push(1);
		}
	}
	return [singleEBE,singleEBB];
}

function showPolar(sequence,polar){
	var singlePolars = polar.split(',');
	var singlePolarP = [];
	var singlePolarN = [];
	for(var i=0;i<sequence.length;i++){
		var residue = sequence[i]+(i+1);
		var score = parseInt(singlePolars[i]);
		if(score == 1){
	  		singlePolarP.push(1);
	  		singlePolarN.push(0);
		}else{
	  		singlePolarP.push(0);
	  		singlePolarN.push(1);
		}
	}
	return [singlePolarP,singlePolarN];
}

function showCharge(sequence,charge){
	singleCharges = charge.split(',');
	singleChargeP = [];
	singleChargeN = [];
	singleChargeU = [];
	for(var i=0;i<sequence.length;i++){
		var residue = sequence[i]+(i+1);
		var score = parseInt(singleCharges[i]);
		if(score == 1){
		  	singleChargeP.push(1);
		  	singleChargeN.push(0);
		  	singleChargeU.push(0);
		}else if(score == -1){
		  	singleChargeP.push(0);
		  	singleChargeN.push(1);
		  	singleChargeU.push(0);
		}else{
		  	singleChargeP.push(0);
		  	singleChargeN.push(0);
		  	singleChargeU.push(1);
		}
	}
	return [singleChargeP,singleChargeN,singleChargeU];
}

function showSecond(sequence,second){
	singleStructures = second.split(',');
	var singleStructuresA = [];
	var singleStructuresB = [];
	var singleStructuresC = [];
	for(var i=0;i<sequence.length;i++){
		var residue = sequence[i]+(i+1);
		var struc = singleStructures[i];
		if(struc == 'A'){
		  	singleStructuresA.push(1);
		  	singleStructuresB.push(0);
		  	singleStructuresC.push(0);
		}else if(struc == 'B'){
		  	singleStructuresA.push(0);
		  	singleStructuresB.push(1);
		  	singleStructuresC.push(0);
		}else{
		  	singleStructuresA.push(0);
		  	singleStructuresB.push(0);
		  	singleStructuresC.push(1);
		}
	}
	return [singleStructuresA,singleStructuresB,singleStructuresC];
}

function showDomainOption(peptide,domain){
	var domainInfo = showDomain(peptide,domain);
	var option = {
	    title: {
	        text: 'Potential nuclear localization codes',
	        show:true,
	        top:30,
	        left: 40,
	        textStyle: {
	            color: '#595b5d',
	            fontSize:15
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        textStyle:{align:'left'},
	        position: function (point, params, dom, rect, size) {
			    return [point[0], '50%'];// 固定在中间
			},
	        formatter: function(params){
	        	var returntip = '<strong>'+peptide[parseInt(params[0].name)-1]+params[0].name+'</strong>';
	        	if(params.length == 2){
		        	if(params[0].value == 1){
		        		returntip += '<br>'+params[0].marker + params[0].seriesName;
		        	}
		        	else{
		        		returntip += '<br>'+params[1].marker + params[1].seriesName;
		        	}
		        }else if(params.length == 1){
		        	if(params[0].value == 1){
		        		returntip += '<br>'+params[0].marker + params[0].seriesName;
		        	}
		        }
		        return returntip;
	        }
	    },
	    legend:{
	    	data: ['Nuclear localization codes','Other region'],
	    	top:30,
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
	          type : 'category',
	          data : listLength(peptide),
	          axisTick: {
	            alignWithLabel: true
	          }
	        },
	        {
	          type : 'category',
	          data : peptide.split(''),
	          axisTick: {
	            alignWithLabel: true
	          },
	          axisLine: {
                onZero: false
              }
	        }
	    ],
	    yAxis : [
	        {
	          type : 'value',
	          show: false,
	          min: 0,
	          max: 1.02
	        }
	    ],
	    series : [
	    	{
	    		name:'Nuclear localization codes',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#dc3545"
	    			}
	    		},
	    		data:domainInfo[0]
	    	},
	    	{
	    		name:'Other region',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#dddddd"
	    			}
	    		},
	    		data:domainInfo[1]
	    	}
	    ],
	    dataZoom: [
	        {
	            type: 'inside',
	            start: 0,
	            end: 100
	        },
	        {
	            show: true,
	            type: 'slider',
	            top:0,
	            left: 47,
	        	right: 53,
	            height:20,
	            start: 0,
	            end: 100
	        }
	    ]
	};
	return option;
}

function showScoreOption(peptide,scores,deltaScores){
	var option = {
	    title: {
	        text: 'pNuLoC prediction scores',
	        show:true,
	        top:10,
	        left: 40,
	        textStyle: {
	            color: '#595b5d',
	            fontSize:15
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        textStyle:{align:'left'},
	        position: function (point, params, dom, rect, size) {
			    return [point[0], '50%'];// 固定在中间
			},
	        formatter: function(params){
	        	var returntip = '<strong>'+peptide[parseInt(params[0].name)-1]+params[0].name+'</strong>';
	        	for(var i in params){
	        		returntip = returntip+"<br>"+params[i].marker + params[i].seriesName+'  <strong>'+parseFloat(params[i].value).toFixed(3)+'</strong>';
	        	}
	        	return returntip;
	        }
	    },
	    legend:{
	    	data: ['pNuLoC score','Delta pNuLoC score'],
	    	top:10,
	        right: 70
	    },
	    grid: {
	        left: 50,
	        right: 50,
	        bottom: 5,
	        top: 40,
	        containLabel: false
	    },
	    xAxis : [
	        {
	          type : 'category',
	          show: false,
	          data : listLength(peptide),
	          axisTick: {
	            alignWithLabel: true
	          }
	        }
	    ],
	    yAxis : [
	        {
	          type : 'value',
	          min: 0,
              max: 1,
	          position:'left',
	          axisTick: {
		        show:true
		      },
	          axisLine: {
	          	show:true,
	          	lineStyle: {
                    color: "#5799e0"
                }
	          }
	        },
	        {
	          type : 'value',
	          min: -0.4,
              max: 0.6,
	          position:'right',
	          axisTick: {
		        show:true
		      },
	          axisLine: {
	          	show:true,
	          	lineStyle: {
                    color: "#fd7e14"
                }
	          }
	        }
	    ],
	    series : [
	    	{
	    		name:'pNuLoC score',
	    		type:"line",
	    		symbolSize: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#5799e0"
	    			}
	    		},
	    		data: scores.split(',')
	    	},
	    	{
	    		name:'Delta pNuLoC score',
	    		type:"line",
	    		yAxisIndex: 1,
	    		symbolSize: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#fd7e14"
	    			}
	    		},
	    		data: deltaScores.split(',')
	    	}
	    ],
	    dataZoom: [
	        {
	            type: 'inside',
	            start: 0,
	            end: 100
	        },
	        {
	            show: false,
	            type: 'slider',
	            top:0,
	            left: 47,
	        	right: 53,
	            height:20,
	            start: 0,
	            end: 100
	        }
	    ]
	};
	return option;
}

function showDisorderOption(peptide,disorder){
	var disorderInfo = showDisorder(peptide,disorder);
	var option = {
		title: {
	        text: 'Disorder',
	        show:true,
	        top:10,
	        left: 40,
	        textStyle: {
	            color: '#595b5d',
	            fontSize:15
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        textStyle:{align:'left'},
	        position: function (point, params, dom, rect, size) {
			    return [point[0], '50%'];// 固定在中间
			},
	        formatter: function(params){
	        	var returntip = '<strong>'+peptide[parseInt(params[0].name)-1]+params[0].name+'</strong>';
	        	for(var i in params){
	        		if(params[i].value == 1){	
		        		returntip = returntip+"<br>"+params[i].marker + params[i].seriesName;
					}
	        	}
	        	return returntip;
	        }
	        
	    },
	    legend:{
	    	data: ['Disordered','Ordered'],
	    	top:10,
	        right: 70
	    },
	    grid: {
	        left: 50,
	        right: 50,
	        bottom: 5,
	        top: 40,
	        containLabel: false
	    },
	    xAxis : [
	        {
	          show:false,
	          type : 'category',
	          data : listLength(peptide),
	          axisTick: {
	            alignWithLabel: true
	          }
	        }
	    ],
	    yAxis : [
	        {
	          type : 'value',
	          show: false
	        }
	    ],
	    series : [
	    	{
	    		name:'Disordered',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#3398DB"
	    			}
	    		},
	    		data:disorderInfo[0]
	    	},
	    	{
	    		name:'Ordered',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#dddddd"
	    			}
	    		},
	    		data:disorderInfo[1]
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
	return option;
}

function showExposeOption(peptide,expose){
	var exposeInfo = showExpose(peptide,expose);
	var option = {
		title: {
	        text: 'Exposed & Buried',
	        show:true,
	        top:10,
	        left: 40,
	        textStyle: {
	            color: '#595b5d',
	            fontSize:15
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        textStyle:{align:'left'},
	        position: function (point, params, dom, rect, size) {
			    return [point[0], '50%'];// 固定在中间
			},
	        formatter: function(params){
	        	var returntip = '<strong>'+peptide[parseInt(params[0].name)-1]+params[0].name+'</strong>';
	        	for(var i in params){
	        		if(params[i].value == 1){	
		        		returntip = returntip+"<br>"+params[i].marker + params[i].seriesName;
					}
	        	}
	        	return returntip;
	        }
	        
	    },
	    legend:{
	    	data: ['Exposed','Buried'],
	    	top:10,
	        right: 70
	    },
	    grid: {
	        left: 50,
	        right: 50,
	        bottom: 5,
	        top: 40,
	        containLabel: false
	    },
	    xAxis : [
	        {
	          show:false,
	          type : 'category',
	          data : listLength(peptide),
	          axisTick: {
	            alignWithLabel: true
	          }
	        }
	    ],
	    yAxis : [
	        {
	          type : 'value',
	          show: false
	        }
	    ],
	    series : [
	    	{
	    		name:'Exposed',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#3398DB"
	    			}
	    		},
	    		data:exposeInfo[0]
	    	},
	    	{
	    		name:'Buried',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#dddddd"
	    			}
	    		},
	    		data:exposeInfo[1]
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
	return option;
}

function showPolarOption(peptide,polar){
	var polarInfo = showPolar(peptide,polar);
	var option = {
		title: {
	        text: 'Polar',
	        show:true,
	        top:10,
	        left: 40,
	        textStyle: {
	            color: '#595b5d',
	            fontSize:15
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        textStyle:{align:'left'},
	        position: function (point, params, dom, rect, size) {
			    return [point[0], '50%'];// 固定在中间
			},
	        formatter: function(params){
	        	var returntip = '<strong>'+peptide[parseInt(params[0].name)-1]+params[0].name+'</strong>';
	        	for(var i in params){
	        		if(params[i].value == 1){	
		        		returntip = returntip+"<br>"+params[i].marker + params[i].seriesName;
					}
	        	}
	        	return returntip;
	        }
	        
	    },
	    legend:{
	    	data: ['Polar','Nonpolar'],
	    	top:10,
	        right: 70
	    },
	    grid: {
	        left: 50,
	        right: 50,
	        bottom: 5,
	        top: 40,
	        containLabel: false
	    },
	    xAxis : [
	        {
	          show:false,
	          type : 'category',
	          data : listLength(peptide),
	          axisTick: {
	            alignWithLabel: true
	          }
	        }
	    ],
	    yAxis : [
	        {
	          type : 'value',
	          show: false
	        }
	    ],
	    series : [
	    	{
	    		name:'Polar',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#3398DB"
	    			}
	    		},
	    		data:polarInfo[0]
	    	},
	    	{
	    		name:'Nonpolar',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#dddddd"
	    			}
	    		},
	    		data:polarInfo[1]
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
	return option;
}

function showChargeOption(peptide,charge){
	var chargeInfo = showCharge(peptide,charge);
	var option = {
		title: {
	        text: 'Charge',
	        show:true,
	        top:10,
	        left: 40,
	        textStyle: {
	            color: '#595b5d',
	            fontSize:15
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        textStyle:{align:'left'},
	        position: function (point, params, dom, rect, size) {
			    return [point[0], '50%'];// 固定在中间
			},
	        formatter: function(params){
	        	var returntip = '<strong>'+peptide[parseInt(params[0].name)-1]+params[0].name+'</strong>';
	        	for(var i in params){
	        		if(params[i].value == 1){	
		        		returntip = returntip+"<br>"+params[i].marker + params[i].seriesName;
					}
	        	}
	        	return returntip;
	        }
	        
	    },
	    legend:{
	    	data: ['Positive','Negative','Uncharged'],
	    	top:10,
	        right: 70
	    },
	    grid: {
	        left: 50,
	        right: 50,
	        bottom: 5,
	        top: 40,
	        containLabel: false
	    },
	    xAxis : [
	        {
	          show:false,
	          type : 'category',
	          data : listLength(peptide),
	          axisTick: {
	            alignWithLabel: true
	          }
	        }
	    ],
	    yAxis : [
	        {
	          type : 'value',
	          show: false
	        }
	    ],
	    series : [
	    	{
	    		name:'Positive',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#db3d3d"
	    			}
	    		},
	    		data:chargeInfo[0]
	    	},
	    	{
	    		name:'Negative',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#3ddb92"
	    			}
	    		},
	    		data:chargeInfo[1]
	    	},
	    	{
	    		name:'Uncharged',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#dddddd"
	    			}
	    		},
	    		data:chargeInfo[2]
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
	return option;
}

function showSecondOption(peptide,second){
	var secondInfo = showSecond(peptide,second);
	var option = {
		title: {
	        text: 'Second structure',
	        show:true,
	        top:10,
	        left: 40,
	        textStyle: {
	            color: '#595b5d',
	            fontSize:15
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        textStyle:{align:'left'},
	        position: function (point, params, dom, rect, size) {
			    return [point[0], '50%'];// 固定在中间
			},
	        formatter: function(params){
	        	var returntip = '<strong>'+peptide[parseInt(params[0].name)-1]+params[0].name+'</strong>';
	        	for(var i in params){
	        		if(params[i].value == 1){	
		        		returntip = returntip+"<br>"+params[i].marker + params[i].seriesName;
					}
	        	}
	        	return returntip;
	        }
	        
	    },
	    legend:{
	    	data: ['Alpha-helix','Beta-strand','Coil'],
	    	top:10,
	        right: 70
	    },
	    grid: {
	        left: 50,
	        right: 50,
	        bottom: 5,
	        top: 40,
	        containLabel: false
	    },
	    xAxis : [
	        {
	          show:false,
	          type : 'category',
	          data : listLength(peptide),
	          axisTick: {
	            alignWithLabel: true
	          }
	        }
	    ],
	    yAxis : [
	        {
	          type : 'value',
	          show: false
	        }
	    ],
	    series : [
	    	{
	    		name:'Alpha-helix',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#db3d3d"
	    			}
	    		},
	    		data:secondInfo[0]
	    	},
	    	{
	    		name:'Beta-strand',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#3ddb92"
	    			}
	    		},
	    		data:secondInfo[1]
	    	},
	    	{
	    		name:'Coil',
	    		type:"bar",
	    		barWidth: "100%",
	    		stack: "total",
	    		xAxisIndex: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#dddddd"
	    			}
	    		},
	    		data:secondInfo[2]
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
	return option;
}

function showSurfaceOption(peptide,surface){
	var option = {
	    title: {
	        text: 'Surface Accessibility',
	        show:true,
	        top:10,
	        left: 40,
	        textStyle: {
	            color: '#595b5d',
	            fontSize:15
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        textStyle:{align:'left'},
	        position: function (point, params, dom, rect, size) {
			    return [point[0], '50%'];// 固定在中间
			},
	        formatter: function(params){
	        	var returntip = '<strong>'+peptide[parseInt(params[0].name)-1]+params[0].name+'</strong>';
	        	for(var i in params){
	        		returntip = returntip+"<br>"+params[i].marker + params[i].seriesName+'  <strong>'+parseFloat(params[i].value).toFixed(3)+'</strong>';
	        	}
	        	return returntip;
	        }
	    },
	    grid: {
	        left: 50,
	        right: 50,
	        bottom: 5,
	        top: 40,
	        containLabel: false
	    },
	    xAxis : [
	        {
	          type : 'category',
	          show: false,
	          data : listLength(peptide),
	          axisTick: {
	            alignWithLabel: true
	          }
	        }
	    ],
	    yAxis : [
	        {
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
	    		name:'Surface Accessibility',
	    		type:"line",
	    		symbolSize: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#5799e0"
	    			}
	    		},
	    		data: surface.split(',')
	    	}
	    ],
	    dataZoom: [
	        {
	            type: 'inside',
	            start: 0,
	            end: 100
	        },
	        {
	            show: false,
	            type: 'slider',
	            top:0,
	            left: 47,
	        	right: 53,
	            height:20,
	            start: 0,
	            end: 100
	        }
	    ]
	};
	return option;
}

function showHydropathyOption(peptide,hydropathy){
	var option = {
	    title: {
	        text: 'Hydropathy',
	        show:true,
	        top:10,
	        left: 40,
	        textStyle: {
	            color: '#595b5d',
	            fontSize:15
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        textStyle:{align:'left'},
	        position: function (point, params, dom, rect, size) {
			    return [point[0], '50%'];// 固定在中间
			},
	        formatter: function(params){
	        	var returntip = '<strong>'+peptide[parseInt(params[0].name)-1]+params[0].name+'</strong>';
	        	for(var i in params){
	        		returntip = returntip+"<br>"+params[i].marker + params[i].seriesName+'  <strong>'+parseFloat(params[i].value).toFixed(3)+'</strong>';
	        	}
	        	return returntip;
	        }
	    },
	    grid: {
	        left: 50,
	        right: 50,
	        bottom: 5,
	        top: 40,
	        containLabel: false
	    },
	    xAxis : [
	        {
	          type : 'category',
	          show: false,
	          data : listLength(peptide),
	          axisTick: {
	            alignWithLabel: true
	          }
	        }
	    ],
	    yAxis : [
	        {
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
	    		name:'Hydropathy',
	    		type:"line",
	    		symbolSize: 0,
	    		itemStyle: {
	    			normal: {
	    				color: "#5799e0"
	    			}
	    		},
	    		data: hydropathy.split(',')
	    	}
	    ],
	    dataZoom: [
	        {
	            type: 'inside',
	            start: 0,
	            end: 100
	        },
	        {
	            show: false,
	            type: 'slider',
	            top:0,
	            left: 47,
	        	right: 53,
	            height:20,
	            start: 0,
	            end: 100
	        }
	    ]
	};
	return option;
}


function showRes(proID){
	$('#choosePro').html(proID);
	var proInfo = predRes[proID];

	var myChart1 = echarts.init(document.getElementById('domain'));
	var option1 = showDomainOption(proInfo['Sequence'],proInfo['pNuLoCRegion']);
	myChart1.setOption(option1);

	var myChart2 = echarts.init(document.getElementById('scores'));
	var option2 = showScoreOption(proInfo['Sequence'],proInfo['pNuLoCScore'],proInfo['pNuLoCDScore']);
	myChart2.setOption(option2);

	var myChart3 = echarts.init(document.getElementById('disorder'));
	var option3 = showDisorderOption(proInfo['Sequence'],proInfo['Disorder']);
	myChart3.setOption(option3);

	var myChart4 = echarts.init(document.getElementById('expose'));
	var option4 = showExposeOption(proInfo['Sequence'],proInfo['ExposeBuried']);
	myChart4.setOption(option4);

	var myChart5 = echarts.init(document.getElementById('polar'));
	var option5 = showPolarOption(proInfo['Sequence'],proInfo['Polar']);
	myChart5.setOption(option5);

	var myChart6 = echarts.init(document.getElementById('charge'));
	var option6 = showChargeOption(proInfo['Sequence'],proInfo['Charge']);
	myChart6.setOption(option6);

	var myChart7 = echarts.init(document.getElementById('second'));
	var option7 = showSecondOption(proInfo['Sequence'],proInfo['SecondStructure']);
	myChart7.setOption(option7);

	var myChart8 = echarts.init(document.getElementById('surface'));
	var option8 = showSurfaceOption(proInfo['Sequence'],proInfo['SurfaceAccessbility']);
	myChart8.setOption(option8);

	var myChart9 = echarts.init(document.getElementById('hydropathy'));
	var option9 = showHydropathyOption(proInfo['Sequence'],proInfo['Hydropathy']);
	myChart9.setOption(option9);

	echarts.connect([myChart1,myChart2,myChart3,myChart4,myChart5,myChart6,myChart7,myChart8,myChart9]);
}

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

function showTable(){
	var tableInfo = '';
	for(var proID in predRes){
		var proInfo = predRes[proID];
		tableInfo += "<tr>\
		<td>"+proID+"</td>\
		<td>"+proInfo['pNuLoCProb']+"</td>\
		<td>"+proInfo['pNuLoCRank']+"</td>\
		<td>"+showNLSRange(proInfo['Sequence'].length, proInfo['pNuLoCRegion'])+"</td>\
		<td>"+proInfo['pNuLoCRegion'].replaceAll(';',', ')+"</td>\
		<td><span class='viewRes' onclick='showRes(\""+proID+"\")'><i class='ri-eye-line'></i></span></td>\
		</tr>";
	}
	$('#predResShow tbody').html(tableInfo);
}

function getTaskByAJAX(taskID){
	var formData = new FormData();
	formData.append("taskID",taskID);
	$.ajax({
        url:'./resource/getTask.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success:function(res){
        	//console.log(res);
        	var returnInfo = JSON.parse(res);
        	if(returnInfo['status'] == 'notfound'){
        		$('#get-alert').addClass('alert-warning');
        		$('#get-alert').html('Sorry, the task is not found! Maybe the task ID is wrong or your task is expired.');
        		$('#result-show').css('display','none');
        	}else if(returnInfo['status'] == 'predicting'){
        		$('#get-alert').html("The task is in progress, please click <a href='webserver.php?taskid="+taskID+"#submitTask'>here</a> and return to the task queue.");
        		$('#result-show').css('display','none');
        	}else if(returnInfo['status'] == 'finished'){
        		$('#get-alert').addClass('alert-success');
	            $('#get-alert').html('The task is successfully finished.');
	            predRes = returnInfo['info'];
	            showTable();
	            showRes(Object.keys(predRes)[0]);
            }else{
            	$('#get-alert').addClass('alert-warning');
            	$('#get-alert').html("Unknown error happened, please <a href='about.php'>contact us</a>");
            	$('#result-show').css('display','none');
            }
        },
        error:function(res){
        	console.log(res);
        }
    })
}

$(document).ready(function(){
/*----- get task from url and show result -----*/
	var thisUrlInfo = window.location.href.split('?');
	if(thisUrlInfo.length == 2){
		var taskInfo = thisUrlInfo[1].split('=');
		if(taskInfo.length == 2){
			if(taskInfo[0] == 'taskid'){
				$('#task-alert').addClass('alert-primary');
				$('#task-alert').html('Show prediction result for '+taskInfo[1]+'.');
				getTaskByAJAX(taskInfo[1]);
			}else{
				$('#task-alert').addClass('alert-danger');
				$('#task-alert').html('Warning, you must pass a correct task ID format!');
				$('#get-alert').css('display','none');
				$('#result-show').css('display','none');
			}
		}else{
			$('#task-alert').addClass('alert-danger');
			$('#task-alert').html('Warning, there is no task information in URL!');
			$('#get-alert').css('display','none');
			$('#result-show').css('display','none');
		}
	}else{
		$('#task-alert').addClass('alert-danger');
		$('#task-alert').html('Warning, there is no param in URL!');
		$('#get-alert').css('display','none');
		$('#result-show').css('display','none');
	}
})
