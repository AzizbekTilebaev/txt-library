// TXT kitoblar ro'yxati (avtomatlashtirish uchun)
fetch("books/")
    .then(res => res.text())
    .then(text => {
        const files = [...text.matchAll(/href="(.*?\.txt)"/g)].map(a => a[1]);
        showBooks(files);
    });

function showBooks(files) {
    const list = document.getElementById("bookList");
    list.innerHTML = "";

    files.forEach(file => {
        const li = document.createElement("li");
        li.textContent = file.replace(".txt", "");
        li.onclick = () => openBook(file);
        list.appendChild(li);
    });

    // qidiruv
    document.getElementById("search").onkeyup = function() {
        const q = this.value.toLowerCase();
        [...list.children].forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(q)
                ? "block"
                : "none";
        });
    };
}

function openBook(file) {
    fetch("books/" + file)
        .then(res => res.text())
        .then(content => {
            document.getElementById("bookContent").textContent = content;
            document.getElementById("reader").classList.remove("hidden");
            document.getElementById("bookList").classList.add("hidden");
            document.getElementById("search").classList.add("hidden");
        });
}

document.getElementById("backBtn").onclick = () => {
    document.getElementById("reader").classList.add("hidden");
    document.getElementById("bookList").classList.remove("hidden");
    document.getElementById("search").classList.remove("hidden");
};
