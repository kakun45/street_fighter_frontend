// Generating a tree diagram from ‘flat’ data
// http://www.d3noob.org/2014/01/tree-diagrams-in-d3js_11.html

var data = [
  { name: "ABC", parent: "DEF", relation: "ghi", depth: 1 },
  { name: "DEF", parent: "null", relation: "null", depth: 0 },
  { name: "new_name", parent: "ABC", relation: "rel", depth: 2 },
  { name: "new_name2", parent: "ABC", relation: "foo", depth: 2 },
  { name: "Foo", parent: "DEF", relation: "rel", depth: 2 },
];

//  create an obj of nodes by a node.name as a key and obj as a val
let dataMap = data.reduce((map, node) => {
  // console.log(map[node.name], node, typeof map);
  map[node.name] = node;
  return map;
}, {});

console.log(dataMap);
// output: {
//   ABC: { name: 'ABC', parent: 'DEF', relation: 'ghi', depth: 1 },
//   DEF: { name: 'DEF', parent: 'null', relation: 'null', depth: 0 },
//   new_name: { name: 'new_name', parent: 'ABC', relation: 'rel', depth: 2 },
//   new_name2: { name: 'new_name2', parent: 'ABC', relation: 'foo', depth: 2 },
//   Foo: { name: 'Foo', parent: 'DEF', relation: 'rel', depth: 2 }
// }

// create tree arr use dataMap. Iteratively add each child to its parents, or to the root array if no parent is found;
let treeData = [];
data.forEach((node) => {
  // get *optional* parent
  let parent = dataMap[node.parent];
  if (parent) {
    // create a children arr if it doesn't exist or grab it
    (parent.children || (parent.children = [])).push(node);
  } else {
    // parent is null
    treeData.push(node);
  }
});

console.log(JSON.stringify(treeData, null, 2)); // pretty view of json: (data, null ,2)
// [
// {
//   "name": "DEF",
//   "parent": "null",
//   "relation": "null",
//   "depth": 0,
//   "children": [
//     {
//       "name": "ABC",
//       "parent": "DEF",
//       "relation": "ghi", ...
