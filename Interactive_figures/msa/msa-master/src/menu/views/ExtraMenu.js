import MenuBuilder from "../menubuilder";
import Seq from "../../model/Sequence";
import Loader from "../../utils/loader";
const xhr = require("xhr");

const ExtraMenu = MenuBuilder.extend({

  initialize: function(data) {
    this.g = data.g;
    this.el.style.display = "inline-block";
    return this.msa = data.msa;
  },

  render: function() {
    this.setName("Extras");
    var stats = this.g.stats;
    var msa = this.msa;
    this.addNode("Add consensus seq", () => {
      var con = stats.consensus();
      var seq = new Seq({
        seq: con,
        id: "0c",
        name: "Consenus"
      });
      this.model.add(seq);
      this.model.setRef(seq);
      this.model.comparator = function(seq) {
        return !seq.get("ref");
      };
      return this.model.sort();
    });

    // @addNode "Calc Tree", ->
    //   # this is a very experimental feature
    //   # TODO: exclude msa & tnt in the adapter package
    //   newickStr = ""
    //
    //   cbs = Loader.joinCb ->
    //     msa.u.tree.showTree nwkData
    //   , 2, @
    //
    //   msa.u.tree.loadTree cbs
    //   # load fake tree
    //   nwkData =
    //     name: "root",
    //     children: [
    //       name: "c1",
    //       branch_length: 4
    //       children: msa.seqs.filter (f,i) ->  i % 2 is 0
    //     ,
    //       name: "c2",
    //       children: msa.seqs.filter (f,i) ->  i % 2 is 1
    //       branch_length: 4
    //     ]
    //   msa.seqs.each (s) ->
    //     s.set "branch_length", 2
    //   cbs()

    this.addNode("Jump to a column", () => {
      var offset = prompt("Column", "20");
      if (offset < 0 || offset > this.model.getMaxLength() || isNaN(offset)) {
        alert("invalid column");
        return;
      }
      return this.g.zoomer.setLeftOffset(offset);
    });

    this.el.appendChild(this.buildDOM());
    return this;
  }
});
export default ExtraMenu;
