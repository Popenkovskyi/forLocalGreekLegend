function isMobile() {
    return window.innerWidth < 1200;
}

const advantagesList = document.querySelectorAll(".advantages__list");
const openAdvantagesButton = document.getElementById("openAdvantages");
const openCombinations = document.getElementById("openCombinations");
openAdvantagesButton.addEventListener("click", () => {
    if (!isMobile())
        advantagesList.forEach(el => el.classList.toggle("active"));
    else
        advantagesList[1].classList.toggle("active")
})

openCombinations.addEventListener("click", () => {
    advantagesList[0].classList.toggle("active")
})

const vitaminsList = document.getElementById("vitamins");
const combinationsList = document.getElementById("combinations");
const advantagesTitles = document.querySelector(".advantages__header");
const titles = advantagesTitles.querySelectorAll('.premium__title');
titles.forEach(title => {
    if (!isMobile())
        advantagesList[1].classList.add("hide");

    title.addEventListener('click', function () {
        titles.forEach(t => t.classList.remove('active'));
        title.classList.add('active');

        const activeType = title.getAttribute('data-type');

        if (activeType === 'combinations') {
            combinationsList.classList.remove('hide');
            vitaminsList.classList.add('hide');
        } else if (activeType === 'vitamins') {
            vitaminsList.classList.remove('hide');
            combinationsList.classList.add('hide');
        }
    });
});