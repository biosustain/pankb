import { isLeafNode } from "../nodes";
import { css_classes } from "./options";

let d3_layout_phylotree_event_id = "phylotree.event";

/**
 * Toggle collapsed view of a given node. Either collapses a clade into
 * a smaller blob for viewing large trees, or expands a node that was
 * previously collapsed.
 *
 * @param {Node} node The node to toggle.
 * @returns {Phylotree} The current ``phylotree``.
 */
export function toggleCollapse(node) {
  if (node.collapsed) {
    node.collapsed = false;

    let unhide = function(n) {
      if (!isLeafNode(n)) {
        if (!n.collapsed) {
          n.children.forEach(unhide);
        }
      }
      n.hidden = false;
    };

    unhide(node);
  } else {
    node.collapsed = true;
  }

  this.placenodes();
  return this;
}

export function resizeSvg(tree, svg, tr) {

  let sizes = this.size;

  if (this.radial()) {
    let pad_radius = this.pad_width(),
      vertical_offset =
        this.options["top-bottom-spacing"] != "fit-to-size"
          ? this.pad_height()
          : 0;

    sizes = [
      sizes[1] + 2 * pad_radius,
      sizes[0] + 2 * pad_radius + vertical_offset
    ];

    if (svg) {
      svg
        .selectAll("." + css_classes["tree-container"])
        .attr(
          "transform",
          "translate (" +
            pad_radius +
            "," +
            (pad_radius + vertical_offset) +
            ")"
        );
    }
  } else {

    sizes = [
      sizes[0] +
        (this.options["top-bottom-spacing"] != "fit-to-size"
          ? this.pad_height()
          : 0),
      sizes[1] +
        (this.options["left-right-spacing"] != "fit-to-size"
          ? this.pad_width()
          : 0)
    ];

  }

  if (svg) {

    if (tr) {
      svg = svg.transition(100);
    }

    svg.attr("height", sizes[0]).attr("width", sizes[1]);

  }

  this.size = sizes;

  return sizes;

}

export function rescale(scale, attr_name) {
  attr_name = attr_name || "y_scaled";
  if (attr_name in this) {
    this[attr_name] *= scale;
  }
}

export function triggerRefresh(tree) {

  var event = new CustomEvent(d3_layout_phylotree_event_id, {
    detail: ["refresh", tree]
  });

  document.dispatchEvent(event);

}

export function countUpdate(tree, counts) {
  var event = new CustomEvent(d3_layout_phylotree_event_id, {
    detail: ["countUpdate", counts, tree.countHandler()]
  });
  document.dispatchEvent(event);
}

export function d3PhylotreeTriggerLayout(tree) {
  var event = new CustomEvent(d3_layout_phylotree_event_id, {
    detail: ["layout", tree, tree.layoutHandler()]
  });
  document.dispatchEvent(event);
}

export function d3PhylotreeEventListener(event) {
  switch (event.detail[0]) {
    case "refresh":
      event.detail[1].refresh();
      break;
    case "countUpdate":
      event.detail[2](event.detail[1]);
      break;
    case "layout":
      event.detail[2](event.detail[1]);
  }
  return true;
}

export function d3PhylotreeAddEventListener() {
  document.addEventListener(
    d3_layout_phylotree_event_id,
    d3PhylotreeEventListener,
    false
  );
}

export function d3PhylotreeSvgTranslate(x) {
  if (x && (x[0] !== null || x[1] !== null))
    return (
      "translate (" +
      (x[0] !== null ? x[0] : 0) +
      "," +
      (x[1] !== null ? x[1] : 0) +
      ") "
    );

  return "";
}

export function d3PhylotreeSvgRotate(a) {
  if (a !== null) {
    return "rotate (" + a + ") ";
  }
  return "";
}
