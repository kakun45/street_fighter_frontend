// todo: data must come from backend rather than hardcoded

// moved back to script.js
const actions = [
  { id: 1, content: "DR", other: [], root: true }, // 0 LEVEL
  { id: 2, content: "C.LK", other: [] }, // 1 LEVEL
  { id: 3, content: "DF+MP", other: [] },
  { id: 4, content: "MP", other: [] },
  { id: 5, content: "C.LP", other: [] },
  { id: 6, content: "C.MK", other: [] },
  { id: 7, content: "LK", other: [] },
  { id: 8, content: "LP", other: [] },
  { id: 9, content: "D+MK", other: [] },
  { id: 10, content: "MP", other: [] }, // 2 LEVEL
  { id: 11, content: "C.MP", other: [] },
  { id: 12, content: "D+MP", other: [] },
  { id: 13, content: "MP", other: [] }, // 3 LEVEL
  // { id: 14, content: "QCF+HP", other: [] },
  // { id: 15, content: "QCB+LP", other: [] },
  // { id: 16, content: "QCF+PP", other: [] },
  // { id: 17, content: "QCB+PP", other: [] },
  // { id: 18, content: "HK", other: [] }, // 4 LEVEL
  // { id: 19, content: "QCF+P", other: [] },
  // { id: 20, content: "QCF+PDR", other: [] }, // ...
];

const edges = [
  // LEVEL [3]
  // { startId: 15, endId: 18 }, // QCB+LP->
  // LEAF node
  // { startId: 13, endId: 18 }, // MP->HK
  // LEVEL [2]
  { startId: 9, endId: 12 }, // D+MK->D+MP
  { startId: 8, endId: 11 }, // LP->C.MP
  { startId: 7, endId: 11 }, // LK->C.MP
  { startId: 6, endId: 11 }, // C.MK->C.MP
  { startId: 5, endId: 11 }, // C.LP->C.MP
  { startId: 4, endId: 10 }, // MP->MP
  { startId: 3, endId: 10 }, // DF+MP->MP
  { startId: 2, endId: 10 }, // C.LK->MP
  // LEVEL [1]
  { startId: 1, endId: 9 }, // DR->D+MK
  { startId: 1, endId: 8 }, // DR->LP
  { startId: 1, endId: 7 }, // DR->LK
  { startId: 1, endId: 6 }, // DR->C.MK
  { startId: 1, endId: 5 }, // DR->C.LP
  { startId: 1, endId: 4 }, // DR->MP
  { startId: 1, endId: 3 }, // DR->DF+MP
  { startId: 1, endId: 2 }, // DR->C.LK
];

module.exports = { actions, edges }; // arr of JS objects
