import * as _ from "underscore";

// These methods are part of the Phylotree object

export function graftANode(graftAt, newChild, newParent, lengths) {

  let nodes = this.nodes.descendants();

  if (graftAt.parent) {

    let nodeIndex = nodes.indexOf(graftAt);

    if (nodeIndex >= 0) {

      let parentIndex = graftAt.parent.children.indexOf(graftAt);

      let newSplit = {
          name: newParent,
          parent: graftAt.parent,
          attribute: lengths ? lengths[2] : null,
          original_child_order: graftAt["original_child_order"]
        },
        newNode = {
          name: newChild,
          parent: newSplit,
          attribute: lengths ? lengths[1] : null,
          original_child_order: 2
        };

      newSplit["children"] = [graftAt, newNode];
      graftAt["parent"].children[parentIndex] = newSplit;
      graftAt.parent = newSplit;
      graftAt["attribute"] = lengths ? lengths[0] : null;
      graftAt["original_child_order"] = 1;
    }
  }

  return this;

}

export function addChild(parent, child) {

  if(parent.children) {
    parent.children.push(child);
  } else {
    parent["children"] = [child];
  }

  return parent;

}

export function createNode(name, lengths) {

  return {
    data: {
      name: name,
      attribute: lengths ? lengths[1] : null
    },
    parent: '',
  };

}

/**
 * Delete a given node.
 *
 * @param {Node} The node to be deleted, or the index of such a node.
 * @returns The current ``phylotree``.
 */
export function deleteANode(index) {
  let nodes = this.nodes.descendants();

  if (typeof index != "number") {
    return this.deleteANode(nodes.indexOf(index));
  }

  if (index > 0 && index < nodes.length) {
    let node = nodes[index];

    if (node.parent) {
      // can only delete nodes that are not the root
      let delete_me_idx = node.parent.children.indexOf(node);

      if (delete_me_idx >= 0) {
        nodes.splice(index, 1);

        if (node.children) {
          node.children.forEach(function(d) {
            d["original_child_order"] = node.parent.children.length;
            node.parent.children.push(d);
            d.parent = node.parent;
          });
        }

        if (node.parent.children.length > 2) {
          node.parent.children.splice(delete_me_idx, 1);
        } else {
          if (node.parent.parent) {
            node.parent.parent.children[
              node.parent.parent.children.indexOf(node.parent)
            ] =
              node.parent.children[1 - delete_me_idx];
            node.parent.children[1 - delete_me_idx].parent = node.parent.parent;
            nodes.splice(nodes.indexOf(node.parent), 1);
          } else {
            nodes.splice(0, 1);
            nodes.parent = null;
            delete nodes.data["attribute"];
            delete nodes.data["annotation"];
            delete nodes.data["original_child_order"];
            nodes.name = "root";
            nodes.data.name = "root";
          }
        }
      }
    }
  }

  return this;
}

/**
 * Get the tips of the tree
 * @returns {Array} Nodes in the current ``phylotree``.
 */
export function getTips() {
  // get all nodes that have no nodes
  return _.filter(this.nodes.descendants(), n => {
    return !_.has(n, "children");
  });
}

/**
 * Get the internal nodes of the tree
 * @returns {Array} Nodes in the current ``phylotree``.
 */
export function getInternals() {
  // get all nodes that have no nodes
  return _.filter(this.nodes.descendants(), n => {
    return _.has(n, "children");
  });
}


/**
 * Get the root node.
 *
 * @returns the current root node of the ``phylotree``.
 */
export function getRootNode() {
  return this.nodes;
}

/**
 * Get an array of all nodes.
 * @returns {Array} Nodes in the current ``phylotree``.
 */
export function getNodes() {
  return this.nodes;
}

/**
 * Get a node by name.
 *
 * @param {String} name Name of the desired node.
 * @returns {Node} Desired node.
 */
export function getNodeByName(name) {
  return _.filter(this.nodes.descendants(), d => {
    return d.data.name == name;
  })[0];
}

/**
 * Add attributes to nodes. New attributes will be placed in the
 * ``annotations`` key of any nodes that are matched.
 *
 * @param {Object} attributes An object whose keys are the names of nodes
 * to modify, and whose values are the new attributes to add.
 */
export function assignAttributes(attributes) {
  //return nodes;
  // add annotations to each matching node
  _.each(this.nodes.descendants(), function(d) {
    if (d.data && (d.data.name in attributes)) {
      d["annotations"] = attributes[d.data.name];
    }
  });
}

/**
 * Determine if a given node is a leaf node.
 *
 * @param {Node} A node in a tree.
 * @returns {Bool} Whether or not the node is a leaf node.
 */
export function isLeafNode(node) {
  return !_.has(node, "children")
}

/**
 * Update a given key name in each node.
 *
 * @param {String} old_key The old key name.
 * @param {String} new_key The new key name.
 * @returns The current ``this``.
 */
export function updateKeyName(old_key, new_key) {
  this.nodes.each(function(n) {
    if (old_key in n) {
      if (new_key) {
        n[new_key] = n[old_key];
      }
      delete n[old_key];
    }
  });

  return this;
}

export function clearInternalNodes(respect) {
  if (!respect) {
    this.nodes.each(d => {
      if (!isLeafNode(d)) {

        // TODO: Move away from storing attribute data as root (BREAKS occasionally with d3>3)
        d[this.selection_attribute_name] = false;

        if(!d.data.traits) {
          d.data.traits = {};
        }
        d.data.traits[this.selection_attribute_name] = d[this.selection_attribute_name];

      }
    });
  }
}


