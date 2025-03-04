# Graph Visualization README

## Overview

This project fetches and processes action data from a backend API, then structures and visualizes it as a directed graph. The graph consists of nodes (representing actions) and edges (representing relationships between actions). It calculates node positions dynamically based on hierarchy depth and spacing, ensuring a structured layout for visualization.

## Features

- Fetches Action Data: Retrieves action data from `http://localhost:8000/actions`.

- Node and Edge Processing:

  - Stores nodes in an array and creates a lookup dictionary (`nodesById`).

  - Modifies nodes to include child relationships based on edges.

  - Computes node depth recursively to determine hierarchical structure.

  - Sets node positions dynamically based on depth and predefined spacing constants.

- Graph Drawing Functions:

  - `drawGraph()`: Placeholder function for future graph rendering.

  - `exportTest(msg)`: Utility function for logging messages.

- Utility Functions:

  - `textToNodeSize(text)`: Calculates node size based on text content.

  - `measureTextWidth(text, font)`: Measures text width for node sizing.

  - `createSvgCanvas({ x, y, h, w, id })`: Creates an SVG canvas for visualization.

  - `getTopMiddlePos(node)`: Computes the top middle position of a node.

  - `getBottomMiddlePos(node)`: Computes the bottom middle position of a node.

## Constants

Several global constants define layout properties:

- `MONOFONTFONT`: Font used for text width measurement.

- `LEFTPADDING`: Padding inside nodes.

- `NODEHEIGHT`: Height of each node.

- `ROOTOFFSET`: Offset for root node positioning.

- `XSPACEBETWEENLEVELS`: Spacing between node levels.

## Data Processing Workflow

1. Fetch Data: Retrieves `actions` and `edges` from the backend.

2. Create Nodes: Initializes an array of nodes and a lookup dictionary (`nodesById`).

3. Link Nodes: Uses edges to assign child IDs to each node.

4. Set Node Depth: Recursively assigns depth values to nodes.

5. Position Nodes: Adjusts node positions based on depth and spacing.

6. Verify Graph Consistency: Checks for discrepancies between node and edge counts.

## Error Handling

- Logs an error if there is a mismatch between the number of edges and nodes.

- Handles cases where text content is missing or empty by defaulting to a placeholder text (`"123"`).

## Future Enhancements

- Implement the `drawGraph()` function to render the graph visually.

- Improve error handling for cyclic dependencies.

- Extend API integration to support dynamic updates.

- Allow customization of graph styles via configuration settings.

## Requirements

- JavaScript (ES6+)

- A backend API running on `http://localhost:8000` that provides `actions` and `edges`

- A browser environment for execution and visualization
