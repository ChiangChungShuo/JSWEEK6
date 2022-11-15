
const searchResultText = document.querySelector("#searchResult-text");
const cantFindArea = document.querySelector(".cantFind-area");
// 預設載入函式
const list = document.querySelector(".ticketCard-area");
// console.log(cardList);
let data;
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    data = response.data.data;
    console.log(data);
    init();
  });
  function init() {
    let str = "";
    data.forEach(function (item, index) {
      let content = `<li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src="${item.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">
            ${item.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
    </li>`;
    str += content;
  });
  list.innerHTML = str;
  }
// 下拉篩選地區
const regionSearch = document.querySelector(".regionSearch");
  regionSearch.addEventListener("change", function (e) {
  if (e.target.value == undefined) {
    console.log("你點擊到空的地方");
    return;
  }
  let str = "";
  let num = 0;
  const search = document.querySelector("#searchResult-text");
  data.forEach(function (item, index) {
    if (e.target.value == item.area) {
      str+=`<li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src="${item.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">
            ${item.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
    </li>`;
    num += 1;
     } else if (e.target.value == "全部地區") {
      str += `<li class="ticketCard">
                <div class="ticketCard-img">
                  <a href="#">
                    <img src="${item.imgUrl}" alt="">
                  </a>
                  <div class="ticketCard-region">${item.area}</div>
                  <div class="ticketCard-rank">${item.rate}</div>
                </div>
                <div class="ticketCard-content">
                  <div>
                    <h3>
                      <a href="#" class="ticketCard-name"${item.name}</a>
                    </h3>
                    <p class="ticketCard-description">
                     ${item.description}
                    </p>
                  </div>
                  <div class="ticketCard-info">
                    <p class="ticketCard-num">
                      <span><i class="fas fa-exclamation-circle"></i></span>
                      剩下最後 <span id="ticketCard-num">${item.group} </span> 組
                    </p>
                    <p class="ticketCard-price">
                      TWD <span id="ticketCard-price">${item.price}</span>
                    </p>
                  </div>
                </div>
              </li>`;
      num += 1;
    }
  });
  search.textContent = `本次搜尋結果共${num}筆資料`;
  list.innerHTML = str;
});
// 新增套票
const addTicketBtn = document.querySelector(".addTicket-btn");
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const form = document.querySelector(".addTicket-form"); //表單

addTicketBtn.addEventListener("click", function () {
 // 防呆1 都不為空 
  if (
    ticketName.value !== "" &&
    ticketImgUrl.value !== "" &&
    ticketRegion.value !== "" &&
    ticketPrice.value !== "" &&
    ticketNum.value !== "" &&
    ticketRate.value !== "" &&
    ticketDescription.value !== ""
  ) {
    // console.log("符合不為空");
    if (ticketDescription.value.length <= 100) {
      if (ticketRate.value >= 1 && ticketRate.value <= 10) {
        if (ticketPrice.value > 0) {
          if (ticketNum.value > 0) {
            //新增物件
            let obj = {};
            obj.name = ticketName.value;
            obj.imgUrl = ticketImgUrl.value;
            obj.area = ticketRegion.value;
            obj.price = ticketPrice.value;
            obj.group = ticketNum.value;
            obj.rate = ticketRate.value;
            obj.description = ticketDescription.value;
            data.push(obj);
            init();
            const reset =document.querySelector('.addTicket-form');
            reset.reset();
            alert("成功新增旅遊套票");
          } else {
            alert("套票組數需大於0");
          }
        } else {
          alert("套票金額需大於0");
        }
      } else {
        alert("套票星級區間需在 1-10 分");
      }
    } else {
      alert("套票描述字數不得超過100");
    }
  } else {
    alert("資料填寫不完整");
  }
});
