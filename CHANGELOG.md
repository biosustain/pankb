# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## PanKB v2.0.0 - 15.07.2024

Here we write upgrading notes for the PanKB web-app project. It's a team effort to make them as
straightforward as possible.

### Added
- AI Assistant chat bot implemented.
- Full alleleome for each pangenome represented with the stats updated on the landing page. 
- Global search accessible on all pages excl. the AI Assistant page. 
- A link to optionally identified Secondary Metabolite Regions (the source is antiSMASH) is now added to the "Genome Info" and "Genome & Gene Info" pages.
- Data export to CSV format.
- Interoperability with the KEGG database (i.e. added links to strain-specific KEGG pathways).
- Linkes to the organisms families are added to the tables.

### Changed
- The Django framework is now used as the back-end.
- The data used to generate dynamic content is now stored in Azure Cosmos DB for MongoDB, while the plots and diagrams data is still stored on Azure Blob Storage. 
- The bibliome now summarizes papers used to train the LLM, which serves is the base for AI Assistant chat bot. 
- The "About" page is updated. 

### Fixed
- Fixed the problems with the "Organisms" and "Publications" pages scrolling.
- The front-end scripts code refined and improved. 
- The HTML fonts are scaled automatically depending on the viewport width and height (the pages do not have to be re-scaled via JS AFTER they are loaded).