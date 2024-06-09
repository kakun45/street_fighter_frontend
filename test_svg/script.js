//  ===== Declare const variables in the global scope  =====
const MONOFONTFONT = "13px 'Roboto Mono'",
  LEFTPADDING = 10, // padding for nodeText on both sides inside the node
  NODEHEIGHT = 20,
  ROOTOFFSET = 5,
  XSPACEBETWEENLEVELS = 20;

//  ===== Comes from Backend (service call or a file): =====
const actions = [
  { id: 1, content: "DR", other: [], root: true },
  { id: 2, content: "C.LK", other: [] },
  { id: 3, content: "DF+MP", other: [] },
  { id: 4, content: "MP", other: [] },
];

// IDs
const edges = [
  { startId: 2, endId: 4 },
  { startId: 3, endId: 4 },
  { startId: 1, endId: 3 },
  { startId: 1, endId: 2 },
];

// ===================== FRONTEND =====================

// result of layout function, that will live on the front
const nodes = [
  {
    action: actions[0],
    position: [150, 5], // x, y
    nodeSize: textToNodeSize(actions[0].content), // w&h: [100, 20]
    // wDepth: 5,
  },
  {
    action: actions[1],
    position: [40, 45],
    nodeSize: textToNodeSize(actions[1].content),
  },
  {
    action: actions[2],
    position: [250, 45],
    nodeSize: textToNodeSize(actions[2].content),
  },
  {
    action: actions[3],
    position: [150, 85],
    nodeSize: textToNodeSize(actions[3].content),
  },
];

// nodesById is a dictionary of node_id -> node. lookup nodes==id
const nodesById = {};
nodes.forEach((node) => {
  nodesById[node.action.id] = node;
});

// measures len(monospaced_text)*px of one letter + padding*2 for L&R
// const font = "13px 'Roboto Mono'"; // Font used for measuring text width
// const texWidth = measureTextWidth(nodeText, font); //, font); // Measure text width
// rectWidth = texWidth + 2 * padding; // Calculate rect width with padding
// Fn calculates the size given a text, return arr [w, h] in standard order: w&h x&y
function textToNodeSize(text) {
  // Calculate <rect> width: measure text add 2ce of padding on the sides
  const nodeWidth = measureTextWidth(text, MONOFONTFONT) + 2 * LEFTPADDING;
  return [nodeWidth, NODEHEIGHT];
}

// utility function to measure text width of text string
function measureTextWidth(text, font) {
  if (text === "" || text === null || text === undefined) {
    text = "123";
  }
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  context.font = font;
  return context.measureText(text).width;
}

const createSvgCanvas = ({
  x = 0,
  y = 0,
  h = 400,
  w = 400,
  id = null,
} = {}) => {
  let strokeWidth = 3,
    stroke = "green",
    newCanvas = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg" // Creates the SVG element in the SVG namespace
    );
  newCanvas.setAttribute("x", x);
  newCanvas.setAttribute("y", y);
  newCanvas.setAttribute("width", w);
  newCanvas.setAttribute("height", h);
  newCanvas.setAttribute("stroke", stroke);
  newCanvas.setAttribute("stroke-width", strokeWidth);
  // Set the id attribute if provided
  if (id) {
    newCanvas.setAttribute("id", id);
  }
  return newCanvas;
};

// given a node return topMiddle position of the node
// returns x, y: [190, 5]
const getTopMiddlePos = (node) => {
  const [x, y] = node.position,
    width = node.nodeSize[0],
    midX = x + width / 2;
  return [midX, y];
};
// given a node return bottomMiddle position of the node
const getBottomMiddlePos = (node) => {
  const [x, y] = node.position,
    h = node.nodeSize[1], // height
    w = node.nodeSize[0], // width
    midX = x + w / 2,
    bottomY2 = y + h;
  return [midX, bottomY2];
};

// draw an edge given a start id and end id
const createEdgeObj = (fromNode, toNode) => {
  const [fromX, fromY] = getBottomMiddlePos(fromNode),
    [toX, toY] = getTopMiddlePos(toNode);
  const strokeWidth = 6,
    color = "blue",
    newLine = document.createElementNS("http://www.w3.org/2000/svg", "line"); //Create a Line in SVG's namespace

  newLine.setAttribute("x1", fromX); // horizontally: from
  newLine.setAttribute("x2", toX); // horizontally: to
  newLine.setAttribute("y1", fromY); // vertically: from
  newLine.setAttribute("y2", toY); // vertically: to
  newLine.setAttribute("stroke", color);
  newLine.setAttribute("stroke-width", strokeWidth);
  return newLine;
};

// create a <text>, create <rect>, attach both to <g> group; return <g>
const createNodeObj = (node) => {
  const [rectX, rectY] = node.position,
    nodeText = node.action.content;
  if (typeof rectX !== "number") {
    throw new Error(`rectX is not a number rectX=${rectX}`);
  }
  const rectStroke = "black", // todo destructure it too
    textColor = "black",
    strokeWidth = 2,
    rx = 5, // x rect rounded edge
    ry = 5, // y rect rounded edge
    gFill = "white"; // fill color of all grouped elements

  const [w, h] = textToNodeSize(nodeText);
  // Create and set up the <rect> & <text> elements
  let newGroup = document.createElementNS("http://www.w3.org/2000/svg", "g"); // Create a <g> in SVG's namespace
  let newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect"); // Create a <rect> in SVG's namespace
  let newText = document.createElementNS("http://www.w3.org/2000/svg", "text"); // Create a <text> in SVG's namespace

  newRect.setAttribute("width", w);
  newRect.setAttribute("height", h);
  newRect.setAttribute("x", rectX);
  newRect.setAttribute("y", rectY);
  newRect.setAttribute("rx", rx);
  newRect.setAttribute("ry", ry);
  newRect.setAttribute("stroke", rectStroke);

  newText.setAttribute("x", rectX + w / 2); // x of the starting point of the text baseline
  newText.setAttribute("y", rectY + h / 2);
  // newText.setAttribute("y", rectY + NODEHEIGHT / 2 + 13 / 3); // y of the starting point of the text baseline. 13px is height of font on class .small. 3 is because the text is placed in the 1/3 of the node's height
  newText.setAttribute("class", "small");
  newText.setAttribute("text-anchor", "middle"); // horizontally centered: relative to its X&Y
  newText.setAttribute("dominant-baseline", "central"); // Vertically centers the text
  newText.setAttribute("fill", textColor); // Text color
  newText.textContent = nodeText; // Text content on node

  newGroup.setAttribute("fill", gFill);
  newGroup.setAttribute("stroke-width", strokeWidth);
  newGroup.appendChild(newRect); // Append the rect to the SVG element
  newGroup.appendChild(newText); // Append the text to the SVG element
  return newGroup;
};

// ===================== layout code =====================
// Relative Positioning: Each node is positioned relative to this central X coordinate.
function calculateNodeX(node, depth, centerOfParent = null) {
  // todo:
  // use rectX = grandCentralX - rectWidth / 2
  // ? may need to know how many children are on the same level & what are their totalWidths, they all must share the level screen width, or think about relocation if too many
  // or if a node is alone on their depth but do not need to be centered relatve to grandCenterX, then it needs to know a grandCentralX of its parent(-s)
  // x = parentCenter - rectWidth/2 (single parent on offset of grandCentralX)
  // x = parentCenter1 + (parentCenter2 - parentCenter1) /2  (2 parents) ...
  // what to do if there are 3,4,8 parentsCenters?
  // return X
}

// calculate the level position offset (Y) by the depth of a node, need nodeH & top offset
// 0 -> 5;
// 1 -> 45=(5+20H)+20space
// 2 -> 85=(5top+20H)+20space+(20H)+20space
const levelNumToOffsetY = (depth) => {
  let levelOffset = ROOTOFFSET;
  for (let i = 0; i < depth; i++) {
    levelOffset += NODEHEIGHT + XSPACEBETWEENLEVELS;
  }
  return levelOffset;
};

window.onload = () => {
  console.log("page is fully loaded");

  let svg = document.getElementById("svg-container");
  // Get the center X coordinate of the scv
  let svgWidth = svg.clientWidth;
  // calculate the center of the screen & draw some things based of that
  let grandCentralX = svgWidth / 2; // 200

  // ============== DRAW CANVAS ==============
  // default args: x = 0, y = 0, h = 400, w = 400, id = null
  // svg.appendChild(createSvgCanvas({ id: "test_id" }));

  // ============== DRAW EDGES ==============
  edges.forEach((edge) => {
    const startNode = nodesById[edge.startId],
      endNode = nodesById[edge.endId];
    svg.appendChild(createEdgeObj(startNode, endNode));
  });
  // ============== DRAW NODES ==============
  // left Child it centered by a coinsedence, create a Fn to calc. positions of X for Nodes
  nodes.forEach((node) => {
    svg.appendChild(createNodeObj(node)); // grandchildren < children < root
  });
};
