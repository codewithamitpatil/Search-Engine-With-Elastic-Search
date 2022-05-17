import elasticClient from "../db/elkConnection.js";


// add document to elastic search index
export const AddDocument = async (body) => {
    const temp = await elasticClient.index({
        index: 'postauto',
        body
    });
    console.log(temp)
    return temp;
};

// create mapping for field
export const CreateMapping = async () => {

    const temp = await elasticClient.indices.create({
        index: "postsearch3",
        body: {
            mappings: {
                properties: {
                    title: {
                        type: "keyword",
                    },
                    description: {
                        type: "text"
                    }
                }
            }
        }
    });

    console.log(temp)

}

//CreateMapping();

const channelId = '6280117d192027b615b84545';

// update document by id
export const UpdateDocument = async (id, query) => {
    const temp = await elasticClient.update({
        index: "postsearch",
        id: id,
        doc: query,
    });
    return temp;
}

// delete by particular field
export const DeleteByQuery = async (query) => {
    try {
        const data = await elasticClient.deleteByQuery({
            index: "postsearch",
            query: {
                match_all: query
            }
        })
        console.log(data)
        return true;
    } catch (e) {
        console.log(e.message)
        return e;
    }

}

// to delete by postId
//DeleteByQuery({postId:2})
// to delete by channelId
//DeleteByQuery({channelId:2})

// delete by elastic search id
export const DeleteById = async (id) => {
    try {

        // id - id of elastic document
        const temp = await elasticClient.delete({
            index: 'postsearch',
            id
        });
        console.log(temp)
        return true;
    } catch (e) {
        console.log(e.message)
    }

}

// to search all documents in elastic search
export const searchDocuments1 = async (query) => {

    const body = await elasticClient.search({
        index: 'post4',
        body: {
            query: {
                match: {
                    title: query
                }
            }
        }
    })

    const temp = body.hits.hits.map((item) => {
        const obj = {
            ...item._source,
            _id: item._id
        }
        return obj;
    })
    console.log(temp)
    return temp;
}


// for auto complete
//medium.com/@deeshugupta/autocomplete-using-elasticsearch-and-nodejs-e48a3901973f
export const autoComplete = async (query) => {

    const body = await elasticClient.search({
        index: 'postauto',
        body: {
            from: 1,
            size: 2,
            query: {
                multi_match: {
                    query: query,
                    fields: ["title"]
                },
            },
        }
    })

    const temp = body.hits.hits.map((item) => {
        const obj = {
            ...item._source,
            _id: item._id
        }
        return obj;
    })
    console.log(temp)
    return temp;
}

//autoComplete('ami')

// if we want to search with only single field then
// use
//  query: {
//             match: {
//                    title:query
//                 },

//   }



// to get all documents in elastic search
export const searchDocuments2 = async () => {

    const body = await elasticClient.search({
        index: 'postauto',
        body: {
            query: {
                match_all: {}
            }
        }
    })

    const temp = body.hits.hits.map((item) => {
        const obj = {
            ...item._source,
            _id: item._id
        }
        return obj;
    })

    console.log(temp)
    return temp;


}
//DeleteByQuery({})
//searchDocuments2()
//searchDocuments1('grate')