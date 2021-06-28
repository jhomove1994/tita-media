const accessKey = "bEmPUn1To_Qzz6E23Uv6QGevTO5l5vVvF1Aj-XiXooo";
const endPoint = 'https://api.unsplash.com/search/photos';
let currentPage = 1;
let query = 'all';


const getImages = async(event, q = 'all') => {
    if (event) {
        setItemActive(event.target);
    }
    console.log('abc');
    if (q !== query) {
        const gridItems1 = document.getElementById('grid-items-1');
        removeAllChildNodes(gridItems1);
        const gridItems2 = document.getElementById('grid-items-2');
        removeAllChildNodes(gridItems2);
        const gridItems3 = document.getElementById('grid-items-0');
        removeAllChildNodes(gridItems3);
    }
    query = q;
    const response = await fetch(`${endPoint}?query=${query}&client_id=${accessKey}&per_page=9&page=${currentPage}`);
    const jsonRespose = await response.json();
    const imageList = await jsonRespose.results;
    renderImages(imageList);
}

const renderImages = (imageList) => {
    const heightColumns = {
        'grid-items-0': 0,
        'grid-items-1': 0,
        'grid-items-2': 0
    }

    imageList.forEach((element, key) => {
        const mod = (key + 1) % 3;
        const image = document.createElement('img');
        image.src = element.urls.small;
        image.setAttribute('id', element.id);
        heightColumns[`grid-items-${mod}`] += image.height;
        const div = document.getElementById(`grid-items-${mod}`);
        div.appendChild(image);
    });

    const gridContainer = document.getElementsByClassName('grid-container')[0];
    gridContainer.scrollIntoView();
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const setItemActive = (element) => {
    currentPage = 1;
    Array.from(document.querySelectorAll('.active')).forEach((el) => el.classList.remove('active'));
    Array.from(document.querySelectorAll(`.${element.classList[0]}`)).forEach((el) => {
        console.log(el);
        el.classList.add('active');
    });
}

getImages(null);

const showMore = () => {
    currentPage++;
    getImages(null);
}