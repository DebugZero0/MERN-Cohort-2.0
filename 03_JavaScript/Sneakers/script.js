const circles = document.querySelectorAll('.circle');
const a = document.querySelectorAll('a');
const h1 = document.querySelector('h1');
const shoe = document.querySelector('.shoe');
const div = document.querySelector('.design');

h1.style.fontSize = "4rem";

const price = ["$150.00","$160.00","$170.00","$180.00","$190.00","$200.00"];
const price_off = ["$120.00","$130.00","$140.00","$150.00","$160.00","$170.00"];

// All shoe data in ONE place
const shoes = [
    { img: "./green shoe.png", bg: "linear-gradient(to right, #56ab2f, #a8e063)", text: "", links:"" },
    { img: "./sky.png", bg: "linear-gradient(to right, #2193b0, #6dd5ed)", text: "", links:"" },
    { img: "./red.png", bg: "linear-gradient(to right, #c9184a, #ff758f)", text: "", links:"" },
    { img: "./pink.png", bg: "linear-gradient(to right, #F9CFF2, #AF42AE)", text: "", links:"" },
    { img: "./white.png", bg: "linear-gradient(to right, #ffffff, grey)", text: "", links:"" },
    { img: "./black.png", bg: "linear-gradient(to right, #434343, #000000)", text: "white", links:"white" }
];

// Helper to update price + reset color
function selectColor(i) {
    div.style.transform = "translateX(-50%) translateY(-100%)";

    document.body.style.color = shoes[i].text || "";
    a.forEach(link => link.style.color = shoes[i].links || "");

    document.querySelector('#price').innerHTML = price[i];
    document.querySelector('#price-off').innerHTML = price_off[i];
}

// Helper to update shoe on click
function applyShoe(i) {
    // pop animation
    shoe.classList.add("pop");
    setTimeout(() => shoe.classList.remove("pop"), 150);

    shoe.style.backgroundImage = `url('${shoes[i].img}')`;
    div.style.background = shoes[i].bg;
    document.body.style.background = shoes[i].bg;
    div.style.transform = "translateX(-50%) translateY(0%)";

    if (i === 0) h1.innerHTML = "This is a Nike Revolution 5 running shoe";
    if (i === 1) h1.innerHTML = "This is a Nike Air Max running shoe";
    if (i === 2) h1.innerHTML = "This is a Nike Air Force 1 sneaker";
    if (i === 3) h1.innerHTML = "This is a Nike Blazer Mid vintage shoe";
    if (i === 4) h1.innerHTML = "This is a Nike Air VaporMax Flyknit shoe";
    if (i === 5) h1.innerHTML = "This is a Nike Air Zoom Pegasus shoe";
    if (i === 5) document.querySelector('.cart').style.color = "black";
}


// Attach listeners dynamically
circles.forEach((circle, i) => {
    circle.addEventListener('mousedown', () => selectColor(i));
    circle.addEventListener('click', () => applyShoe(i));
});

var size=document.querySelectorAll('.ms');
size.forEach((sizee)=>{
    sizee.addEventListener('click',()=>{
        size.forEach((sizee)=>{
            sizee.style.backgroundColor="rgb(40, 40, 40)";
            sizee.style.color="white";
            sizee.style.border="none";
            sizee.style.transform="scale(1)";
        });
        sizee.style.transform="scale(.9)";
        sizee.style.backgroundColor="white";
        sizee.style.color="black";
        sizee.style.border="2px solid black";

    });
    requestAnimationFrame(() => {
        sizee.style.transition = 'all 0.3s ease';
      });
});
