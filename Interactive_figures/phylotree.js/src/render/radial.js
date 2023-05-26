import { xCoord, yCoord } from "./coordinates";

function radialMapper(r, a, radial_center) {
  return {
    x: radial_center + r * Math.sin(a),
    y: radial_center + r * Math.cos(a)
  };
}

function cartesianMapper(x, y, radial_center) { // eslint-disable-line
  return polarToCartesian(x - radial_center, y - radial_center);
}

function polarToCartesian(x, y) {
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let a = Math.atan2(y, x);
  return [r, a];
}

export function cartesianToPolar(
  node,
  radius,
  radial_root_offset,
  radial_center,
  scales,
  size
) {

  node.radius = radius * (node.radius + radial_root_offset);

  //if (!node.angle) {
  node.angle = 2 * Math.PI * node.x * scales[0] / size[0];
  //}

  let radial = radialMapper(node.radius, node.angle, radial_center);

  node.x = radial.x;
  node.y = radial.y;

  return node;

}

export function drawArc(radial_center, points) {


  var start = radialMapper(points[0].radius, points[0].angle, radial_center),
    end = radialMapper(points[0].radius, points[1].angle, radial_center);

  return (
    "M " +
    xCoord(start) +
    "," +
    yCoord(start) +
    " A " +
    points[0].radius +
    "," +
    points[0].radius +
    " 0,0, " +
    (points[1].angle > points[0].angle ? 1 : 0) +
    " " +
    xCoord(end) +
    "," +
    yCoord(end) +
    " L " +
    xCoord(points[1]) +
    "," +
    yCoord(points[1])
  );
}

export function arcSegmentPlacer(edge, where, radial_center) {
  var r = radialMapper(
    edge.target.radius + (edge.source.radius - edge.target.radius) * where,
    edge.target.angle,
    radial_center
  );
  return { x: xCoord(r), y: yCoord(r) };
}
