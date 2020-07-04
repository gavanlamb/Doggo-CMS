/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 6;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.73545, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.822, 500, 1500, "Ingestor Get Show With Children - Medium"], "isController": false}, {"data": [0.9995, 500, 1500, "Ingestor Get Shows With Children-0"], "isController": false}, {"data": [0.7895, 500, 1500, "Ingestor Get Shows With Children"], "isController": false}, {"data": [1.0, 500, 1500, "Ingestor Get Shows With Children-1"], "isController": false}, {"data": [0.648, 500, 1500, "Ingestor Get Show With Children - Small"], "isController": false}, {"data": [0.712, 500, 1500, "Ingestor Get Show With Children - Extra Large"], "isController": false}, {"data": [0.493, 500, 1500, "Ingestor Get Episodes"], "isController": false}, {"data": [0.633, 500, 1500, "Ingestor Get Show With Children - Jumbo"], "isController": false}, {"data": [0.8005, 500, 1500, "Ingestor Get Show With Children - Large"], "isController": false}, {"data": [0.457, 500, 1500, "Ingestor Get Episode"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 10000, 0, 0.0, 602.451500000002, 205, 2501, 1070.0, 1257.949999999999, 1500.9699999999993, 35.84255084265837, 14921.177372351236, 14.137506138036832], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Ingestor Get Show With Children - Medium", 1000, 0, 0.0, 497.7760000000005, 412, 1002, 602.9, 644.8999999999999, 781.96, 3.6580324906445822, 644.9282894171291, 1.5110817808033772], "isController": false}, {"data": ["Ingestor Get Shows With Children-0", 1000, 0, 0.0, 290.41100000000034, 205, 535, 410.9, 424.94999999999993, 453.99, 3.661260205762823, 2.2346701891040897, 0.9975503880935819], "isController": false}, {"data": ["Ingestor Get Shows With Children", 1000, 0, 0.0, 527.6720000000004, 416, 825, 649.0, 662.9499999999999, 699.9200000000001, 3.657938824631097, 22.901483362779743, 2.0290129417875615], "isController": false}, {"data": ["Ingestor Get Shows With Children-1", 1000, 0, 0.0, 237.17500000000004, 209, 450, 252.0, 271.0, 412.97, 3.660978726052623, 20.686017074804777, 1.033225441239461], "isController": false}, {"data": ["Ingestor Get Show With Children - Small", 1000, 0, 0.0, 608.0499999999998, 410, 1178, 755.0, 792.0, 950.8600000000001, 3.656494299525387, 644.6571276728973, 1.4818800139678083], "isController": false}, {"data": ["Ingestor Get Show With Children - Extra Large", 1000, 0, 0.0, 568.3419999999998, 409, 1179, 734.0, 781.8999999999999, 923.8100000000002, 3.6569890546317594, 644.7443838933402, 1.489223081817816], "isController": false}, {"data": ["Ingestor Get Episodes", 1000, 0, 0.0, 961.6120000000003, 557, 2093, 1288.9, 1359.5499999999993, 1552.94, 3.6492354851658577, 5964.554305755757, 1.0904941977155787], "isController": false}, {"data": ["Ingestor Get Show With Children - Jumbo", 1000, 0, 0.0, 621.8829999999995, 406, 1419, 760.0, 799.9499999999999, 967.9100000000001, 3.6512207856696888, 643.7273823987426, 1.4940053800738278], "isController": false}, {"data": ["Ingestor Get Show With Children - Large", 1000, 0, 0.0, 507.92899999999975, 412, 1260, 613.8, 650.0, 822.95, 3.656494299525387, 644.6570991065356, 1.50330478525409], "isController": false}, {"data": ["Ingestor Get Episode", 1000, 0, 0.0, 1203.6650000000034, 879, 2501, 1475.9, 1569.6999999999996, 2210.55, 3.6424034034617403, 5953.3874949234005, 1.7856313559939392], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 10000, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
