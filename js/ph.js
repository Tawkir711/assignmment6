const categoryLoads = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    const tabContainer = document.getElementById('btn-container');

    data.data.forEach((categories) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="loadsWebsite('${categories.category_id}')" class="tab bg-gray-300 text-center text-black">${categories.category}</a>
        `;
        tabContainer.appendChild(div);

    });

    // console.log(data.data);
}
const convertMinute = (seconds) => {
    if (seconds === "") {
        return '';
    }
    else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}hrs ${minutes}min ago`;
    }

}

let global;

const loadsWebsite = async (cardId = '1000') => {
    global = cardId;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${cardId}`);
    const data = await res.json();
   viewShort(data.data)

};
const viewShort = (data) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    // console.log(data.data);

    if (!data || data.length === 0) {
        const drawingDiv = document.createElement('div');
        drawingDiv.innerHTML = `
                
      <div class="grid grid-cols-1 p-[1.5rem] text-center">
          <img class=" ml-[8rem] lg:ml-[184%] md:ml-[16rem]" src="./Icon.png" alt="Error" class="error-image">
          <p class="text-center w-[400px] md:ml-[8rem] lg:ml-[150%] mt-5 text-3xl">Oops!! Sorry, There is no content here</p>
      </div>
                `;
        cardContainer.appendChild(drawingDiv);

    }

    data.forEach((webPage) => {

        // console.log(webPage);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="  bg-base-100 ">
        
        <figure class="relative"><img class="h-[200px] w-[312px] rounded-lg " src="${webPage.thumbnail}" alt="" />
        <p class=" text-[12px] inline absolute bottom-2 left-[190px] text-center bg-black text-white"> ${convertMinute(webPage.others?.posted_date)}</p>
        </figure>
      
        <div class="flex gap-3">
          <img class="w-[40px] h-[40px] rounded-[40px] mt-5" src="${webPage?.authors[0]?.profile_picture}" alt="">
          <div>
            <h2 class="card-title mt-5">${webPage.title}</h2>
          
          <div class="flex">
            <p>${webPage?.authors[0]?.profile_name}</p>
            <span>${webPage.authors[0].verified ? `<img class="h-6 w-9 ml-1 inline" src="verify.jpg">` : ''}</span>
            </div>
            <p>${webPage?.others?.views
            } views</p>
        </div>
        </div>
      </div>
        `;
        cardContainer.appendChild(div);

    })
}

const shortViews = async () => {
    // console.log('hel');
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${global}`);
    const data = await res.json();
  const sort = data.data.sort((a, b) => {
    const view1 = a.others.views.slice(0, -1)
    const view2 = b.others.views.slice(0, -1)
    return view2 - view1
  })
  viewShort(sort)
}




loadsWebsite(1000);
categoryLoads();
