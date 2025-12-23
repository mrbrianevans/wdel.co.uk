const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) {
    copyrightYear.innerText = new Date().getFullYear().toString();
}