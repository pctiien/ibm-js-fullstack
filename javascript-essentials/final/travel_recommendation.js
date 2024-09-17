const searchBtn = document.getElementById('searchBtn')
const clearBtn =    document.getElementById('clearBtn')
const input = document.getElementById('inputSearch')
const url = './travel_recommendation.json'
destinations = []
resultDestinations = []

fetch(url)
.then(response=>response.json())
.then(data=>{
    destinations = data 
    console.log(destinations)
})
.catch(error=>{
    console.log(error.message)
})

searchBtn.addEventListener('click',()=>{
    const keyWords = {
        beaches: ['beach','beaches'],
        temples: ['temple','temples'],
        countries: ['country','countries']
    }
    for(const key in keyWords){
        const exists = keyWords[key].find(t=>t.toString() == input.value.toLowerCase())
        if(exists)
        {
            resultDestinations.push(...destinations[key]);  
            console.log(resultDestinations)
        }
    } 
    displayDestinations()
})

const displayDestinations = () => {
    const container = document.createElement('div');
    container.classList.add('flex', 'flex-col', 'absolute', 'gap-3', 'top-0', 'right-0', 'p-4' ); // Thay 'r-0' bằng 'right-0' và thêm padding nếu cần
    container.setAttribute('id','destinations')
    resultDestinations.forEach(destination => {
        const childContainer = document.createElement('div');
        childContainer.classList.add('flex', 'flex-col', 'rounded-lg', 'bg-white', 'shadow-lg','w-80'); // Thêm shadow nếu cần
        const img = document.createElement('img');
        img.setAttribute('src', destination.imageUrl);
        img.classList.add('w-full', 'h-32', 'object-cover', 'rounded-t-lg'); // Thêm các lớp để bo tròn góc trên và thiết lập kích thước

        const childContainer2 = document.createElement('div');
        childContainer2.classList.add('flex', 'flex-col', 'p-5');

        const name = document.createElement('h1');
        name.classList.add('text-black', 'text-lg', 'font-bold'); // Thêm kích thước chữ và font-weight
        name.innerHTML = destination.name;

        const des = document.createElement('p');
        des.innerHTML = destination.description;
        des.classList.add('text-black', 'text-sm'); // Thay đổi kích thước chữ nếu cần

        const btn = document.createElement('button');
        btn.classList.add('bg-green-800', 'text-white', 'rounded-lg', 'px-3', 'py-1', 'w-fit');
        btn.innerHTML = 'Visit';

        childContainer.appendChild(img);
        childContainer2.appendChild(name);
        childContainer2.appendChild(des);
        childContainer2.appendChild(btn);
        childContainer.appendChild(childContainer2);
        container.appendChild(childContainer);
    });

    const mainScreen = document.querySelector('.main-screen');
    mainScreen.appendChild(container);
};
const clearDestinations = () => {
    const container = document.querySelector('#destinations');
    
    if (container && container.parentNode) {
        container.parentNode.removeChild(container);
    }
};
clearBtn.addEventListener('click',()=>{
    input.value = "";
    resultDestinations.splice(0,resultDestinations.length)
    console.log(resultDestinations);
    clearDestinations()
})