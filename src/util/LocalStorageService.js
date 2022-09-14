class LocalStorageService {
    getArticlePages(page, direction) {
        let nextPage = 1
        let previousPage = 1
        let chank = page
        let ditrection = direction

        let page_from = 0
        let page_to = 100
        let count = localStorage.getItem('Chanks')
        console.log("Check count 1", count)
        if (count) {
            console.log("Check count 2", count)
        } else {
            count = 1
            console.log("Check count 3", count)
        }
        console.log("Check count", chank)
        if(chank === null){
            let query0 = localStorage.getItem('Chanks')
            if(query0 === null){
                localStorage.setItem('Chanks', true);
                localStorage.setItem('page_from', "0");
                localStorage.setItem('page_to', "100");
                localStorage.setItem('count', count);
            }
        }

        return count
    }


}

export default LocalStorageService