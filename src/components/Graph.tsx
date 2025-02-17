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
        const { width, height } = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height: Math.max(height, 600) });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || cases.length === 0 || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);
    
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

    // Adjust force simulation strengths
    const simulation = d3.forceSimulation<Case>(cases)
      .force("link", d3.forceLink<Case, Link>(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-500)) // Increased repulsion
      .force("collide", d3.forceCollide<Case>().radius(d => d.similarityScore * 40)) // Increased collision radius
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force("x", d3.forceX(dimensions.width / 2).strength(0.1))
      .force("y", d3.forceY(dimensions.height / 2).strength(0.1));

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

    // Create node groups
    const node = g.append("g")
      .selectAll<SVGGElement, Case>("g")
      .data(cases)
      .join("g")
      .call(d3.drag<SVGGElement, Case>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Add circles to nodes
    node.append("circle")
      .attr("r", d => d.similarityScore * 20)
      .attr("fill", d => colorScale(d.year))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("opacity", 0.9);

    // Add hover effect
    node.selectAll("circle")
      .on("mouseover", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 1)
          .attr("stroke-width", 3);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 0.9)
          .attr("stroke-width", 2);
      });

    // Add labels to nodes
    node.append("text")
      .text(d => d.id)
      .attr("x", d => d.similarityScore * 20 + 5)
      .attr("y", 4)
      .attr("font-size", "12px")
      .attr("fill", "#102B3F")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.5)
      .attr("paint-order", "stroke");

    // Add click handler
    node.on("click", (event, d) => {
      event.stopPropagation();
      onNodeClick(d);
    });

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Case, Case>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Case, Case>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
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
    <svg 
      ref={svgRef} 
      className="w-full h-full"
      style={{ 
        background: "#f8f9fa",
        borderRadius: "0.5rem",
        boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)"
      }} 
    />
  );
}
