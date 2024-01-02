"use client";
import React, { useState, useEffect, useRef } from "react";
import SvgComponent from "./svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DynamicSvgComponent = () => {
  const [svgSize, setSvgSize] = useState(250);
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.setAttribute("width", svgSize);
      svgRef.current.setAttribute("height", svgSize);
    }
  }, [svgSize]);

  const handleGenerate = () => {
    const newSize = parseInt(document.getElementById("sizeInput").value, 10);
    setSvgSize(newSize);
  };

  const handleDownload = () => {
    if (svgRef.current) {
      const svgContent = new XMLSerializer().serializeToString(svgRef.current);
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "generated_svg.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex w-full max-w-md items-center space-x-2">
        <Label htmlFor="sizeInput">Enter SVG size-PX</Label>
        <Input type="number" id="sizeInput" placeholder="Here..." />
        <Button onClick={handleGenerate}>Generate</Button>
        <Button onClick={handleDownload}>Download</Button>
      </div>
      <div style={{ marginTop: "15px" }}>
        <SvgComponent ref={svgRef} width={svgSize} height={svgSize} />
      </div>
    </div>
  );
};
export default DynamicSvgComponent;
