
var chart = (function() {
    var url1 = 'https://localdata-sensors.herokuapp.com/api/sources/ci4yfgz37000e03zzg1a6o6vy/entries?startIndex=0&sort=desc&count=25'
    var url2 = 'https://localdata-sensors.herokuapp.com/api/sources/ci4yfgz37000e03zzg1a6o6vy/entries?startIndex=0&sort=desc&count=5'
    var ctx = document.getElementById("chart").getContext("2d");
    
    var c = undefined;
    var maxLen = 25;

    var loadData = function(err, res) {
	var obj = JSON.parse(res.responseText)
	var data = {labels:[],datasets:[
		{label:'Dust',
		fillColor: "rgba(180,180,180,0.2)",
		strokeColor: "rgba(180,180,180,1)",
		pointColor: "rgba(180,180,180,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: []},
		{label:'Temperature',
		fillColor: "rgba(220,220,220,0.2)",
		strokeColor: "rgba(220,220,220,1)",
		pointColor: "rgba(220,220,220,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: []},
		{label:'Humidity',
		fillColor: "rgba(180,180,220,0.2)",
		strokeColor: "rgba(180,180,220,1)",
		pointColor: "rgba(180,180,220,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: []},
		{label:'Sound',
		fillColor: "rgba(180,200,190,0.2)",
		strokeColor: "rgba(180,200,190,1)",
		pointColor: "rgba(180,200,190,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: []},
		{label:'UV',
		fillColor: "rgba(210,180,220,0.2)",
		strokeColor: "rgba(210,180,220,1)",
		pointColor: "rgba(210,180,220,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: []},
		{label:'Light',
		fillColor: "rgba(220,220,180,0.2)",
		strokeColor: "rgba(220,220,180,1)",
		pointColor: "rgba(220,220,180,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: []}]};
	for (var i=0; i<obj.length; i++) {
	    var d = Date.parse(obj[obj.length-i-1].timestamp);
	    data.labels[i] = new Date(d).toLocaleTimeString();
	    data.datasets[0].data[i] = obj[obj.length-i-1].data.dust;
	    data.datasets[1].data[i] = obj[obj.length-i-1].data.temperature;
	    data.datasets[2].data[i] = obj[obj.length-i-1].data.humidity;
	    data.datasets[3].data[i] = obj[obj.length-i-1].data.sound/10;
	    data.datasets[4].data[i] = obj[obj.length-i-1].data.uv;
	    data.datasets[5].data[i] = obj[obj.length-i-1].data.light;
	};
	if (c === undefined) {
	    c = new Chart(ctx).Line(data,{responsive:true,
					  scaleShowGridLines:false,
					  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%=datasets[i].label%></li><%}%></ul>"
});
	    console.log('newchart')
	    var legend = document.getElementById('legend');
	    legend.innerHTML = c.generateLegend()
	} else {
	    for (var i=0; i<data.labels.length; i++) {
		if (c.scale.xLabels.indexOf(data.labels[i])==-1) {
		    c.addData([data.datasets[0].data[i],
			      data.datasets[1].data[i],
			      data.datasets[2].data[i],
			      data.datasets[3].data[i],
			      data.datasets[4].data[i],
			      data.datasets[5].data[i]
			      ], data.labels[i]);
		};
	    };
	    if (c.scale.xLabels.length > maxLen) {
		var r = c.scale.xLabels.length-maxLen;
		for (var i=0; i<r; i++) {
		    c.removeData();
		};
	    };
	};
	console.log(c);
    };
    corslite(url1, loadData);
    var update = function() {
	corslite(url2, loadData);
	window.setTimeout(update, 10000);
    };
    window.setTimeout(update, 10000);

    
    return c;
    
})()
