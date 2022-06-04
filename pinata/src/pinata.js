const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('10e16f1b2b457e77f19d', 'eb2ffd66cb03a9a72047b3862e8cc8aad45bb6ffd6b6465d1fb49f352ce03971');
const fs = require ('fs')
let c = 0;  
let thethings = {};
pinata.pinList({'pageLimit':1000, 'pageOffset': 0}).then((result) => {
    //handle successful authentication here
    console.log(result.count)
    for (var eh of result.rows){
        let blarg = eh.metadata.name.split(' ')
        thethings[eh.metadata.name] = eh.ipfs_pin_hash
        c++;
    }
    console.log(c)
    pinata.pinList({'pageLimit':1000, 'pageOffset': 1}).then((result) => {
        //handle successful authentication here
        for (var eh of result.rows){
            let blarg = eh.metadata.name.split(' ')
            thethings[eh.metadata.name] = eh.ipfs_pin_hash
            c++;
        }
        console.log(c)
        pinata.pinList({'pageLimit':1000, 'pageOffset': 2}).then((result) => {
            //handle successful authentication here
            for (var eh of result.rows){
                let blarg = eh.metadata.name.split(' ')
                thethings[eh.metadata.name] = eh.ipfs_pin_hash
                c++;
            }
            console.log(c)
            pinata.pinList({'pageLimit':1000, 'pageOffset': 3}).then((result) => {
                //handle successful authentication here
                for (var eh of result.rows){
                    let blarg = eh.metadata.name.split(' ')
                    thethings[eh.metadata.name] = eh.ipfs_pin_hash
                    c++;
                }
                console.log(c)
                pinata.pinList({'pageLimit':1000, 'pageOffset': 4}).then((result) => {
                    //handle successful authentication here
                    for (var eh of result.rows){
                        let blarg = eh.metadata.name.split(' ')
                        thethings[eh.metadata.name] = eh.ipfs_pin_hash
                        c++;
                    }
                    console.log(c)
                    pinata.pinList({'pageLimit':1000, 'pageOffset': 5}).then((result) => {
                        //handle successful authentication here
                        for (var eh of result.rows){
                            let blarg = eh.metadata.name.split(' ')
                            thethings[eh.metadata.name] = eh.ipfs_pin_hash
                            c++;
                        }
                        console.log(c)
                        pinata.pinList({'pageLimit':1000, 'pageOffset': 6}).then((result) => {
                            //handle successful authentication here
                            for (var eh of result.rows){
                                let blarg = eh.metadata.name.split(' ')
                                thethings[eh.metadata.name] = eh.ipfs_pin_hash
                                c++;
                            }
                            console.log(c)
                            pinata.pinList({'pageLimit':1000, 'pageOffset': 7}).then((result) => {
                                //handle successful authentication here
                                for (var eh of result.rows){
                                    let blarg = eh.metadata.name.split(' ')
                                    thethings[eh.metadata.name] = eh.ipfs_pin_hash
                                    c++;
                                }
                                console.log(c)
                                pinata.pinList({'pageLimit':1000, 'pageOffset': 8}).then((result) => {
                                    //handle successful authentication here
                                    for (var eh of result.rows){
                                        let blarg = eh.metadata.name.split(' ')
                                        thethings[eh.metadata.name] = eh.ipfs_pin_hash
                                        c++;
                                    }
                                    console.log(c)
                                
                            
    fs.writeFileSync('./downloaded-cids.json', JSON.stringify(thethings))
}).catch((err) => {
    //handle error here
    console.log(err);
});
}).catch((err) => {
    //handle error here
    console.log(err);
});
}).catch((err) => {
    //handle error here
    console.log(err);
});
}).catch((err) => {
    //handle error here
    console.log(err);
});
}).catch((err) => {
    //handle error here
    console.log(err);
});
}).catch((err) => {
    //handle error here
    console.log(err);
});
}).catch((err) => {
    //handle error here
    console.log(err);
});
}).catch((err) => {
    //handle error here
    console.log(err);
});
}).catch((err) => {
    //handle error here
    console.log(err);
});