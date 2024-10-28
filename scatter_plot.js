// Load the CSV data
d3.csv("iris.csv").then(data => {
    // Convert data types
    data.forEach(d => {
        d.PetalLength = +d.PetalLength;
        d.PetalWidth = +d.PetalWidth;
    });

    // Set dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG canvas
    const svg = d3.select("#scatter")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.PetalLength))
        .range([0, width]);
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.PetalWidth))
        .range([height, 0]);

    // Add circles for each data point
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.PetalLength))
        .attr("cy", d => yScale(d.PetalWidth))
        .attr("r", 5)
        .attr("fill", d => {
            if (d.Species === "Iris-setosa") return "red";
            else if (d.Species === "Iris-versicolor") return "blue";
            else return "green";
        });

    // Add axes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));
    
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.bottom})`)
        .style("text-anchor", "middle")
        .text("Petal Length");
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .style("text-anchor", "middle")
        .text("Petal Width");
});
