var audio = new Audio('blue.mp3');  // Gantilah dengan path file lokal
var isPlaying = false;  // Menyimpan status pemutaran audio

// Mengambil tombol
var playPauseButton = document.getElementById('playPauseButton');
var icon = playPauseButton.querySelector('i');  // Mengambil elemen ikon di dalam tombol

// Event listener untuk tombol Play/Pause
playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        icon.classList.remove('fa-pause');  // Menghapus ikon Pause
        icon.classList.add('fa-play');  // Menambahkan ikon Play
    } else {
        audio.play().catch(function(error) {
            console.error("Terjadi kesalahan saat memutar audio:", error);
        });
        icon.classList.remove('fa-play');  // Menghapus ikon Play
        icon.classList.add('fa-pause');  // Menambahkan ikon Pause
    }
    isPlaying = !isPlaying;  // Toggle status pemutaran audio
});
audio.addEventListener('ended', function() {
    icon.classList.remove('fa-pause');  // Menghapus ikon Pause setelah audio selesai
    icon.classList.add('fa-play');  // Menambahkan ikon Play
    isPlaying = false;  // Menandakan bahwa audio telah selesai diputar
});

// Scroll otomatis
var scrollButton = document.getElementById('scrollButton');
var scrollInterval;
var isScrolling = false;

function toggleScroll() {
    if (isScrolling) {
        clearInterval(scrollInterval);
        isScrolling = false;
        scrollButton.querySelector('i').classList.remove('fa-stop');
        scrollButton.querySelector('i').classList.add('fa-arrow-down');
    } else {
        scrollInterval = setInterval(function() {
            window.scrollBy(0, 1);  // Scroll turun secara perlahan
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                // Berhenti jika mencapai akhir halaman
                clearInterval(scrollInterval);
                isScrolling = false;
                scrollButton.querySelector('i').classList.remove('fa-stop');
                scrollButton.querySelector('i').classList.add('fa-arrow-down');
            }
        }, 10);  // Kecepatan scroll (10ms)
        isScrolling = true;
        scrollButton.querySelector('i').classList.remove('fa-arrow-down');
        scrollButton.querySelector('i').classList.add('fa-stop');
    }
}

// Event listener untuk tombol Scroll
scrollButton.addEventListener('click', toggleScroll);

// Load JSON data
fetch('images.json')
.then(response => response.json())
.then(images => {
    const gallery = document.querySelector('.gallery');
    
    // Shuffle the images array to get a random order
    const shuffledImages = images.sort(() => Math.random() - 0.5);
    
    // Loop through the shuffled array
    shuffledImages.forEach(image => {
    // Create img element
    const imgElement = document.createElement('img');
    imgElement.src = `images/${image}`;
    imgElement.alt = image;

    // Append img to gallery
    gallery.appendChild(imgElement);
    });
})
.catch(error => console.error('Error loading JSON:', error));

// Array gambar untuk background
const images = [
    'background1.jpeg',
    'background2.jpeg',
    'background3.jpeg',
    'background4.jpeg',
    'background5.jpeg'
];

// Pilih gambar secara acak
const randomImage = images[Math.floor(Math.random() * images.length)];

// Terapkan gambar acak sebagai latar belakang
document.body.style.setProperty('--background-image', `url('${randomImage}')`);