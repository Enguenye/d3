//Reto 1
const canvas = d3.select("#canvas");

const data = [
    { name: "Juan", age: 3 },
    { name: "Fernanda", age: 16 },
    { name: "María", age: 7 },
    { name: "Sandra", age: 35 }
];

const tabla = canvas.append("table");
tabla.append("th").text("Nombre");
tabla.append("th").text("Edad");
data.forEach(d => {
    tabla.append("tr")
    tabla.append("td").text(d.name)
    tabla.append("td").text(d.age)
});
const tabla2 = canvas.append("table");

//Reto 2
const svg = (e) => {
    tabla2.append("th").text(e.name)
    let r = tabla2.append("svg");
    r.attr("width", 100);
    r.attr("heigth", e.age);

    r.append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 100)
        .attr("height", e.age)
        .style("fill", "red");
    return r;

}


const ul = canvas.append("ul");

const li = ul.selectAll("li").data(data);

data.forEach(d => {
    svg(d);
})


//Reto 3

d3.json("https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json").then(data => {
    const width = 700;
    const height = 700;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear()
        .domain([0, 1000000])
        .range([0, iheight]);

    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, iwidth])
        .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("y", d => x(d.name))
        .attr("x", d => 0)
        .attr("width", d => y(d.value))
        .attr("height", x.bandwidth())

    g.append("g")
        .classed("y--axis", true)
        .call(d3.axisBottom(y))
        .attr("transform", `translate(0, ${iheight})`);

    g.append("g")
        .classed("x--axis", true)
        .call(d3.axisLeft(x));
});

//Reto 4
d3.json("https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json").then(data => {
    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([iheight, 0]);

    const x = d3.scaleLinear()
        .domain([0,60000])
        .range([0, iwidth]);

    const bars = g.selectAll("rect").data(data);

    bars.enter().append("ellipse").attr("cx", d=>  x(d.purchasingpower))
        .style("fill", "white")
        .attr("stroke","black")
        .attr("opacity",0.5)
        .attr("cy", d=> y(d.lifeexpectancy))
        .attr("rx", d=> d.population/1500000)
        .attr("ry", d=> d.population/1500000);

        bars.enter().append("text")
        .attr("dx", function(d){return x(d.purchasingpower)})
        .attr("dy", function(d){return y(d.lifeexpectancy)})
        .text(function(d){return d.country});

    g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);

    g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
});





