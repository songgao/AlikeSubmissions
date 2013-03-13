var graph = {};
graph.nodes = [];
graph.links = [];

function construct_nodes_and_links(alike_ones) {
    var data = [];
    for (var i = 0; i < alike_ones.length; i++) {
        if (alike_ones[i].Alikeness > 0.9) {
            data.push(alike_ones[i]);
        }
    }

    var names = {}
    for (var i = 0; i < data.length; i++) {
        names[data[i].File1] = true;
        names[data[i].File2] = true;
    }
    var counter = 0;
    var name_to_index = {};
    for (name in names) {
        graph.nodes.push({"name": name});
        name_to_index[name] = counter++;
    }
    for (var i = 0; i < data.length; i++) {
        graph.links.push({
            "source": name_to_index[data[i].File1],
            "target": name_to_index[data[i].File2],
            "value":  data[i].Alikeness
        });
    }
}

$(document).ready(function() {
    var width = 1200, height = 1200;
    var color = d3.scale.category20();
    var force = d3.layout.force().gravity(.05).charge(-120).linkDistance(function(d) {
        console.log(d);
        return (1.01-d.value) * 800;
    }).size([width, height]);
    var svg = d3.select("#content").append("svg").attr("width", width).attr("height", height);

    d3.json("alike_ones_masked.json", function(error, alike_ones) {
        console.log(error);
        construct_nodes_and_links(alike_ones);
        force.nodes(graph.nodes).links(graph.links).start();
        var link = svg.selectAll(".link").data(graph.links).enter().append("line").attr("class", "link");
        var node = svg.selectAll(".node").data(graph.nodes).enter().append("g").call(force.drag);

        node.append("circle").attr("r", 5).style("fill", function(d) { return color(d.index);});
        node.append("text").attr("dx", 12).attr("dy", ".35em").text(function(d) {
            return d.name;
        });
        link.append("title").text(function(l) {
            return l.value;
        });

        force.on("tick", function() {
            link.attr("x1", function(d) {
                return d.source.x;
            }) .attr("y1", function(d){
                return d.source.y;
            }).attr("x2", function(d) {
                return d.target.x;
            }) .attr("y2", function(d) {
                return d.target.y;
            });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
    });
});
