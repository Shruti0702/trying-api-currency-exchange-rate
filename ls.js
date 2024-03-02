const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.min.json";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
for(let select of dropdowns){
    for (curCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText= curCode;
        newOption.value=curCode;
        if(select.name==="from" && curCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && curCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let curCode=element.value;
    let countryCode=countryList[curCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtvalue=amount.value;
    if (amtvalue==="" || amtvalue<1){
        amtvalue=1;
        amount.value="1";
    }
    const url=`${base_url}/${fromcurr.value}`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    console.log(rate);
    let finalamt=amtvalue*rate;
    msg.innerText=`${amtvalue}${fromcurr.value}=${finalamt} ${tocurr.value}`;
});
