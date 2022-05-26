# Search-Engine-With-Elastic-Search
Search engine with elastic search , node js , rabit mq  and kafka  


### What i did in this repo 

 I am working on video streaming platform. In this project i have implemented search feature.
 To make search more accurate and fast i need to do 
 **External  Search Indexing ** for that i have use elastic search. 
 
 So basically what i am doing in this repo, i have another post service which handles all post regarding
 things. So this service is responsible for inserting search data into mongodb , at the same time it publishes a message 
 to messaging queue (rabitmq/kafka).  
 
 So this repo is continusally listen for message , once it get the message it puts that message into elastic search.
 
 This repo has two end points from where we can search data and a make netwrok call for autocomplete.
 
 
 1] / search?q=amit  // for full text search
 
 2] / autocomplete?auto=ami // for autocomplete
 

##<a href="https://github.com/codewithamitpatil/Search-Engine-With-Elastic-Search">  Search Engine with ELASTIC AND RABIT MQ </a>

##<a href="https://github.com/codewithamitpatil/Search-Engine-With-Elastic-Search/tree/kafka">  Search Engine with ELASTIC AND KAFKA </a>
