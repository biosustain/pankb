import React from 'react';
import { AlignmentViewer, FastaAlignment } from "alignment-viewer-2";

const App = () => {
    const fastaFileText = ">target\n" +
        "ATGCATGC\n" +
        ">seq1\n" +
        "AAAACCCC\n" +
        ">seq2\n" +
        "ATGCATTT\n" +
        ">seq3\n" +
        "ATGCAAAA\n";

    const alignmentObj = FastaAlignment.fromFileContents(
        "ALIGNMENT_NAME", fastaFileText
    );

    return (
        <AlignmentViewer alignment={ alignmentObj } style={ alignmentObj.getDefaultStyle() } />
    );
}

export default App;
