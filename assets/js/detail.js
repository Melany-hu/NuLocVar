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

function showPTM(sequence,ptminfo){
	var mod_color ={'Hydroxyisobutyrylation':'#fda7ec','Acetylation':'#8fc3fb','Butyrylation':'#38e04d','Crotonylation':'#58a9f0','Methylation':'#f9c3c5','Phosphorylation':'#f0b952','Succinylation':'#d2a871','SUMOylation':'#d5d953','Ubiquitination':'#86d986','Ubiquitylation':'#86d986','Glycosylation':'#74d6ec'};
	var PTMreturn = [];
	var singlePTMs = ptminfo.split(';');
	for(var i=0;i<singlePTMs.length;i++){
	  var singlePTMtype = singlePTMs[i].split(':')[0];
	  var singlePTMInfo = singlePTMs[i].split(':')[1].split(',');
	  var PTMsite = [];
	  for(var j = 0;j<singlePTMInfo.length;j++){
		PTMsite.push(Number(singlePTMInfo[j])-1);
	  }
	  var singlePTMres = [];
	  for(var j=0;j<sequence.length;j++){
		var residue = sequence[j]+(j+1);
		if(PTMsite.indexOf(j) > -1){
		  singlePTMres.push([j,1,mod_color[singlePTMtype],residue]);
		}
		else{
		  singlePTMres.push([j,0,mod_color[singlePTMtype],residue]);
		}
	  }
	  PTMreturn.push({"name":singlePTMtype,"type":"bar","barWidth": "5","stack": "total","itemStyle": {"normal": {"color": mod_color[singlePTMtype],}},"data":singlePTMres});
	}
	return PTMreturn;
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

function showLegand(ptminfo){
	var Legandreturn = [];
	var singlePTMs = ptminfo.split(';');
	for(var i=0;i<singlePTMs.length;i++){
	  var singlePTMtype = singlePTMs[i].split(':')[0];
	  Legandreturn.push(singlePTMtype);
	}
	return Legandreturn;
  }

function showPTMOption(sequence, ptminfo) {
    var ptmSeries = showPTM(sequence, ptminfo);
    if (ptminfo != "") {
        var option = {
            title: {
                text: 'Post translational modifications',
                show: true,
				top:10,
				left: 40,
				textStyle: {
					color: '#595b5d',
					fontSize:15
				}
            },
            tooltip: {
                trigger: 'axis',
                textStyle: { align: 'left' },
                formatter: function (params) {
                    var tipinfo = params[0].data[3];
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].data[1] == 1) {
                            tipinfo = tipinfo + '<br><span style="display:inline-block;margin-top:5px;border-radius:10px;width:6px;height:10px;background-color:' + params[i].data[2] + '"></span>' + params[i].seriesName;
                        }
                    }
                    return tipinfo;
                }
            },
            legend: {
                right: 70,
                top: 10,
                textStyle: {
                    color: '#90979c'
                },
                data: showLegand(ptminfo)
            },
            grid: {
                left: '25',
                right: '50',
                bottom: '50',
                top: '50',
                containLabel: false
            },
            xAxis: [
                {
                    type: 'category',
                    data: listLength(sequence),
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false
                }
            ],
            series: ptmSeries,
            dataZoom: [
                {
                    show: false,
                    realtime: true,
                    start: 0,
                    end: 100,
                    left: 22,
                    right: 50,
                    bottom: 0,
                    height: 30,
                    handleColor: 'red',
                    backgroundColor: '#ffffff'
                },
                {
                    type: 'inside',
                    realtime: true
                }
            ]
        };
    } else {
        var option = {
            title: {
                text: 'No PTMs information',
                show: true
            }
        };
    }
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


function showRes(){

	var myChart1 = echarts.init(document.getElementById('domain'));
	var option1 = showDomainOption(proInfo['Sequence'],proInfo['pNuLoCRegion']);
	myChart1.setOption(option1);

	var myChart2 = echarts.init(document.getElementById('scores'));
	var option2 = showScoreOption(proInfo['Sequence'],proInfo['pNuLoCScore'],proInfo['pNuLoCDScore']);
	myChart2.setOption(option2);

	var ptmChart = echarts.init(document.getElementById('ptminfo'));
	var optionptm = showPTMOption(proInfo['Sequence'],proInfo['PTM']);
	ptmChart.setOption(optionptm);

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

	echarts.connect([myChart1,myChart2,ptmChart,myChart3,myChart4,myChart5,myChart6,myChart7,myChart8,myChart9]);
}

function showUniprot(uniprotList){
	var uniprots = uniprotList.split(';');
	var returnInfo = "<a target='_blank' href='https://www.uniprot.org/uniprot/"+uniprots[0]+"'>"+uniprots[0]+"</a>";
	for(var i=1;i<uniprots.length;i++){
		returnInfo += ', '+uniprots[i];
	}
	return returnInfo;
}

function showGene(geneList){
	if(geneList == ''){
		return 'N/A';
	}else{
		var genes = geneList.split(';');
		var returnInfo = genes[0];
		for(var i=1;i<genes.length;i++){
			returnInfo += ', '+genes[i];
		}
		return returnInfo;
	}
}

function showProtein(proteinList){
	var proteins = proteinList.split(';');
	var returnInfo = proteins[0];
	for(var i=1;i<proteins.length;i++){
		returnInfo += ', '+proteins[i];
	}
	return returnInfo;
}

function showOrganism(organism,taxonomy){
	return "<i>"+organism+"</i>, NCBI Taxonomy ID=<a target='_blank' href='https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id="+taxonomy+"'>"+taxonomy+"</a>";
}

function showNM(nmList){
	if(nmList == ''){
		return 'N/A';
	}else{
		var returnInfo = [];
		var nms = nmList.split(';');
		for(var i in nms){
			returnInfo.push("<a target='_blank' href='http://www.ncbi.nlm.nih.gov/protein/"+nms[i]+"'>"+nms[i]+"</a>")
		}
		return returnInfo.join(', ');
	}
}

function showNP(npList){
	if(npList == ''){
		return 'N/A';
	}else{
		var returnInfo = [];
		var nps = npList.split(';');
		for(var i in nps){
			returnInfo.push("<a target='_blank' href='http://www.ncbi.nlm.nih.gov/protein/"+nps[i]+"'>"+nps[i]+"</a>")
		}
		return returnInfo.join(', ');
	}
}

function showEntrez(entrezList){
	if(entrezList == ''){
		return 'N/A';
	}else{
		var returnInfo = [];
		var entrezs = entrezList.split(';');
		for(var i in entrezs){
			returnInfo.push("<a target='_blank' href='http://www.ncbi.nlm.nih.gov/gene/"+entrezs[i]+"'>"+entrezs[i]+"</a>")
		}
		return returnInfo.join(', ');
	}
}
function showFunction(functionDes){
	if(functionDes == ''){
		return 'N/A';
	}else{
		var matches = functionDes.match(/ \((PubMed:[0-9]*,? *)+\)/g);
		if(matches){
			for(var i in matches){
				var pmids =  matches[i].replace('(','').replace(')','').split(',');
				var pmidLinks = [];
				for(var j in pmids){
					var pmid = pmids[j].split(':')[1];
					pmidLinks.push("PMID: <a href ='https://pubmed.ncbi.nlm.nih.gov/"+pmid+"' target='_blank' >"+pmid+"</a>");
				}
				var replaceContent = "<sup class='pmid-link' tabindex='0' data-toggle='popover' data-trigger='focus' data-html=true title='Related literature(s)' data-content=\""+pmidLinks.join('<br>')+"\">"+pmidLinks.length+"</sup>";
				functionDes = functionDes.replace(matches[i],replaceContent);
			}
		}
		return functionDes;
	}
}

// About protein
function showPro(){
	var showProRes = 
	"<tr><td>UniProt ID</td><td>"+showUniprot(proInfo['Accession'])+"</td></tr>\
	<tr><td>Gene name</td><td>"+showGene(proInfo['GeneName'])+"</td></tr>\
	<tr><td>Protein name</td><td>"+showProtein(proInfo['ProteinName'])+"</td></tr>\
	<tr><td>Function</td><td><p class='text-des'>"+showFunction(proInfo['Function'])+"</p></td></tr>";
	$('#proInfoShow tbody').html(showProRes);
	//需要对新载入的popover元素启用该功能
    $('[data-toggle="popover"]').popover();
}

function showRegionInfo(regionList,pmidList){
	if(regionList == ''){
		return 'N/A';
	}else{
		var returnInfo = [];
		var regions = regionList.split(';');
		if(pmidList == ''){
			for(var i in regions){
				returnInfo.push("<span>"+regions[i]+"</span>");
			}
		}else{
			var pmids = pmidList.split(';');
			for(var i in regions){
				returnInfo.push("<span>"+regions[i]+"</span>"+"<sup class='pmid-link' tabindex='0' data-toggle='popover' data-trigger='focus' data-html=true title='Related literature(s)' data-content=\""+"PMID: <a href ='https://pubmed.ncbi.nlm.nih.gov/"+pmids[i]+"' target='_blank' >"+pmids[i]+"</a>"+"\">"+1+"</sup>");
			}
		}
		return returnInfo.join(', ');
	}
}

// Nuclear localization codes
//<tr><td colspan=2 class='title1'>pNuLoC score</td><td>"+proInfo['pNuLoCProb']+"</td></tr>\
//<tr><td colspan=2 class='title1'>pNuLoC level</td><td>"+proInfo['pNuLoCRank']+"</td></tr>\
//<tr><td colspan=2 class='title1'>pNuLoC region</td><td>"+showRegionInfo(proInfo['pNuLoCRegion'],'')+"</td></tr>\
function showRegion(){
	var showRegionRes = 
	"<tr><td colspan=2 class='title1'>pNuLoC score</td><td>"+parseFloat(proInfo['pNuLoCProb']).toFixed(3)+"</td></tr>\
	<tr><td colspan=2 class='title1'>pNuLoC level</td><td>"+proInfo['pNuLoCRank']+"</td></tr>\
	<tr><td colspan=2 class='title1'>pNuLoC region</td><td>"+showRegionInfo(proInfo['pNuLoCRegion'],'')+"</td></tr>\
	<tr><td rowspan=3 class='title2'>NLS</td><td class='title3'>SeqNLS region</td><td>"+showRegionInfo(proInfo['SeqNLSRegion'],proInfo['SeqNLSPMID'])+"</td></tr>\
	<tr><td class='title3'>UniProt region</td><td>"+showRegionInfo(proInfo['UniprotNLSRegion'],'')+"</td></tr>\
	<tr><td class='title3'>NLSdb region</td><td>"+showRegionInfo(proInfo['nlsdbnls_region'],'')+"</td></tr>\
	<tr><td rowspan=4 class='title2'>NES</td><td class='title3'>ValidNESs region</td><td>"+showRegionInfo(proInfo['validnes_region'],'')+"</td></tr>\
	<tr><td class='title3'>NESbase region</td><td>"+showRegionInfo(proInfo['nesbase_region'],'')+"</td></tr>\
	<tr><td class='title3'>UniProt region</td><td>"+showRegionInfo(proInfo['UniprotNESRegion'],'')+"</td></tr>\
	<tr><td class='title3'>NLSdb region</td><td>"+showRegionInfo(proInfo['nlsdbnes_region'],'')+"</td></tr>";
	$('#regionInfoShow tbody').html(showRegionRes);
	//需要对新载入的popover元素启用该功能
    $('[data-toggle="popover"]').popover();
}

function showProPos(posID){
  	$(posID).removeClass('hidden');
  	$(posID).attr('data-content',proInfo['Accession'].split(';')[1]);
}


function showLoc() {
    const subcellularLocationStr = proInfo['Subcellular Location'] || "";
    if (!subcellularLocationStr) {
        $('#locInfoShow').html('<span style="color:gray;">No subcellular location information.</span>');
        $('.cell-figure').html('<sib-swissbiopics-sl taxid="9606" sls=""></sib-swissbiopics-sl>');
        return;
    }

    const locationNames = subcellularLocationStr.split('; ').map(s => s.trim()).filter(Boolean);
    console.log('locationNames:', locationNames);

    const slsMap = {
        "Nucleus": { id: 191},
        "Cytoplasm": { id: 86},
        "Mitochondrion": { id: 173},
        "Cell membrane": { id: 39},
        "Endoplasmic reticulum": { id: 95},
        "Golgi apparatus": { id: 132 },
        "Lysosome": { id: 158 },
        "Chromosome": { id: 191 },
		"Secreted": { id: 243 },
    };

    const slsIds = locationNames
        .map(name => slsMap[name]?.id)
        .filter(id => id !== undefined)
        .join(',');

    console.log('slsIds:', slsIds);

    // 每次都重新插入组件
    $('.cell-figure').html(`<sib-swissbiopics-sl taxid="9606" sls="${slsIds}"></sib-swissbiopics-sl>`);

    // 右侧打印出location
    let html = '';
    locationNames.forEach(name => {
        const slsId = slsMap[name]?.id;
        html += `
          <div class="location-item" data-slsid="${slsId}" style="margin-right: 30px; cursor: pointer;">
            <span style="font-size: 15px; color: #233047; margin-right: 0px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#233047"/></svg>
            </span>
            <span style="font-size: 15px; font-weight: bold; color: #233047;">${name}</span>
          </div>
        `;
    });
    $('.cell-location-list').html(html);


    // 工具函数：注入/移除高亮 style
    function injectHighlightStyle(slsId) {
        const el = document.querySelector('.cell-figure sib-swissbiopics-sl');
        if (el && el.shadowRoot) {
            // 先移除旧的
            const oldStyle = el.shadowRoot.getElementById('dynamic-swissbiopics-style');
            if (oldStyle) oldStyle.remove();
            if (slsId !== undefined && slsId !== "") {
                const style = document.createElement('style');
                style.id = 'dynamic-swissbiopics-style';
                style.textContent = `
                    #SL${String(slsId).padStart(4, '0')} *:not(text) {fill:#22b8cf !important;}
                    #SL${String(slsId).padStart(4, '0')} *:not(path, .coloured) {opacity:0.8 !important;}
                    #SL${String(slsId).padStart(4, '0')} .coloured {stroke:black !important;}
                `;
                el.shadowRoot.appendChild(style);
            }
        }
    }
    // 监听 SVG 加载完成后再允许注入高亮
    function waitForSVGAndBindHover() {
        const el = document.querySelector('.cell-figure sib-swissbiopics-sl');
        if (el && el.shadowRoot && el.shadowRoot.querySelector('svg')) {
            // 悬停高亮
            $('.location-item').on('mouseenter', function() {
                const slsId = $(this).data('slsid');
                injectHighlightStyle(slsId);
            });
            $('.location-item').on('mouseleave', function() {
                injectHighlightStyle(); // 只移除高亮，恢复全灰
            });
        } else {
            setTimeout(waitForSVGAndBindHover, 100);
        }
    }
    waitForSVGAndBindHover();
}

function getProByAJAX(uniprot, uniprotDisplay) {
    var formData = new FormData();
    formData.append("uniprot", uniprot);
    $.ajax({
        url:'./resource/getProtein.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success:function(res){
            var returnInfo = JSON.parse(res);
            if(returnInfo['status'] == 'notfound'){
                setProAlert('warning', 'Sorry, the protein is not found! Maybe the uniprot ID is wrong or your uniprot ID is not in our database.', true);
            }else if(returnInfo['status'] == 'found'){
                setProAlert('success', 'Show prediction result for ' + uniprotDisplay + '. The protein information in the database is successfully found.');
                proInfo = returnInfo['info'];
                showPro();
                showRegion();
                showRes();
                showLoc();
            }else{
                setProAlert('warning', "Unknown error happened, please <a href='contact.php'>contact us</a>", true);
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
		var proInfo = thisUrlInfo[1].split('=');
		if(proInfo.length == 2){
			if(proInfo[0] == 'uniprot'){
				setProAlert('primary', 'Show prediction result for ' + proInfo[1] + '.');
				getProByAJAX(proInfo[1], proInfo[1]);
			}else{
				setProAlert('danger', 'Warning, you must pass a correct uniprot ID format!');
				$('#result-show').css('display','none');
			}
		}else{
			setProAlert('danger', 'Warning, there is no uniprot ID in URL!');
			$('#result-show').css('display','none');
		}
	}else{
		setProAlert('danger', 'Warning, there is no params in URL!');
		$('#result-show').css('display','none');
	}
})

function setProAlert(type, message, hideResult = false) {
    $('#pro-alert')
        .removeClass('alert-primary alert-danger alert-warning alert-success')
        .addClass('alert alert-' + type)
        .html(message);
    if (hideResult) {
        $('#result-show').css('display', 'none');
    }
}
