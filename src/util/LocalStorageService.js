class LocalStorageService {
    getArticlePages(direction) {
        let page_from = 0
        let page_to = 100
        let count = localStorage.getItem('count') * 1
        let chunk = localStorage.getItem('chunk')

        if (count === 100/chunk && direction === "next") {
            page_from = localStorage.getItem('page_from') * 1 + 100
            page_to = localStorage.getItem('page_to') * 1 + 100
            localStorage.setItem('count', 1);
            localStorage.setItem('page_from', page_from);
            localStorage.setItem('page_to', page_to);

        } else if (count < 100/chunk && count > 0 && direction === "prev") {
            page_from = localStorage.getItem('page_from') * 1
            console.log("Count", count)
            // localStorage.setItem('count', count - 1);
            if (page_from - 100/chunk < 0) {
                localStorage.setItem('page_from', 100/chunk);
                let temp_page_to = 100 + chunk * 1
                localStorage.setItem('page_to', temp_page_to);
            }
            page_from = localStorage.getItem('page_from') * 1 - 100/chunk
            page_to = localStorage.getItem('page_to') * 1 - 100/chunk

            localStorage.setItem('page_from', page_from);
            localStorage.setItem('page_to', page_to);
            localStorage.setItem('count', count - 1);

        }
        else if (count < 100/chunk && direction === "next") {
            localStorage.setItem('count', count + 1);
        }
        else if (count === 0 && direction === "prev") {
            localStorage.setItem('count', chunk - 1);
        }
    }
}

export default LocalStorageService