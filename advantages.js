const advantagesList = document.querySelectorAll(".advantages__list");
const openAdvantagesButton = document.getElementById("openAdvantages");
openAdvantagesButton.addEventListener("click", () => {
    advantagesList.forEach(el => el.classList.toggle("active"));
})

const vitaminsList = document.getElementById("vitamins");
const combinationsList = document.getElementById("combinations");
const advantagesTitles = document.querySelector(".advantages__header");
const titles = advantagesTitles.querySelectorAll('.premium__title');
titles.forEach(title => {
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