'use client';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Case } from '../data/dummyCases';
import { SimulationNodeDatum } from 'd3';

interface Link extends d3.SimulationLinkDatum<Case> {
  source: string;
  target: string;
}

interface GraphProps {
  cases: Case[];
  onNodeClick: (node: Case) => void;
}

export default function Graph({ cases, onNodeClick }: GraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const rect = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || cases.length === 0 || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);
    
    svg.selectAll("*").remove();

    // Prepare data
    const links: Link[] = cases.flatMap(c => 
      c.relatedCases.map(r => ({
        source: c.id,
        target: r
      }))
    );

    // Create color scale for years
    const colorScale = d3.scaleSequential()
      .domain([d3.min(cases, d => d.year) || 2015, d3.max(cases, d => d.year) || 2023])
      .interpolator(d3.interpolate('#99E1B5', '#1A4731')); // Light green to dark green

    // Calculate padding based on maximum node size
    const maxNodeSize = Math.max(...cases.map(c => c.similarityScore * 20));
    const padding = maxNodeSize + 20;

    // Create forces with boundaries
    const simulation = d3.forceSimulation<Case>(cases)
      .force("link", d3.forceLink<Case, Link>(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-1000)) // Increased repulsion
      .force("collide", d3.forceCollide<Case>().radius(d => d.similarityScore * 40)) // Increased collision radius
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force("x", d3.forceX(dimensions.width / 2).strength(0.3))
      .force("y", d3.forceY(dimensions.height / 2).strength(0.3))
      // Add boundary forces
      .force("bounds", () => {
        for (let node of cases) {
          const r = (node.similarityScore * 20) + 10;
          node.x = Math.max(r, Math.min(dimensions.width - r, node.x || dimensions.width / 2));
          node.y = Math.max(r, Math.min(dimensions.height - r, node.y || dimensions.height / 2));
        }
      });

    // Create container group
    const g = svg.append("g");

    // Add zoom functionality
    svg.call(d3.zoom<SVGSVGElement, unknown>()
      .extent([[0, 0], [dimensions.width, dimensions.height]])
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      }));

    // Draw links
    const link = g.append("g")
      .selectAll<SVGLineElement, Link>("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    // Create node groups with hover container
    const node = g.append("g")
      .selectAll<SVGGElement, Case>("g")
      .data(cases)
      .join("g")
      .attr("data-node-id", d => d.id)   // Added this line
      .call(d3.drag<SVGGElement, Case>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Add circles to nodes
    node.append("circle")
      .attr("r", d => d.similarityScore * 30)
      .attr("fill", d => d.isReference ? "#f1f5f9" : colorScale(d.year))
      .attr("stroke", "#64748b")
      .attr("stroke-width", d => d.isReference ? 1 : 2)
      .attr("opacity", 0.9);

    // Add click event to nodes so that clicking the node triggers onNodeClick
    node.on("click", (event, d) => {
      event.stopPropagation();
      onNodeClick(d);
    });

    // Add similarity score for non-reference cases
    node.filter(d => !d.isReference)
      .append("text")
      .text(d => `${(d.similarityScore * 100).toFixed(0)}%`)
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .attr("pointer-events", "none");

    // Add case names with better visibility
    node.append("text")
      .text(d => {
        const maxLength = 25;
        return d.name.length > maxLength ? d.name.substring(0, maxLength) + "..." : d.name;
      })
      .attr("y", d => d.similarityScore * 30 + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#1a2b42")
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("stroke-width", "3px")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("font-weight", "500");

    // Add hover effects
    node.on("mouseover", function() {
      const tooltip = d3.select(this).select(".tooltip");
      tooltip.transition()
        .duration(200)
        .style("opacity", 1);
      
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("opacity", 1)
        .attr("stroke-width", 3);
    })
    .on("mouseout", function() {
      const tooltip = d3.select(this).select(".tooltip");
      tooltip.transition()
        .duration(200)
        .style("opacity", 0);
      
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("opacity", 0.9)
        .attr("stroke-width", 2);
    });

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      // Constrain nodes within bounds
      node.attr("transform", (d: any) => {
        const r = (d.similarityScore * 20) + 10;
        d.x = Math.max(r, Math.min(dimensions.width - r, d.x));
        d.y = Math.max(r, Math.min(dimensions.height - r, d.y));
        return `translate(${d.x},${d.y})`;
      });
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Case, Case>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = Math.max(padding, Math.min(dimensions.width - padding, event.x));
      event.subject.fy = Math.max(padding, Math.min(dimensions.height - padding, event.y));
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Case, Case>) {
      event.subject.fx = Math.max(padding, Math.min(dimensions.width - padding, event.x));
      event.subject.fy = Math.max(padding, Math.min(dimensions.height - padding, event.y));
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Case, Case>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [cases, dimensions, onNodeClick]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <svg 
        ref={svgRef} 
        className="w-full h-full"
        style={{ 
          background: "#f8f9fa",
          borderRadius: "0.5rem",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)"
        }} 
      />
    </div>
  );
}
