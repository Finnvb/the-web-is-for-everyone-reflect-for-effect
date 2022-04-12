let vragenlijstLink = document.querySelector('#linkVragenlijst');
let grafiek1 = document.querySelector('#linkGrafiek1');
let grafiek2 = document.querySelector('#linkGrafiek2');
let vragenlijst = document.querySelector('.competentieVragenlijst');
let grafiek1Section = document.querySelector('.grafiek1Section');



toggle();


function toggle(){

vragenlijstLink.addEventListener('click', () => {
    vragenlijstLink.classList.add('linkActive');
    grafiek1.classList.remove('linkActive');
    grafiek2.classList.remove('linkActive');
    vragenlijst.classList.remove('disabled');
    vragenlijst.classList.add('competentieVragenlijst');
    grafiek1Section.classList.remove('enabled');
    grafiek1Section.classList.add('disabled');

})

grafiek1.addEventListener('click', () => {
    grafiek1.classList.add('linkActive');
    grafiek2.classList.remove('linkActive');
    vragenlijstLink.classList.remove('linkActive');
    vragenlijstLink.classList.add('introSectionLinks');
    vragenlijst.classList.add('disabled');
    grafiek1Section.classList.add('enabled');
    grafiek1Section.classList.remove('disabled');

})

grafiek2.addEventListener('click', () => {
    grafiek1.classList.remove('linkActive');
    grafiek2.classList.add('linkActive');
    vragenlijstLink.classList.remove('linkActive');
    vragenlijst.classList.add('disabled');
    grafiek1Section.classList.remove('enabled');
    grafiek1Section.classList.add('disabled');
})
}
