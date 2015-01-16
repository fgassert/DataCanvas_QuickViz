
var chart = (function() {
    var url1 = 'https://localdata-sensors.herokuapp.com/api/sources/ci4yfgz37000e03zzg1a6o6vy/entries?startIndex=0&sort=desc&count=25'
    var url2 = 'https://localdata-sensors.herokuapp.com/api/sources/ci4yfgz37000e03zzg1a6o6vy/entries?startIndex=0&sort=desc&count=5'
    var ctx = document.getElementById("chart").getContext("2d");
    
    var c = undefined;
    var maxLen = 25;

    var loadData = function(err, res) {
	var obj = JSON.parse(res.responseText)
	var data = {labels:[],datasets:[{label:'Dust',
		fillColor: "rgba(220,220,220,0.2)",
		strokeColor: "rgba(220,220,220,1)",
		pointColor: "rgba(220,220,220,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: []
	}]}
	for (var i=0; i<obj.length; i++) {
	    var d = Date.parse(obj[obj.length-i-1].timestamp);
	    data.labels[i] = new Date(d).toLocaleTimeString();
	    data.datasets[0].data[i] = obj[obj.length-i-1].data.dust;
	};
	if (c === undefined) {
	    c = new Chart(ctx).Line(data,{responsive:true,scaleShowGridLines:false});
	    console.log('newchart')
	} else {
	    for (var i=0; i<data.labels.length; i++) {
		if (c.scale.xLabels.indexOf(data.labels[i])==-1) {
		    c.addData([data.datasets[0].data[i]], data.labels[i]);
		};
	    };
	    if (c.scale.xLabels.length > maxLen) {
		var r = c.scale.xLabels.length-maxLen;
		for (var i=0; i<r; i++) {
		    c.scale.xLabels.shift();
		    c.datasets[0].points.shift();
		};
		c.scale.valuesCount = maxLen;
		c.update();
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
