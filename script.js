console.log("Working");

let boxes= document.querySelector(".contain").children;
let len=boxes.length;
let count=0;

let audio =[new Audio('assets/forest-lullaby-110624.mp3'), new Audio('assets/lost-in-city-lights-145038.mp3')]


let show = ()=>
{
    audio[0].load();
    audio[1].load();
    console.log(count);

    let boxes= Array.from(document.querySelector(".contain").children)

    boxes.forEach((box)=>{
        box.classList.add("hidden");
    })

    boxes[count].classList.remove("hidden");
}

let next = ()=>
{
    resetPbar();
    let nextbtns=document.querySelectorAll(".next");

    nextbtns.forEach((btn)=>{
        btn.addEventListener("click",()=>{ 

            count=(count+1)%len;
            audio[count].load();
            console.log(count);
            show();
            resetSwitch();
        })
        
    })

}

let prev = ()=>
{
    resetPbar();
    let prevbtns=document.querySelectorAll(".back");
    console.log(prevbtns)
    prevbtns.forEach((btn)=>{
        btn.addEventListener("click",()=>{ 
            count=(count-1);
            if(count<0)
                count+=len;
            count=count%len;
            console.log(count);
            show();
            resetSwitch();

        })
    })
}

let setPbar= ()=>{
    let pbars= document.querySelectorAll(".pbar");
    setInterval(() => {
            let pbar=pbars[count];
            let w=(audio[count].currentTime/audio[count].duration)*100;
            pbar.style.width= w + "%";

    }, 1000);

    


}

let resetPbar = ()=>{
    let pbars= document.querySelectorAll(".pbar");
    pbars.forEach((pbar)=>{
        pbar.style.width= "0px";

    })

}


let resetSwitch=() =>{
    let playbtns=document.querySelectorAll(".play");
    playbtns.forEach((btn)=>{
    let img=btn.children[0];
    console.log(img);
    img.src="assets/Play_fill.svg";
    audio[count].load();
    })

}


let toggleSwitch = ()=>
{
    let playbtns=document.querySelectorAll(".play");
    console.log(playbtns)
    playbtns.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{ 
            let img=btn.children[0];
            console.log(img.src);
            if(img.src.includes("assets/Play_fill.svg"))
            {
                img.src="assets/pause_icon.svg";
                audio[count].play();

            }
            else
            {
                img.src="assets/Play_fill.svg";
                audio[count].pause();

            }


        })
    })
}

let slider= ()=>{
    let pbars= document.querySelectorAll(".pbar");
    let max=pbars[0].closest("div").clientWidth;

    pbars.forEach((pbar)=>{
        let div = pbar.closest("div");

        div.addEventListener("click",(e)=>{
            console.log(e);
            let fraction = (e.offsetX/max);
        
            console.log(max,e.offsetX,fraction);
            audio[count].currentTime=fraction*audio[count].duration;

        })
    })


}

let timeConvertor= (time)=>{
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);

    if(minutes >=10)
    {
        if(seconds>=10)
        {
            return `${minutes}:${seconds}`;
        }
        else
        {
            return `${minutes}:0${seconds}`;
        }

    }

    else
    {
        if(seconds>=10)
            return `0${minutes}:${seconds}`;
        else
            return `0${minutes}:0${seconds}`;
    
    }



}


let setTime= ()=>{
    let timers= document.querySelectorAll(".timer");
    console.log(timers);
    timers.forEach((timer)=>{
        console.log(timer.children[0]);

        // let time = timer.chlidren;

            setInterval(() => {

                timer.children[0].innerText=timeConvertor(audio[count].currentTime);
                timer.children[1].innerText=timeConvertor(audio[count].duration);
            }, 100);        

    })
}

show();
next();
prev();
toggleSwitch();
setPbar();
slider();
setTime();