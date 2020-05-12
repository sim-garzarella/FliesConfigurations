var id = "#fly"

var updateTime = 1000;

var config = 0;
var configurations = 5;

var width = 1000;
var height = 450;

var pressingYKey = false;

var svg = d3.select(id)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + width + " " + height);

function updateDrawing(data) {

  var positions = data["positions"];

  var fly = svg.selectAll(".fly").data(positions, function(d){return d.fly});

  fly.enter().append("svg:image").attr("xlink:href", "../data/fly-shape.svg")
                          .attr("class","fly")
                          .attr("height", "100px")
                          .attr("width", "100px")
                          .attr("x", function(d) {return d.position.x})
                          .attr("y", function(d) {return d.position.y});

  fly.transition().duration(updateTime)
                   .attr("x", function(d) { return d.position.x; })
                   .attr("y", function(d) { return d.position.y; });
}

d3.json("../data/configurations.json").then(

  function(data) {

    updateDrawing(data[0]);

    document.addEventListener("keydown", function() {
      if (event.key == "y") {
        pressingYKey = true;
      }
    });

    document.addEventListener("keyup", function() {
      pressingYKey = false;
    });

    d3.selectAll(".fly").on("click", function() { return click()})

    function click() {

      if(pressingYKey){

      if(config==configurations-1) {
        config = 0;
      }
      else config++;

      updateDrawing(data[config]);
    }
    }
  },
  function(error) {
    throw error;
  });
